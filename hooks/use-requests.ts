'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRequests, createMarketingRequest } from '@/app/actions/requests';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useRequests() {
  const queryClient = useQueryClient();
  const supabase = createClient();

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

  useEffect(() => {
    // FASE 5: Realtime Subscription para Sidebar / Painel
    const channel = supabase
      .channel('requests_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'requests' },
        (payload) => {
          console.log('Solicitação atualizada via Realtime:', payload);
          queryClient.invalidateQueries({ queryKey: ['requests'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, queryClient]);

  return {
    requests: data || [],
    isLoading,
    isError,
    refetch,
    createRequest: createRequestMutation.mutateAsync,
    isCreating: createRequestMutation.isPending,
  };
}
