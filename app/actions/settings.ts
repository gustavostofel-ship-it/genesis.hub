'use server';

import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

// Zod schemas for validation
const DepartmentSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, 'Nome do setor é obrigatório'),
  description: z.string().optional(),
});

const RequestTypeSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, 'Nome do tipo é obrigatório'),
  category: z.string().min(2, 'Categoria é obrigatória'),
  icon: z.string().optional(),
  sla_hours: z.coerce.number().min(1, 'SLA deve ser pelo menos 1 hora'),
});

const FeaturedItemSchema = z.object({
  id: z.string().uuid().optional(),
  type: z.string().min(1, 'Tipo é obrigatório'),
  title: z.string().min(2, 'Título é obrigatório'),
  link: z.string().optional(),
  sort_order: z.coerce.number().default(0),
});

export async function requireAdmin() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) throw new Error('Não autenticado');

  const { data: isAdmin } = await supabase.rpc('is_admin');
  if (!isAdmin) {
    throw new Error('Acesso negado: apenas administradores podem realizar esta ação.');
  }

  return user.user;
}

// DEPARTMENTS
export async function getDepartments() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('departments').select('*').order('name');
  if (error) throw error;
  return data;
}

export async function saveDepartment(data: z.infer<typeof DepartmentSchema>) {
  await requireAdmin();
  const validData = DepartmentSchema.parse(data);
  const supabase = await createClient();
  
  if (validData.id) {
    const { error } = await (supabase as any).from('departments').update({
      name: validData.name,
      description: validData.description
    }).eq('id', validData.id);
    if (error) throw error;
  } else {
    const { error } = await (supabase as any).from('departments').insert({
      name: validData.name,
      description: validData.description
    });
    if (error) throw error;
  }
}

// REQUEST TYPES
export async function getRequestTypes() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('request_types').select('*').order('category');
  if (error) throw error;
  return data;
}

export async function saveRequestType(data: z.infer<typeof RequestTypeSchema>) {
  await requireAdmin();
  const validData = RequestTypeSchema.parse(data);
  const supabase = await createClient();
  
  if (validData.id) {
    const { error } = await (supabase as any).from('request_types').update({
      name: validData.name,
      category: validData.category,
      icon: validData.icon,
      sla_hours: validData.sla_hours
    }).eq('id', validData.id);
    if (error) throw error;
  } else {
    const { error } = await (supabase as any).from('request_types').insert({
      name: validData.name,
      category: validData.category,
      icon: validData.icon,
      sla_hours: validData.sla_hours
    });
    if (error) throw error;
  }
}

// FEATURED ITEMS
export async function getFeaturedItems() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('featured_items').select('*').order('sort_order');
  if (error) throw error;
  return data;
}

export async function saveFeaturedItem(data: z.infer<typeof FeaturedItemSchema>) {
  await requireAdmin();
  const validData = FeaturedItemSchema.parse(data);
  const supabase = await createClient();
  
  if (validData.id) {
    const { error } = await (supabase as any).from('featured_items').update({
      title: validData.title,
      type: validData.type,
      link: validData.link,
      sort_order: validData.sort_order
    }).eq('id', validData.id);
    if (error) throw error;
  } else {
    const { error } = await (supabase as any).from('featured_items').insert({
      title: validData.title,
      type: validData.type,
      link: validData.link,
      sort_order: validData.sort_order
    });
    if (error) throw error;
  }
}
