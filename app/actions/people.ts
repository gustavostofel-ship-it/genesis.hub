'use server';

import { Employee, INITIAL_EMPLOYEES } from '@/lib/data';
import { z } from 'zod';

let MOCK_PEOPLE_DB = [...INITIAL_EMPLOYEES];

export async function getPeople(): Promise<Employee[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return MOCK_PEOPLE_DB;
}

const createEmployeeSchema = z.object({
  name: z.string().min(3),
  role: z.string().min(2),
  department: z.string().min(2),
  email: z.string().email(),
  location: z.string(),
  ramal: z.string(),
});

export async function createEmployee(data: z.infer<typeof createEmployeeSchema>) {
  const parsed = createEmployeeSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Dados do funcionário inválidos.');
  }

  await new Promise((resolve) => setTimeout(resolve, 800));

  const newEmployee: Employee = {
    id: `emp-${Date.now()}`,
    name: parsed.data.name,
    role: parsed.data.role,
    department: parsed.data.department as any,
    departmentLabel: parsed.data.department,
    email: parsed.data.email,
    location: parsed.data.location,
    locationType: parsed.data.location.toLowerCase().includes('remoto') ? 'remoto' : 'presencial',
    status: 'online',
    isFavorite: false,
    ramal: parsed.data.ramal,
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIq7L8cI_xYg888eGgV5GqRxg3_oWJbSgL1X98n8Q=s96-c', // placeholder generic
    skills: [],
  };

  MOCK_PEOPLE_DB = [newEmployee, ...MOCK_PEOPLE_DB];
  return newEmployee;
}
