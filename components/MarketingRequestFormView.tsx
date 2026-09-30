'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  BookOpen,
  Lock,
  Lightbulb,
  Calendar,
  Users,
  UploadCloud,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  X,
  ShieldCheck,
  Send,
  Clock,
  Sparkles,
  ExternalLink,
  Layers,
  FileCheck,
  Loader2,
} from 'lucide-react';
import { RequestItem } from '@/lib/data';
import { useRequests } from '@/hooks/use-requests';
import toast from 'react-hot-toast';


interface MarketingRequestFormViewProps {
  onBackToRequests: () => void;
  onOpenBrandManual: () => void;
  onSubmitSuccess: (newReq: RequestItem) => void;
}

export default function MarketingRequestFormView({
  onBackToRequests,
  onOpenBrandManual,
  onSubmitSuccess,
}: MarketingRequestFormViewProps) {
  const [title, setTitle] = useState('Campanha de Lançamento Genesis Flow 2.0');
  const [demandType, setDemandType] = useState('redes-sociais');
  const [description, setDescription] = useState(
    "Precisamos de um carrossel de 5 lâminas para o LinkedIn e Instagram corporativo apresentando a nova suíte de automação Genesis Flow 2.0. O foco deve ser a economia de tempo das lideranças operacionais. CTA final: 'Conheça o módulo no Hub'. Tom moderno e confiável."
  );
  const [audience, setAudience] = useState(
    'C-Levels, Diretores de Operações e Gestores de Projetos'
  );
  const [deadline, setDeadline] = useState('2025-04-18');
  const [priority, setPriority] = useState<'baixa' | 'media' | 'alta'>('media');

  const [attachments, setAttachments] = useState<
    Array<{ id: string; name: string; size: string; type: 'pdf' | 'img' }>
  >([
    {
      id: 'att-1',
      name: 'Guia_Marca_Campanha_Genesis_2025.pdf',
      size: '4.2 MB',
      type: 'pdf',
    },
    {
      id: 'att-2',
      name: 'Esboço_Wireframe_Carrossel_LinkedIn.png',
      size: '1.8 MB',
      type: 'img',
    },
  ]);

  const { createRequest, isCreating: isSubmitting } = useRequests();
  const [draftSaved, setDraftSaved] = useState(false);

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddSimulatedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isImg = file.type.includes('image');
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setAttachments((prev) => [
        ...prev,
        {
          id: `att-${Date.now()}`,
          name: file.name,
          size: `${sizeMb} MB`,
          type: isImg ? 'img' : 'pdf',
        },
      ]);
    }
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error('Por favor, preencha os campos obrigatórios do briefing.');
      return;
    }

    try {
      const newRequest = await createRequest({
        title: title.trim(),
        demandType,
        description,
        audience,
        deadline,
        priority
      });
      
      onSubmitSuccess(newRequest);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 py-6 max-w-[1440px] mx-auto">
        {/* Top Navigation & Breadcrumb */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <button
                onClick={onBackToRequests}
                className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
              >
                <span>Solicitações</span>
              </button>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">Marketing</span>
              <span className="text-slate-300">/</span>
              <span className="font-bold text-blue-700">Nova Demanda Criativa</span>
            </nav>

            <button
              onClick={onBackToRequests}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para Solicitações</span>
            </button>
          </div>

          {/* Header Block */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pt-1">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 tracking-wide uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Marketing Hub Genesis
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-400">Versão do Fluxo 4.2</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Nova solicitação ao Marketing
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
                Preencha o briefing detalhado para a equipe de Marketing com clareza e objetivos definidos para acelerar o início e entrega da sua demanda.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start lg:self-auto shrink-0">
              <button
                onClick={onOpenBrandManual}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Manual de Marca 2025</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Left Column Form (8 cols) + Right Column Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN FORM */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 flex flex-col gap-6">
            {/* Card 1: Identificação do Solicitante Preview */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100 text-blue-700">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-slate-900">Identificação do Solicitante</h2>
                    <p className="text-[11px] text-slate-400">
                      Dados sincronizados com o diretório corporativo Genesis
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700">
                  <Lock className="w-3 h-3 text-blue-600" />
                  Sessão Ativa
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Colaborador(a)
                  </span>
                  <span className="font-bold text-slate-900 block truncate">Mariana Alencar</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">ID: #GH-8841</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Cargo / Papel
                  </span>
                  <span className="font-bold text-slate-900 block truncate">Coord. Branding</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Nível III</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Área & Ramal
                  </span>
                  <span className="font-bold text-slate-900 block truncate">Marketing Corp.</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Ramal: 4402</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    E-mail Corporativo
                  </span>
                  <span className="font-bold text-slate-900 block truncate">m.alencar@genesis.io</span>
                  <span className="text-[10px] font-semibold text-blue-600 block mt-0.5">
                    Centro de Custo: CC-204
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Dados da Demanda Criativa */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col gap-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100 text-blue-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-slate-900">Dados da Demanda Criativa</h2>
                  <p className="text-[11px] text-slate-400">
                    Forneça os direcionamentos estratégicos e conceituais
                  </p>
                </div>
              </div>

              {/* Title & Type */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>
                      Título da Demanda <span className="text-red-500">*</span>
                    </span>
                    <span className="text-[11px] font-normal text-slate-400">
                      Seja conciso e direto
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Banner digital para lançamento do projeto Alpha"
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-50 text-slate-900 text-xs sm:text-sm border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                </div>

                <div className="md:col-span-4 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Tipo de Demanda <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={demandType}
                    onChange={(e) => setDemandType(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-50 text-slate-900 text-xs sm:text-sm border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all cursor-pointer"
                  >
                    <option value="redes-sociais">Arte para Redes Sociais</option>
                    <option value="video">Produção de Vídeo / Motion</option>
                    <option value="apresentacao">Apresentação Corporativa (Deck)</option>
                    <option value="evento">Peças Gráficas para Evento</option>
                    <option value="landing-page">Landing Page / UI Design</option>
                    <option value="comunicacao-interna">Endomarketing / Comunicado</option>
                    <option value="outro">Outro Formato</option>
                  </select>
                </div>
              </div>

              {/* Helper Callout Box for Briefing */}
              <div className="bg-blue-50/70 rounded-xl p-4 flex items-start gap-3 border border-blue-100">
                <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block mb-1">
                    Dica para um briefing assertivo:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Defina: <strong className="text-slate-900">1. Mensagem Principal</strong> (o que o usuário deve reter);{' '}
                    <strong className="text-slate-900">2. Chamada para Ação (CTA)</strong>;{' '}
                    <strong className="text-slate-900">3. Formato final</strong> (1080x1080, 1920x1080, etc); e anexe sempre que possível exemplos visuais de referência.
                  </p>
                </div>
              </div>

              {/* Detailed Briefing Textarea */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700">
                    Descrição do Objetivo & Mensagem Chave <span className="text-red-500">*</span>
                  </label>
                  <span className="text-slate-400 font-medium">
                    {description.length} caracteres (Mínimo 50)
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o contexto do projeto, quais são as metas pretendidas com esta peça, tom de voz..."
                  className="w-full p-3.5 rounded-xl bg-slate-50 text-slate-900 text-xs sm:text-sm border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all leading-relaxed"
                />
              </div>

              {/* Target Audience & Desired Deadline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Público-Alvo <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Users className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      placeholder="Ex: Novos clientes B2B e colaboradores internos"
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 text-slate-900 text-xs sm:text-sm border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-bold text-slate-700">
                      Prazo Desejado de Entrega <span className="text-red-500">*</span>
                    </label>
                    <span className="text-blue-700 font-semibold text-[11px]">Mín. 5 dias úteis</span>
                  </div>
                  <div className="relative flex items-center">
                    <Calendar className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type="date"
                      required
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 text-slate-900 text-xs sm:text-sm border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Priority Selector */}
              <div className="flex flex-col gap-2 pt-1">
                <label className="text-xs font-bold text-slate-700">
                  Nível de Prioridade da Demanda <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Baixa */}
                  <label
                    onClick={() => setPriority('baixa')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      priority === 'baixa'
                        ? 'bg-blue-50/60 border-blue-600 ring-1 ring-blue-600'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        priority === 'baixa' ? 'border-blue-600' : 'border-slate-300'
                      }`}
                    >
                      {priority === 'baixa' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                    <div className="flex flex-col text-xs">
                      <span className="font-bold text-slate-900">Baixa</span>
                      <span className="text-[11px] text-slate-500">Até 10 dias úteis</span>
                    </div>
                  </label>

                  {/* Média */}
                  <label
                    onClick={() => setPriority('media')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      priority === 'media'
                        ? 'bg-blue-50/60 border-blue-600 ring-1 ring-blue-600'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        priority === 'media' ? 'border-blue-600' : 'border-slate-300'
                      }`}
                    >
                      {priority === 'media' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                    <div className="flex flex-col text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">Média</span>
                        <span className="px-1.5 py-0.2 rounded font-bold text-[9px] bg-blue-100 text-blue-800 uppercase">
                          Padrão
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">SLA normal (5 dias)</span>
                    </div>
                  </label>

                  {/* Alta */}
                  <label
                    onClick={() => setPriority('alta')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      priority === 'alta'
                        ? 'bg-red-50/60 border-red-500 ring-1 ring-red-500'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        priority === 'alta' ? 'border-red-500' : 'border-slate-300'
                      }`}
                    >
                      {priority === 'alta' && <div className="w-2 h-2 rounded-full bg-red-500" />}
                    </div>
                    <div className="flex flex-col text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">Alta</span>
                        <span className="px-1.5 py-0.2 rounded font-bold text-[9px] bg-red-100 text-red-700 uppercase">
                          Urgente
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">Requer justificativa</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Attachments Section */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700">Arquivos e Referências de Apoio</label>
                  <span className="text-slate-400">Formatos: PDF, PNG, JPG, PSD até 100MB</span>
                </div>

                {/* Dropzone */}
                <label className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 hover:bg-blue-50/40 hover:border-blue-300 cursor-pointer transition-colors text-center">
                  <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center text-blue-600 mb-2 group-hover:scale-105 transition-transform border border-slate-100">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-slate-800">
                    Clique para selecionar ou arraste os arquivos aqui
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Rascunhos, logotipos específicos, roteiros ou planilhas de conteúdo
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleAddSimulatedFile}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>

                {/* Pre-attached list */}
                <div className="flex flex-col gap-2 mt-2">
                  {attachments.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            file.type === 'pdf'
                              ? 'bg-red-50 text-red-600'
                              : 'bg-blue-50 text-blue-600'
                          }`}
                        >
                          {file.type === 'pdf' ? (
                            <FileText className="w-5 h-5" />
                          ) : (
                            <ImageIcon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0 text-xs">
                          <span className="font-bold text-slate-900 truncate">{file.name}</span>
                          <span className="text-[11px] text-slate-500">
                            {file.size} • Upload concluído
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(file.id)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                          title="Remover anexo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>A solicitação será vinculada ao seu centro de custo CC-204.</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {draftSaved && (
                    <span className="text-xs text-emerald-600 font-semibold animate-in fade-in">
                      Rascunho salvo!
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                  >
                    Salvar como Rascunho
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs shadow-md transition-all"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span>{isSubmitting ? 'Enviando...' : 'Enviar solicitação ao Marketing'}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* RIGHT COLUMN (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Box 1: Fluxo de Atendimento Visual Stepper */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <Clock className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-sm text-slate-900">O que acontece após o envio?</h2>
              </div>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-blue-100">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white" />
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-slate-900">1. Triagem e validação da demanda</span>
                    <p className="text-slate-500 mt-0.5 leading-relaxed">
                      Marketing avalia escopo e viabilidade técnica em até{' '}
                      <strong className="text-slate-800">24h úteis</strong>.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-indigo-600 ring-4 ring-white" />
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-slate-900">2. Alocação do especialista</span>
                    <p className="text-slate-500 mt-0.5 leading-relaxed">
                      Designer gráfico, redator ou videomaker designado para execução no sprint.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-white" />
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-slate-900">3. Envio da primeira versão (V1)</span>
                    <p className="text-slate-500 mt-0.5 leading-relaxed">
                      Notificação automática no Genesis Hub com link para aprovação ou ajustes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Time de Criação Genesis & Studio Stats */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="relative h-32 w-full overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD7gQalo2vLMOv52reKCrlKzfQkLez7pjbdVNUIp09RqPW13quaEWKleF6_QqyIBvkst6EzPOBcFwJKfxJT82xq2k1aKa-pVoywaBdbVKPcJBz5IeajeoojEp4hTF68tNzXfNKeqG0rKJKKhPpPG_qAlNXwPQyzSTtLcGD71OR6wnF155rwiCYgKbH1XKfh8dilmS3pRYxvAORItbdQt8czgDdAV_NXwMj7_o_J8lmO42Wq2takAxp"
                  alt="Estúdio Criativo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-white text-xs">
                  <span className="font-bold">Estúdio Criativo Genesis</span>
                  <span className="text-[10px] font-bold bg-blue-600/90 backdrop-blur-xs px-2 py-0.5 rounded-full">
                    Capacidade 85%
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xl font-extrabold text-blue-700 block leading-none">
                      3.2
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1 block">Dias úteis médios (SLA)</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xl font-extrabold text-emerald-600 block leading-none">
                      98.4%
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1 block">Aprovação em 1ª versão</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 text-xs">
                  <div className="flex -space-x-2 shrink-0">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] ring-2 ring-white">
                      TC
                    </div>
                    <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-[10px] ring-2 ring-white">
                      LS
                    </div>
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] ring-2 ring-white">
                      +4
                    </div>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    6 criativos disponíveis hoje para atendimento da fila corporativa.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3: Acordos de Nível de Serviço (SLA Reference) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="font-bold text-sm text-slate-900">Prazos de Referência (SLA)</h2>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 mb-2">
                Prazos padrão contados a partir da validação técnica do briefing:
              </p>

              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-medium text-slate-700">Card único para Redes</span>
                  <span className="font-bold text-blue-700">2 a 3 dias</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-medium text-slate-700">Carrossel / Peças Múltiplas</span>
                  <span className="font-bold text-blue-700">4 a 5 dias</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-medium text-slate-700">Edição de Vídeo / Reels</span>
                  <span className="font-bold text-blue-700">5 a 8 dias</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-medium text-slate-700">Apresentações Executivas</span>
                  <span className="font-bold text-blue-700">5 a 7 dias</span>
                </div>
              </div>

              <div className="mt-2 pt-3 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => toast('Em desenvolvimento: Política de SLA: Marketing Hub Genesis - Resolução Normativa #04/2025.', { icon: '🚧' })}
                  className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <span>Ver política completa de atendimento do Marketing</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
