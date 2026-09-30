'use server';

import { RequestItem, INITIAL_REQUESTS } from '@/lib/data';
import { z } from 'zod';

let MOCK_REQUESTS_DB = [...INITIAL_REQUESTS];

export async function getRequests(): Promise<RequestItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return MOCK_REQUESTS_DB;
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

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newRequest: RequestItem = {
    id: `req-${Date.now()}`,
    protocol: `#MKT-${Math.floor(4100 + Math.random() * 800)}`,
    category: 'Marketing',
    categoryIcon: 'campaign',
    title: parsed.data.title,
    subtitle: `Arte para ${parsed.data.demandType} • ${parsed.data.audience}`,
    assignee: {
      name: 'Mariana A.',
      role: 'Coord. Branding',
      avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1WNA9nH2zY9EotrNixsrRtNBhwi_E0dlvwDGcws0lFFXOAQFQZKLtjtz9XXWZhaA-rVX6fZJHZ0VxnO_B5TkkiZLiIELSMYMIGJ54TQvvaFwsPe_qK4zBmn7JMYYIj4f08AC-H_gdPgFd7omdHlMU9dxdf1DakS-gBzCCyzbVjig8HmyDGwmoWe2V5pMycdWFUWN_tR326ylET4GD-g4cOE276CduGrLzsMkiuBW02AFka7arfrqlzKIvs',
    },
    createdAt: 'Hoje, agora',
    dueDate: parsed.data.deadline || 'Em 5 dias úteis',
    status: 'analise',
    priority: parsed.data.priority,
    description: parsed.data.description,
    attachments: [],
  };

  MOCK_REQUESTS_DB = [newRequest, ...MOCK_REQUESTS_DB];
  return newRequest;
}
