'use client';

import React from 'react';
import FeedView from '@/components/FeedView';
import { useAppState } from '@/hooks/use-app-state';
import { useRouter } from 'next/navigation';

export default function InicioPage() {
  const { setVideoModal } = useAppState();
  const router = useRouter();

  const handlePlayVideo = (title: string, cover: string, duration?: string) => {
    setVideoModal({ title, cover, duration });
  };

  return (
    <FeedView
      onOpenMarketingForm={() => router.push('/nova-solicitacao-marketing')}
      onOpenRequests={() => router.push('/solicitacoes')}
      onOpenPeople={() => router.push('/pessoas')}
      onPlayVideo={handlePlayVideo}
    />
  );
}
