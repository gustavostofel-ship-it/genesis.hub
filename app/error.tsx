'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { LOGO_URL } from '@/components/Sidebar';
import Image from 'next/image';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col items-center text-center p-8">
        <div className="h-16 w-16 relative mb-6">
          <Image src={LOGO_URL} alt="Genesis Hub" fill sizes="64px" className="object-contain" />
        </div>
        
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Algo deu errado</h1>
        <p className="text-sm text-slate-500 mb-8 max-w-sm">
          Ocorreu um erro inesperado ao tentar carregar esta tela. Nossa equipe técnica já foi notificada.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            onClick={() => window.location.href = '/inicio'}
            className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Voltar ao Início
          </button>
          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl shadow-sm text-sm font-semibold text-white bg-[#1d4ed8] hover:bg-blue-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Tentar novamente</span>
          </button>
        </div>
      </div>
    </div>
  );
}
