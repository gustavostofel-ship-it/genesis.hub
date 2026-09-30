'use client';

import React from 'react';
import Image from 'next/image';
import { X, Download, BookOpen, Check, Palette, FileText } from 'lucide-react';
import { LOGO_URL } from '../Sidebar';
import toast from 'react-hot-toast';


interface BrandManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BrandManualModal({ isOpen, onClose }: BrandManualModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl bg-white text-slate-800 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#1d4ed8] to-[#0f2a5c] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Manual de Marca Genesis 2025</h2>
              <p className="text-xs text-blue-200 mt-0.5">
                Diretrizes de identidade corporativa, paleta cromática e tipografia
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Logo Section */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              1. Logotipo Corporativo
            </span>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12">
                  <Image
                    src={LOGO_URL}
                    alt="Logo Genesis"
                    fill
                    sizes="48px"
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Genesis Hub Masterbrand</h4>
                  <p className="text-xs text-slate-500">Versão primária sobre fundos claros e escuros</p>
                </div>
              </div>
              <button
                onClick={() => toast('Em desenvolvimento: Download do pacote SVG/PNG do logotipo iniciado.', { icon: '🚧' })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Kit Logos (.ZIP)</span>
              </button>
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              2. Paleta de Cores Institucionais
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col">
                <div className="h-12 rounded-lg bg-[#1d4ed8] mb-2 shadow-xs" />
                <span className="font-semibold text-xs text-slate-800">Royal Genesis</span>
                <span className="text-[11px] font-mono text-slate-400">#1D4ED8</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col">
                <div className="h-12 rounded-lg bg-[#0f2a5c] mb-2 shadow-xs" />
                <span className="font-semibold text-xs text-slate-800">Deep Navy</span>
                <span className="text-[11px] font-mono text-slate-400">#0F2A5C</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col">
                <div className="h-12 rounded-lg bg-[#eff4ff] border border-blue-200 mb-2 shadow-xs" />
                <span className="font-semibold text-xs text-slate-800">Soft Surface</span>
                <span className="text-[11px] font-mono text-slate-400">#EFF4FF</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col">
                <div className="h-12 rounded-lg bg-[#10b981] mb-2 shadow-xs" />
                <span className="font-semibold text-xs text-slate-800">Success Emerald</span>
                <span className="text-[11px] font-mono text-slate-400">#10B981</span>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              3. Tipografia Oficial
            </span>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-sm">Plus Jakarta Sans</span>
                <span className="text-blue-700 font-semibold bg-blue-100/60 px-2 py-0.5 rounded">
                  Padrão Universal
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Utilizada universalmente em títulos, corpo de texto e dados para conferir clareza geométrica e
                modernidade.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">Versão aprovada pela Diretoria de Marketing</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1d4ed8] text-white hover:bg-blue-700 text-xs font-semibold transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
