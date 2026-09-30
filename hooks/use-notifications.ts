'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotifications, markNotificationAsRead, NotificationItem } from '@/app/actions/notifications';
import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useNotifications() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  const { data: notifications, isLoading, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => markNotificationAsRead(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      const previous = queryClient.getQueryData<NotificationItem[]>(['notifications']);
      
      queryClient.setQueryData<NotificationItem[]>(['notifications'], (old) => {
        if (!old) return [];
        return old.map(n => n.id === id ? { ...n, is_read: true } : n);
      });

      return { previous };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['notifications'], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  useEffect(() => {
    // FASE 3: Realtime Subscription
    // Inscreve no canal para escutar novas notificações do banco
    const channel = supabase
      .channel('notifications_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          console.log('Nova notificação via Realtime:', payload);
          // Invalida cache para buscar dados novos e piscar o sino
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, queryClient]);

  const unreadCount = notifications?.filter(n => !n.is_read).length || 0;

  return {
    notifications: notifications || [],
    unreadCount,
    isLoading,
    refetch,
    markAsRead: markAsReadMutation.mutate,
  };
}
