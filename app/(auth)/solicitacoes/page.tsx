'use client';

import React from 'react';
import RequestsView from '@/components/RequestsView';
import { useAppState } from '@/hooks/use-app-state';
import { useRouter } from 'next/navigation';

export default function SolicitacoesPage() {
  const { setSelectedRequest, setChatBotOpen } = useAppState();
  const router = useRouter();

  return (
    <RequestsView
      onOpenMarketingForm={() => router.push('/nova-solicitacao-marketing')}
      onSelectRequest={(req) => setSelectedRequest(req)}
      onOpenBotChat={() => setChatBotOpen(true)}
    />
  );
}
