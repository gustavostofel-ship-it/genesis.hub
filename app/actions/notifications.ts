'use server';

import { createClient } from '@/lib/supabase/server';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  link?: string;
  created_at: string;
}

// Mocks if DB is not connected yet
let MOCK_NOTIFICATIONS: NotificationItem[] = [];

export async function getNotifications(): Promise<NotificationItem[]> {
  try {
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();

    // Fallback to MOCK if no auth user (simulating Phase 3 without DB running)
    if (!user?.user) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return MOCK_NOTIFICATIONS;
    }

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return MOCK_NOTIFICATIONS;
  }
}

export async function markNotificationAsRead(id: string): Promise<void> {
  try {
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();

    if (!user?.user) {
      MOCK_NOTIFICATIONS = MOCK_NOTIFICATIONS.map((n) =>
        n.id === id ? { ...n, is_read: true } : n
      );
      return;
    }

    const { error } = await (supabase as any)
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error marking as read:', error);
    // Fallback update
    MOCK_NOTIFICATIONS = MOCK_NOTIFICATIONS.map((n) =>
      n.id === id ? { ...n, is_read: true } : n
    );
  }
}
