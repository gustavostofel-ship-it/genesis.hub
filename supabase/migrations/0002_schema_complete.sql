-- FASE 2: BANCO COMPLETO

-- 1. BASE: ENUMS E FUNCTIONS
CREATE TYPE user_role AS ENUM ('admin', 'marketing', 'rh', 'gestor', 'colaborador');

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Funcs de Auth
CREATE OR REPLACE FUNCTION current_user_role()
RETURNS user_role AS $$
DECLARE
  v_role user_role;
BEGIN
  SELECT role INTO v_role FROM public.profiles WHERE id = auth.uid();
  RETURN COALESCE(v_role, 'colaborador'::user_role);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN current_user_role() = 'admin'::user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION has_role(required_role user_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN current_user_role() = required_role OR current_user_role() = 'admin'::user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. CADASTRO (Departments e Profiles)
CREATE TABLE IF NOT EXISTS public.departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TRIGGER departments_updated_at BEFORE UPDATE ON public.departments FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  birth_date DATE,
  role_title TEXT,
  department_id UUID REFERENCES public.departments(id),
  manager_id UUID REFERENCES public.profiles(id),
  admission_date DATE,
  ramal TEXT,
  avatar_url TEXT,
  about TEXT,
  skills TEXT[],
  role user_role DEFAULT 'colaborador'::user_role NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  show_birthday BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS public.profile_experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT
);

CREATE TABLE IF NOT EXISTS public.profile_certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  credential_id TEXT,
  issue_date DATE,
  is_verified BOOLEAN DEFAULT false
);

CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id, first_name, last_name, email,
  TO_CHAR(birth_date, 'MM-DD') AS birth_day_month,
  role_title, department_id, manager_id, admission_date, ramal, avatar_url, about, skills, role, is_active
FROM public.profiles 
WHERE is_active = true;

-- 3. FEED
CREATE TYPE post_type AS ENUM ('conquista', 'comunicado', 'parceria', 'video', 'aniversario', 'boas_vindas');

CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  type post_type NOT NULL DEFAULT 'conquista',
  title TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS public.featured_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  link TEXT,
  image_url TEXT,
  video_url TEXT,
  sort_order INTEGER DEFAULT 0,
  active_from TIMESTAMP WITH TIME ZONE,
  active_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.post_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL,
  UNIQUE(post_id, user_id, reaction_type)
);

CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID NOT NULL REFERENCES public.profiles(id),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.feed_preferences (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  show_birthdays BOOLEAN DEFAULT true,
  show_welcomes BOOLEAN DEFAULT true,
  muted_departments UUID[]
);

-- 4. NOTIFICAÇÕES (Tabela base já existe em 0001)
CREATE TABLE IF NOT EXISTS public.notification_preferences (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  email_marketing BOOLEAN DEFAULT true,
  email_system BOOLEAN DEFAULT true,
  push_requests BOOLEAN DEFAULT true
);

-- 5. SOLICITAÇÕES
CREATE TABLE IF NOT EXISTS public.request_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  icon TEXT,
  default_assignee_id UUID REFERENCES public.profiles(id),
  sla_hours INTEGER DEFAULT 24,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  protocol TEXT NOT NULL UNIQUE,
  requester_id UUID NOT NULL REFERENCES public.profiles(id),
  type_id UUID NOT NULL REFERENCES public.request_types(id),
  assignee_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'media',
  status TEXT DEFAULT 'aberta',
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TRIGGER requests_updated_at BEFORE UPDATE ON public.requests FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE SEQUENCE IF NOT EXISTS req_protocol_seq START 1;
CREATE OR REPLACE FUNCTION generate_request_protocol()
RETURNS TRIGGER AS $$
BEGIN
  NEW.protocol := 'GEN-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(nextval('req_protocol_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trigger_generate_protocol BEFORE INSERT ON public.requests FOR EACH ROW EXECUTE FUNCTION generate_request_protocol();

CREATE TABLE IF NOT EXISTS public.request_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID NOT NULL REFERENCES public.requests(id) ON DELETE CASCADE,
  actor_id UUID NOT NULL REFERENCES public.profiles(id),
  event_type TEXT NOT NULL,
  content TEXT,
  old_status TEXT,
  new_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.request_attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID NOT NULL REFERENCES public.requests(id) ON DELETE CASCADE,
  uploader_id UUID NOT NULL REFERENCES public.profiles(id),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. MARKETING HUB
CREATE TABLE IF NOT EXISTS public.kanban_columns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  color TEXT,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.marketing_demands (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  requester_id UUID NOT NULL REFERENCES public.profiles(id),
  column_id UUID NOT NULL REFERENCES public.kanban_columns(id),
  assignee_id UUID REFERENCES public.profiles(id),
  priority TEXT DEFAULT 'media',
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TRIGGER marketing_demands_updated_at BEFORE UPDATE ON public.marketing_demands FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS public.demand_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  demand_id UUID NOT NULL REFERENCES public.marketing_demands(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.demand_attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  demand_id UUID NOT NULL REFERENCES public.marketing_demands(id) ON DELETE CASCADE,
  uploader_id UUID NOT NULL REFERENCES public.profiles(id),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. AUDITORIA
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  actor_id UUID NOT NULL REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- RLS POLICIES (ROW LEVEL SECURITY)
-- ==========================================
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feed_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.request_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.request_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.request_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kanban_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_demands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demand_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demand_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Departamentos
CREATE POLICY "Departments Select" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Departments Modify" ON public.departments FOR ALL USING (has_role('rh'));

-- Profiles
CREATE POLICY "Profiles Select" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Profiles Update Self" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Profiles Manage" ON public.profiles FOR ALL USING (has_role('rh'));

-- Experiences / Certificates
CREATE POLICY "Exp Select" ON public.profile_experiences FOR SELECT USING (true);
CREATE POLICY "Exp Manage Self" ON public.profile_experiences FOR ALL USING (profile_id = auth.uid());
CREATE POLICY "Cert Select" ON public.profile_certificates FOR SELECT USING (true);
CREATE POLICY "Cert Manage Self" ON public.profile_certificates FOR ALL USING (profile_id = auth.uid());

-- Posts
CREATE POLICY "Posts Select" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Posts Insert Conquista" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id AND type = 'conquista');
CREATE POLICY "Posts Manage Marketing" ON public.posts FOR ALL USING (has_role('marketing') AND type IN ('comunicado', 'parceria', 'video'));
CREATE POLICY "Posts Manage RH" ON public.posts FOR ALL USING (has_role('rh') AND type = 'comunicado');
CREATE POLICY "Posts Manage Admin" ON public.posts FOR ALL USING (is_admin());

-- Featured Items
CREATE POLICY "Featured Select" ON public.featured_items FOR SELECT USING (true);
CREATE POLICY "Featured Manage" ON public.featured_items FOR ALL USING (has_role('marketing') OR is_admin());

-- Reações e Comentários
CREATE POLICY "Reactions Select" ON public.post_reactions FOR SELECT USING (true);
CREATE POLICY "Reactions Manage Self" ON public.post_reactions FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Comments Select" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Comments Manage Self" ON public.comments FOR ALL USING (author_id = auth.uid());

-- Request Types
CREATE POLICY "ReqTypes Select" ON public.request_types FOR SELECT USING (true);
CREATE POLICY "ReqTypes Manage" ON public.request_types FOR ALL USING (is_admin());

-- Requests
CREATE POLICY "Requests Select" ON public.requests FOR SELECT USING (requester_id = auth.uid() OR assignee_id = auth.uid() OR is_admin());
CREATE POLICY "Requests Insert" ON public.requests FOR INSERT WITH CHECK (requester_id = auth.uid());
CREATE POLICY "Requests Update" ON public.requests FOR UPDATE USING (requester_id = auth.uid() OR assignee_id = auth.uid() OR is_admin());

-- Marketing Kanban
CREATE POLICY "KanbanCol Select" ON public.kanban_columns FOR SELECT USING (true);
CREATE POLICY "KanbanCol Manage" ON public.kanban_columns FOR ALL USING (has_role('marketing') OR is_admin());
CREATE POLICY "MktDemands Select" ON public.marketing_demands FOR SELECT USING (true);
CREATE POLICY "MktDemands Insert" ON public.marketing_demands FOR INSERT WITH CHECK (requester_id = auth.uid());
CREATE POLICY "MktDemands Update" ON public.marketing_demands FOR UPDATE USING (has_role('marketing') OR is_admin() OR requester_id = auth.uid());

-- Auditoria
CREATE POLICY "Audit Select" ON public.audit_log FOR SELECT USING (is_admin());
CREATE POLICY "Audit Insert" ON public.audit_log FOR INSERT WITH CHECK (is_admin());

-- ==========================================
-- BUCKETS STORAGE
-- ==========================================
INSERT INTO storage.buckets (id, name, public) VALUES 
('avatars', 'avatars', true),
('post-media', 'post-media', true),
('featured-media', 'featured-media', true),
('certificates', 'certificates', true),
('request-attachments', 'request-attachments', false),
('marketing-files', 'marketing-files', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Avatar Select" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Avatar Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Avatar Update" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Avatar Delete" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "PostMedia Select" ON storage.objects FOR SELECT USING (bucket_id IN ('post-media', 'featured-media', 'certificates'));
CREATE POLICY "PostMedia Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('post-media', 'featured-media', 'certificates') AND auth.role() = 'authenticated');

-- ==========================================
-- DADOS INICIAIS MÍNIMOS (BOOTSTRAP)
-- ==========================================
INSERT INTO public.departments (name, description) VALUES
('Marketing', 'Departamento de Marketing & Comunicação'),
('Engenharia', 'Engenharia de Software e TI'),
('RH & Cultura', 'Gestão de Pessoas'),
('Produto & Design', 'Product Management e Design UX/UI')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.kanban_columns (name, sort_order, color) VALUES
('Backlog', 1, 'bg-slate-200'),
('Em Produção', 2, 'bg-blue-200'),
('Revisão', 3, 'bg-amber-200'),
('Concluído', 4, 'bg-emerald-200')
ON CONFLICT DO NOTHING;

INSERT INTO public.request_types (name, category, icon, sla_hours) VALUES
('Suporte Equipamentos T.I.', 'Suporte T.I.', 'terminal', 24),
('Criação de Campanha (MKT)', 'Marketing', 'campaign', 72),
('Aprovação de Férias', 'Recursos Humanos', 'groups', 48)
ON CONFLICT DO NOTHING;
