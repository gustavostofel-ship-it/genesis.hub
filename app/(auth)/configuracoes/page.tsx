'use client';

import React from 'react';
import { Settings } from 'lucide-react';

export default function ConfiguracoesPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
          <Settings className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">Configurações do Genesis Hub</h2>
            <p className="text-xs text-slate-500">Preferências de perfil corporativo, notificações e ramal</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">Ramal Virtual WebRTC</span>
              <span className="text-xs text-slate-500">Receber chamadas de ramal diretamente pelo navegador</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Ativo (#4402)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">Notificações por E-mail</span>
              <span className="text-xs text-slate-500">Alertas de aprovação de demandas e aniversários</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              m.alencar@genesis.io
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
