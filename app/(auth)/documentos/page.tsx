'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { useAppState } from '@/hooks/use-app-state';

export default function DocumentosPage() {
  const { setBrandManualOpen, showToast } = useAppState();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Repositório de Documentos & Políticas</h2>
        <p className="text-sm text-slate-500 max-w-md mt-1 mb-6">
          Acesse políticas institucionais, manuais operacionais, formulários de compliance e contratos padronizados da Rede Genesis.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl text-left">
          <div
            onClick={() => setBrandManualOpen(true)}
            className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 cursor-pointer transition-colors"
          >
            <span className="font-bold text-xs text-blue-700 block">Manual_Marca_Genesis_2025.pdf</span>
            <span className="text-[11px] text-slate-500">Diretrizes completas de branding</span>
          </div>
          <div
            onClick={() => showToast('Baixando Política de Segurança da Informação...')}
            className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 cursor-pointer transition-colors"
          >
            <span className="font-bold text-xs text-slate-900 block">Politica_Seguranca_Informacao_v3.pdf</span>
            <span className="text-[11px] text-slate-500">Compliance e proteção de dados</span>
          </div>
        </div>
      </div>
    </div>
  );
}
