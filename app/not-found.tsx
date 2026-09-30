'use client';

import React from 'react';
import { Search, Home } from 'lucide-react';
import { LOGO_URL } from '@/components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col items-center text-center p-8">
        <div className="h-16 w-16 relative mb-6">
          <Image src={LOGO_URL} alt="Genesis Hub" fill sizes="64px" className="object-contain" />
        </div>
        
        <div className="text-[80px] font-extrabold text-slate-100 leading-none mb-2">
          404
        </div>
        
        <h1 className="text-xl font-bold text-slate-900 mb-2">Página não encontrada</h1>
        <p className="text-sm text-slate-500 mb-8 max-w-sm">
          A rota que você tentou acessar não existe ou foi movida. Verifique a URL ou volte ao painel principal.
        </p>

        <div className="flex flex-col gap-3 w-full">
          <Link
            href="/inicio"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-sm text-sm font-bold text-white bg-[#1d4ed8] hover:bg-blue-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
