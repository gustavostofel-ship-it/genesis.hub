'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEmployees } from '@/app/actions/people';
import toast from 'react-hot-toast';

export function usePeople() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['people'],
    queryFn: () => getEmployees(),
  });

  return {
    people: data || [],
    isLoading,
    isError,
    refetch,
    // TODO: implement person creation in DB
    createPerson: async (data?: any) => {},
    isCreating: false,
  };
}
