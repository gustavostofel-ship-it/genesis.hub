'use client';

import React from 'react';
import MarketingRequestFormView from '@/components/MarketingRequestFormView';
import { useAppState } from '@/hooks/use-app-state';
import { useRouter } from 'next/navigation';
import { RequestItem } from '@/lib/data';

export default function NovaSolicitacaoMarketingPage() {
  const { setBrandManualOpen, setSelectedRequest, showToast } = useAppState();
  const router = useRouter();

  const handleRequestCreated = (newReq: RequestItem) => {
    showToast(`Solicitação ${newReq.protocol} criada com sucesso e enviada ao Marketing!`);
    setSelectedRequest(newReq);
    router.push('/solicitacoes');
  };

  return (
    <MarketingRequestFormView
      onBackToRequests={() => router.push('/solicitacoes')}
      onOpenBrandManual={() => setBrandManualOpen(true)}
      onSubmitSuccess={handleRequestCreated}
    />
  );
}
