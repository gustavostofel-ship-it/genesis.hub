'use client';

import React from 'react';
import Image from 'next/image';
import {
  X,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  User,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { RequestItem } from '@/lib/data';

interface TicketDetailsDrawerProps {
  request: RequestItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TicketDetailsDrawer({
  request,
  isOpen,
  onClose,
}: TicketDetailsDrawerProps) {
  if (!isOpen || !request) return null;

  const getStatusBadge = (status: RequestItem['status']) => {
    switch (status) {
      case 'analise':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Em análise técnica
          </span>
        );
      case 'aprovada':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Aprovada
          </span>
        );
      case 'concluida':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
            Concluída
          </span>
        );
      case 'aberta':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            Aberta
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg h-full bg-white shadow-2xl overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/60">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                  {request.protocol}
                </span>
                <span className="text-xs text-slate-500 font-medium">• {request.category}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">{request.title}</h2>
              <p className="text-xs text-slate-500 mt-1">{request.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6">
            {/* Status & SLA Bar */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Status Atual
                </span>
                {getStatusBadge(request.status)}
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Previsão SLA
                </span>
                <span className="text-xs font-semibold text-slate-800 flex items-center gap-1 justify-end">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {request.dueDate}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Detalhamento do Briefing / Requisição
              </span>
              <div className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-100/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {request.description ||
                  'Solicitação corporativa enviada para análise técnica da equipe responsável, com prazos e entregáveis monitorados pelo SLA corporativo.'}
              </div>
            </div>

            {/* Assignee Card */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Profissional Responsável
              </span>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={request.assignee.avatar}
                    alt={request.assignee.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-semibold text-slate-900">{request.assignee.name}</span>
                  <span className="text-slate-500">{request.assignee.role}</span>
                </div>
              </div>
            </div>

            {/* Timeline Progress */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                Histórico do Chamado
              </span>
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                <div className="relative">
                  <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white" />
                  <span className="text-xs font-semibold text-slate-800 block">Chamado aberto pelo solicitante</span>
                  <span className="text-[11px] text-slate-400">{request.createdAt}</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white" />
                  <span className="text-xs font-semibold text-slate-800 block">Triagem técnica realizada</span>
                  <span className="text-[11px] text-slate-400">Atribuído a {request.assignee.name}</span>
                </div>
                {request.status === 'concluida' ? (
                  <div className="relative">
                    <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-white" />
                    <span className="text-xs font-semibold text-emerald-800 block">Chamado finalizado e aprovado</span>
                    <span className="text-[11px] text-slate-400">Concluído dentro do prazo de SLA</span>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-slate-300 ring-4 ring-white" />
                    <span className="text-xs font-medium text-slate-500 block">Entrega final da versão</span>
                    <span className="text-[11px] text-slate-400">Previsão: {request.dueDate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">Genesis Service Desk SLA Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
