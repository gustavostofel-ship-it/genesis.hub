'use server';

import { Employee } from '@/lib/data';
import { createClient } from '@/lib/supabase/server';

export async function getEmployees(): Promise<Employee[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('public_profiles')
    .select(`
      id,
      first_name,
      last_name,
      email,
      role_title,
      department:department_id (name),
      ramal,
      avatar_url,
      skills,
      is_active
    `)
    .eq('is_active', true);

  if (error || !data) return [];

  return data.map((prof: any) => ({
    id: prof.id,
    name: `${prof.first_name} ${prof.last_name}`,
    role: prof.role_title || 'Colaborador',
    department: 'marketing', // Default genérico se não match
    departmentLabel: prof.department?.name || 'Geral',
    location: 'Presencial', // MOCK FIXO POIS NÃO ESTA NO DB
    locationType: 'presencial',
    ramal: prof.ramal || '---',
    email: prof.email,
    avatar: prof.avatar_url || '',
    status: 'ausente',
    skills: prof.skills || [],
    isFavorite: false,
  }));
}

import { requireAdmin } from './settings';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const getAdminClient = () => createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createEmployee(data: any) {
  await requireAdmin();
  const supabaseAdmin = getAdminClient();
  
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: 'Genesis2026@',
    email_confirm: true,
  });
  
  if (authError) throw authError;

  const names = data.name.split(' ');
  const firstName = names[0];
  const lastName = names.slice(1).join(' ') || '';
  
  // We first try to update in case a trigger auto-created the profile
  const { error: updateError } = await supabaseAdmin.from('profiles').update({
    first_name: firstName,
    last_name: lastName,
    role_title: data.role,
    ramal: data.ramal,
  }).eq('id', authData.user.id);

  if (updateError) {
    // If update fails, maybe the row doesn't exist. Let's insert.
    const { error: insertError } = await supabaseAdmin.from('profiles').insert({
      id: authData.user.id,
      first_name: firstName,
      last_name: lastName,
      email: data.email,
      role_title: data.role,
      ramal: data.ramal,
    });

    if (insertError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw insertError;
    }
  }
}
