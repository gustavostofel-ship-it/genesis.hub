'use server';

import { RequestItem } from '@/lib/data';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

export async function getRequests(): Promise<RequestItem[]> {
  const supabase = await createClient();
  const { data: userAuth } = await supabase.auth.getUser();
  if (!userAuth?.user) return [];

  const { data, error } = await supabase
    .from('requests')
    .select(`
      id,
      protocol,
      title,
      description,
      status,
      priority,
      due_date,
      created_at,
      type:type_id (name, category, icon),
      assignee:assignee_id (first_name, last_name, role_title, avatar_url)
    `)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map((req: any) => ({
    id: req.id,
    protocol: req.protocol,
    category: req.type?.category || 'Geral',
    categoryIcon: req.type?.icon || 'assignment',
    title: req.title,
    subtitle: req.type?.name || 'Solicitação',
    assignee: req.assignee ? {
      name: `${req.assignee.first_name} ${req.assignee.last_name}`,
      role: req.assignee.role_title || 'Atendente',
      avatar: req.assignee.avatar_url || '',
    } : {
      name: 'Não atribuído',
      role: 'Fila',
      avatar: '',
    },
    createdAt: new Date(req.created_at).toLocaleDateString('pt-BR'),
    dueDate: req.due_date ? new Date(req.due_date).toLocaleDateString('pt-BR') : 'Sem prazo',
    status: req.status as any,
    priority: req.priority as any,
    description: req.description,
  }));
}

const createRequestSchema = z.object({
  title: z.string().min(5),
  demandType: z.string().min(2),
  description: z.string().min(10),
  audience: z.string().min(2),
  deadline: z.string(),
  priority: z.enum(['baixa', 'media', 'alta']),
});

export async function createMarketingRequest(data: z.infer<typeof createRequestSchema>) {
  const parsed = createRequestSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Dados inválidos. Verifique os campos do formulário.');
  }

  const supabase = await createClient();
  const { data: userAuth } = await supabase.auth.getUser();
  if (!userAuth?.user) throw new Error("Unauthorized");

  // First get or create the Marketing request type
  let typeId = null;
  const { data: types }: { data: any } = await supabase.from('request_types').select('id').eq('category', 'Marketing').limit(1);
  if (types && types.length > 0) {
    typeId = types[0].id;
  } else {
    // Failsafe: if no types exist, just error out or we could insert it if it was allowed.
    // For now we error out
    throw new Error('Tipo de solicitação de Marketing não configurado no banco de dados.');
  }

  const { data: newReq, error } = await (supabase as any).from('requests').insert({
    requester_id: userAuth.user.id,
    type_id: typeId,
    title: parsed.data.title,
    description: `Formato: ${parsed.data.demandType} | Público: ${parsed.data.audience}\n\n${parsed.data.description}`,
    priority: parsed.data.priority,
    due_date: parsed.data.deadline ? new Date(parsed.data.deadline).toISOString() : null,
  }).select().single();

  if (error) throw error;
  
  return newReq;
}
