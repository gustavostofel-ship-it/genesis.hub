'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRequests, createMarketingRequest } from '@/app/actions/requests';
import toast from 'react-hot-toast';

export function useRequests() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['requests'],
    queryFn: () => getRequests(),
  });

  const createRequestMutation = useMutation({
    mutationFn: createMarketingRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      toast.success('Solicitação criada com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao criar solicitação.');
    },
  });

  return {
    requests: data || [],
    isLoading,
    isError,
    refetch,
    createRequest: createRequestMutation.mutateAsync,
    isCreating: createRequestMutation.isPending,
  };
}
