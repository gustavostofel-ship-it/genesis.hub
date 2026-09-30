'use server';

import { Employee, INITIAL_EMPLOYEES } from '@/lib/data';

let MOCK_PEOPLE_DB = [...INITIAL_EMPLOYEES];

export async function getPeople(): Promise<Employee[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return MOCK_PEOPLE_DB;
}
