'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPeople, createEmployee } from '@/app/actions/people';
import toast from 'react-hot-toast';

export function usePeople() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['people'],
    queryFn: () => getPeople(),
  });

  const createEmployeeMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
      toast.success('Colaborador cadastrado com sucesso!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Erro ao cadastrar colaborador');
    }
  });

  return {
    people: data || [],
    isLoading,
    isError,
    refetch,
    createPerson: createEmployeeMutation.mutateAsync,
    isCreating: createEmployeeMutation.isPending,
  };
}
