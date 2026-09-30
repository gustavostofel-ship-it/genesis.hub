'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  History,
  Plus,
  ChevronDown,
  Megaphone,
  Laptop,
  Printer,
  CalendarDays,
  Terminal,
  Search,
  SlidersHorizontal,
  Download,
  RotateCw,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  PhoneCall,
  Bot,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  RefreshCw,
} from 'lucide-react';
import { RequestItem } from '@/lib/data';
import { useRequests } from '@/hooks/use-requests';
import toast from 'react-hot-toast';


interface RequestsViewProps {
  onOpenMarketingForm: () => void;
  onSelectRequest: (req: RequestItem) => void;
  onOpenBotChat: () => void;
}

export default function RequestsView({
  onOpenMarketingForm,
  onSelectRequest,
  onOpenBotChat,
}: RequestsViewProps) {
  const { requests, isLoading, isError, refetch } = useRequests();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      if (activeFilter !== 'all' && req.status !== activeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = req.title.toLowerCase().includes(q);
        const matchProtocol = req.protocol.toLowerCase().includes(q);
        const matchCategory = req.category.toLowerCase().includes(q);
        const matchAssignee = req.assignee.name.toLowerCase().includes(q);
        if (!matchTitle && !matchProtocol && !matchCategory && !matchAssignee) {
          return false;
        }
      }
      return true;
    });
  }, [requests, activeFilter, searchQuery]);

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Protocolo,Categoria,Titulo,Responsavel,Status,Abertura,Previsao\n' +
      requests
        .map(
          (r) =>
            `"${r.protocol}","${r.category}","${r.title}","${r.assignee.name}","${r.status}","${r.createdAt}","${r.dueDate}"`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'genesis_solicitacoes.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 max-w-[1520px] mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Genesis Hub
              </span>
              <span className="text-slate-300 text-xs">•</span>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Central de Atendimento
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Central de Atendimento e Solicitações
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-0.5">
              Acompanhe seus chamados internos, solicite demandas a outros setores ou abra requisições corporativas com prazos de SLA garantidos.
            </p>
          </div>

          {/* Action Group */}
          <div className="flex items-center gap-3 self-start md:self-center shrink-0">
            <button
              onClick={() => toast('Em desenvolvimento: Histórico completo de chamados finalizados e arquivados.', { icon: '🚧' })}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 text-slate-700 font-semibold text-xs sm:text-sm shadow-xs hover:bg-slate-50 transition-colors"
            >
              <History className="w-4 h-4 text-slate-500" />
              <span>Histórico</span>
            </button>

            {/* Quick Trigger Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:bg-blue-700 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ Nova solicitação</span>
                <ChevronDown className="w-3.5 h-3.5 -mr-1" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in duration-150">
                  <span className="px-3 py-1.5 text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                    Criar demanda rápida
                  </span>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenMarketingForm();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-blue-50 text-blue-700 text-xs font-semibold transition-colors text-left"
                  >
                    <Megaphone className="w-4 h-4 text-blue-600" />
                    <span>Demanda de Marketing</span>
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      toast('Em desenvolvimento: Abrindo formulário de chamado técnico para suporte de T.I.', { icon: '🚧' });
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors text-left"
                  >
                    <Terminal className="w-4 h-4 text-slate-600" />
                    <span>Suporte Técnico de T.I.</span>
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      toast('Em desenvolvimento: Abrindo requisição de hardware e periféricos.', { icon: '🚧' });
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors text-left"
                  >
                    <Laptop className="w-4 h-4 text-indigo-600" />
                    <span>Requisição de Equipamentos</span>
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      toast('Em desenvolvimento: Abrindo portal de DP para agendamento de férias.', { icon: '🚧' });
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors text-left"
                  >
                    <CalendarDays className="w-4 h-4 text-purple-600" />
                    <span>Férias e Licenças</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Quick Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1. Highlight Featured Card: Solicitar ao Marketing */}
          <div
            onClick={onOpenMarketingForm}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1d4ed8] via-[#0037b0] to-[#0f2a5c] text-white p-5 flex flex-col justify-between shadow-md hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="relative flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white">
                  <Megaphone className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider">
                  Destaque
                </span>
              </div>
              <span className="text-base sm:text-lg font-bold text-white leading-tight">
                Solicitar ao Marketing
              </span>
              <p className="text-xs text-blue-100 mt-1.5 leading-snug">
                Campanhas, vídeos, marcas e peças de comunicação para seu setor.
              </p>
            </div>
            <div className="relative mt-5 pt-3 border-t border-white/15 flex items-center justify-between">
              <span className="text-xs font-bold text-blue-200 group-hover:text-white transition-colors flex items-center gap-1">
                Abrir chamado criativo <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[10px] text-blue-300 font-mono">SLA 3-5d</span>
            </div>
          </div>

          {/* 2. Equipamentos */}
          <div
            onClick={() => toast('Em desenvolvimento: Acesso ao catálogo de periféricos e substituição de hardware.', { icon: '🚧' })}
            className="rounded-2xl bg-white border border-slate-200/80 p-5 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Laptop className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-400">12 itens</span>
              </div>
              <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                Equipamentos
              </span>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Notebooks, fones de ouvido, monitores e periféricos de trabalho.
              </p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                Solicitar →
              </span>
              <span>Entrega em até 48h</span>
            </div>
          </div>

          {/* 3. Materiais & Gráfica */}
          <div
            onClick={() => toast('Em desenvolvimento: Requisição de crachás, cadernos, papelaria e brindes institucionais.', { icon: '🚧' })}
            className="rounded-2xl bg-white border border-slate-200/80 p-5 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Printer className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-400">8 itens</span>
              </div>
              <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                Materiais & Gráfica
              </span>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Papelaria institucional, crachá, cartões de visita e kits de boas-vindas.
              </p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                Solicitar →
              </span>
              <span>Estoque local</span>
            </div>
          </div>

          {/* 4. Férias & Ausências */}
          <div
            onClick={() => toast('Em desenvolvimento: Agendamento de férias integrado com o departamento pessoal.', { icon: '🚧' })}
            className="rounded-2xl bg-white border border-slate-200/80 p-5 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-400">DP / RH</span>
              </div>
              <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                Férias & Ausências
              </span>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Agendamento formal, recessos, abonos e comprovantes sindicais.
              </p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                Agendar →
              </span>
              <span>Mín. 15 dias</span>
            </div>
          </div>

          {/* 5. Suporte T.I. */}
          <div
            onClick={() => toast('Em desenvolvimento: Abertura de ticket técnico 24/7 com a equipe de infraestrutura.', { icon: '🚧' })}
            className="rounded-2xl bg-white border border-slate-200/80 p-5 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Terminal className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  24/7
                </span>
              </div>
              <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                Suporte T.I.
              </span>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Acessos corporativos, VPN, senhas de domínio e infraestrutura de rede.
              </p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                Abrir Ticket →
              </span>
              <span>Fila prioritária</span>
            </div>
          </div>
        </div>

        {/* Desktop 75% Data Table + 25% Status Summary */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left Column (9 cols) */}
          <div className="xl:col-span-9 flex flex-col gap-4">
            {/* Table Control Bar Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Todas ({requests.length})
                </button>
                <button
                  onClick={() => setActiveFilter('aberta')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeFilter === 'aberta'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Abertas (4)
                </button>
                <button
                  onClick={() => setActiveFilter('analise')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeFilter === 'analise'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Em análise (2)
                </button>
                <button
                  onClick={() => setActiveFilter('aprovada')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeFilter === 'aprovada'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Aprovadas (3)
                </button>
                <button
                  onClick={() => setActiveFilter('concluida')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeFilter === 'concluida'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Concluídas (9)
                </button>
              </div>

              {/* Search & Export */}
              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-60">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filtrar por título ou protocolo..."
                    className="w-full h-9 pl-9 pr-3 rounded-xl bg-slate-50 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 border border-slate-200"
                  />
                </div>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold transition-colors"
                  title="Exportar CSV/Planilha"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Exportar</span>
                </button>
              </div>
            </div>

            {/* Main Data Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">Minhas Solicitações</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                    5 mais recentes
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Atualizado há 3 minutos</span>
                  <button
                    onClick={() => toast('Em desenvolvimento: Lista sincronizada com o banco de dados Genesis.', { icon: '🚧' })}
                    className="p-1 rounded-lg hover:text-blue-600 hover:bg-slate-50"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80">
                    <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <th className="py-3 px-6">Protocolo</th>
                      <th className="py-3 px-4">Tipo / Categoria</th>
                      <th className="py-3 px-4">Título da Demanda</th>
                      <th className="py-3 px-4">Responsável</th>
                      <th className="py-3 px-4">Abertura</th>
                      <th className="py-3 px-4">Previsão</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-6 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {isLoading && (
                      <tr>
                        <td colSpan={8} className="py-8 text-center animate-pulse">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200" />
                            <div className="w-32 h-4 bg-slate-200 rounded-full" />
                            <span className="text-slate-400 font-semibold">Carregando solicitações...</span>
                          </div>
                        </td>
                      </tr>
                    )}
                    {isError && (
                      <tr>
                        <td colSpan={8} className="py-8">
                          <div className="bg-red-50 text-red-600 rounded-2xl p-6 mx-4 flex flex-col items-center justify-center text-center gap-3 border border-red-100">
                            <span className="font-bold text-sm">Falha ao carregar as solicitações</span>
                            <button onClick={() => refetch()} className="px-4 py-2 mt-2 bg-white text-red-600 rounded-xl font-bold shadow-sm text-xs border border-red-200 hover:bg-red-50 flex items-center gap-1.5">
                              <RefreshCw className="w-3.5 h-3.5" /> Tentar Novamente
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                    {!isLoading && !isError && filteredRequests.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-500">
                          Nenhuma solicitação encontrada para os filtros atuais.
                        </td>
                      </tr>
                    )}
                    {!isLoading && !isError && filteredRequests.map((req) => (
                      <tr
                        key={req.id}
                        className="hover:bg-slate-50/60 transition-colors group cursor-pointer"
                        onClick={() => onSelectRequest(req)}
                      >
                        <td className="py-3.5 px-6 whitespace-nowrap font-mono font-bold text-blue-700">
                          {req.protocol}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 font-medium">
                          {req.category}
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <span className="font-semibold text-slate-900 block truncate">
                            {req.title}
                          </span>
                          <span className="text-[11px] text-slate-400 block truncate">
                            {req.subtitle}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0">
                              <Image
                                src={req.assignee.avatar}
                                alt={req.assignee.name}
                                fill
                                sizes="28px"
                                className="object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-900 text-xs">
                                {req.assignee.name}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {req.assignee.role}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                          {req.createdAt}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-700 font-medium">
                          {req.dueDate}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {req.status === 'analise' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                              Em análise
                            </span>
                          )}
                          {req.status === 'aprovada' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Aprovada
                            </span>
                          )}
                          {req.status === 'concluida' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                              Concluída
                            </span>
                          )}
                          {req.status === 'aberta' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                              Aberta
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-6 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectRequest(req);
                            }}
                            className="px-2.5 py-1 rounded-lg text-blue-700 hover:bg-blue-50 font-semibold text-xs transition-colors"
                          >
                            Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Pagination */}
              <div className="px-6 py-3 bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                <span>
                  Mostrando <strong className="text-slate-800">1 a {filteredRequests.length}</strong> de{' '}
                  <strong className="text-slate-800">18</strong> solicitações
                </span>

                <div className="flex items-center gap-1">
                  <button
                    disabled
                    className="p-1 rounded-md text-slate-300 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-bold">
                    1
                  </button>
                  <button className="px-2.5 py-1 rounded-md hover:bg-slate-200 text-slate-700">
                    2
                  </button>
                  <button className="px-2.5 py-1 rounded-md hover:bg-slate-200 text-slate-700">
                    3
                  </button>
                  <button className="p-1 rounded-md hover:bg-slate-200 text-slate-700">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (3 cols) - Status Summary & SLAs */}
          <div className="xl:col-span-3 flex flex-col gap-5">
            {/* Summary KPI Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-sm text-slate-900">Status Geral</span>
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>

              {/* Circular Metric & Highlights */}
              <div className="flex items-center gap-4 py-1">
                <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-blue-600"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="98, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute font-bold text-sm text-blue-700">98%</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-bold text-xs text-slate-900">Índice de Satisfação</span>
                  <span className="text-[11px] text-slate-500">SLA corporativo cumprido</span>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                    <TrendingUp className="w-3 h-3" /> +2.1% no trimestre
                  </span>
                </div>
              </div>

              {/* KPI Metric Rows */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-xs text-slate-700">Chamados Abertos</span>
                  </div>
                  <span className="font-bold text-xs text-slate-900">04</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-xs text-slate-700">Em Análise Técnica</span>
                  </div>
                  <span className="font-bold text-xs text-slate-900">02</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-700">Concluídos este mês</span>
                  </div>
                  <span className="font-bold text-xs text-slate-900">12</span>
                </div>
              </div>

              {/* Fast SLA Indicator */}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Tempo Médio de 1ª Resposta</span>
                  <span className="font-bold text-blue-700">42 minutos</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '82%' }} />
                </div>
              </div>
            </div>

            {/* Team Availability & Urgent Help Desk Box */}
            <div className="relative overflow-hidden rounded-2xl bg-[#1b293a] text-white p-5 flex flex-col justify-between shadow-md">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-500/20 blur-xl pointer-events-none" />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-white">Precisa de Ajuda Urgente?</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Para incidentes críticos que afetam a operação da empresa, contate o ramal de emergência ou acione o assistente corporativo.
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <a
                  href="tel:9000"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-blue-300" />
                    <span>Ramal de Plantão</span>
                  </span>
                  <span className="font-mono font-bold text-blue-300">#9000</span>
                </a>

                <button
                  onClick={onOpenBotChat}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <Bot className="w-4 h-4" />
                  <span>Iniciar Chat com Bot Genesis</span>
                </button>
              </div>
            </div>

            {/* Corporate Policy Mini Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3 shadow-xs">
              <FileText className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
              <div className="flex flex-col text-xs">
                <span className="font-bold text-slate-900">Política de Solicitações Genesis</span>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                  Chamados abertos após 18h serão distribuídos no início do expediente seguinte.
                </p>
                <button
                  onClick={() => toast('Em desenvolvimento: Termo de SLA: Prazos regulamentados pelo compliance corporativo.', { icon: '🚧' })}
                  className="text-blue-600 font-semibold hover:underline mt-1.5 text-left"
                >
                  Ler termo de SLA →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
