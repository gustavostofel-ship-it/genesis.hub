'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  TrendingUp,
  Image as ImageIcon,
  Video,
  Award,
  BarChart2,
  Send,
  MoreHorizontal,
  ThumbsUp,
  Heart,
  MessageSquare,
  Share2,
  Cake,
  UserPlus,
  ArrowRight,
  PlusCircle,
  Megaphone,
  Headphones,
  CreditCard,
  Calendar,
  CheckCircle2,
  Flame,
  FileCheck,
  Shield,
  Video as VideoIcon,
  SlidersHorizontal,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { USER_AVATAR_URL } from './Header';
import { useFeed } from '@/hooks/use-feed';
import toast from 'react-hot-toast';


interface FeedViewProps {
  onOpenMarketingForm: () => void;
  onOpenRequests: () => void;
  onOpenPeople: () => void;
  onPlayVideo: (title: string, cover: string, duration?: string) => void;
}

export default function FeedView({
  onOpenMarketingForm,
  onOpenRequests,
  onOpenPeople,
  onPlayVideo,
}: FeedViewProps) {
  const { posts, isLoading, isError, refetch, createPost, isCreating, toggleLike } = useFeed();
  const [composerText, setComposerText] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [composerExpanded, setComposerExpanded] = useState(false);

  const carouselItems = [
    {
      type: 'video',
      title: 'Tour pelo nosso novo escritório em São Paulo (Vila Olímpia)',
      category: 'Vídeo Institucional',
      tag: 'Destaque',
      tagColor: 'bg-blue-600 text-white',
      meta: '1.4k visualizações',
      duration: '3:14',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCELrWsoSKaDq4c6jgqPK0QedEuP2vkXhrl7O0O8swFBzRPgMpmwYGg-xr5Lv3qmgYTAcGs74KzISPxsNRiki0rABgqIXJdoO3sEIH5ljTiSEOCAPMXDdO-m6Ok6bHGbIz95uErvYKVoCvcSm_l8fBxwgmDiiFxneD5L8jB5Assk2oIqgCHdryToWNEaLEfRyh3o4MO5VnWVmAHGgU9jUw6sY6eFBnvmNRgji_BDnhJhb3-d-WJrq50',
      actionText: 'Assistir →',
      onAction: () =>
        onPlayVideo(
          'Tour pelo nosso novo escritório em São Paulo (Vila Olímpia)',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCELrWsoSKaDq4c6jgqPK0QedEuP2vkXhrl7O0O8swFBzRPgMpmwYGg-xr5Lv3qmgYTAcGs74KzISPxsNRiki0rABgqIXJdoO3sEIH5ljTiSEOCAPMXDdO-m6Ok6bHGbIz95uErvYKVoCvcSm_l8fBxwgmDiiFxneD5L8jB5Assk2oIqgCHdryToWNEaLEfRyh3o4MO5VnWVmAHGgU9jUw6sY6eFBnvmNRgji_BDnhJhb3-d-WJrq50',
          '03:14'
        ),
    },
    {
      type: 'news',
      title: 'Parceria global fechada com gigante de infraestrutura de Nuvem',
      category: 'Aliança Estratégica',
      tag: 'Inovação',
      tagColor: 'bg-blue-100 text-blue-900',
      meta: 'Comunicado Oficial',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBUr1xUi3_S9p5P89WyPv1L8xzGudFq7YXsqSSOmMfcr0zwVGJLA6NcIBe8WPPUVGyudW0Se6y-w2eRdmsKcyF0CD-gyU3RQRipi0CeFsZFyfLjDNS6YC8VLPyUIPHwGGq-VCO8bDEaIuJLM7LsA_e5gGxGUafR-tQCQDytigJwuTYNO8FQQqXVM7A90aFLKTG6uPKgEhZ5KGwVWUQ8JnEh8Kbq0vx8gEQwiT_7qtwIos6lZZVrAdy2',
      actionText: 'Ler nota →',
      onAction: () =>
        alert(
          'Parceria confirmada com a AWS para acelerar soluções nativas de inteligência artificial e computação em nuvem na Genesis Hub.'
        ),
    },
    {
      type: 'stat',
      title: 'Resultados e metas Q3 superadas: veja mensagem do CEO',
      category: 'Relatório Executivo',
      statNumber: '+128%',
      statLabel: 'Superação de OKRs Globais Q3',
      meta: 'Diretoria Executiva',
      actionText: 'Acessar →',
      onAction: () =>
        alert(
          'Parabéns a toda a equipe Genesis! Atingimos 128% do resultado planejado com destaque para as áreas de Operações e Tecnologia.'
        ),
    },
  ];

  const handlePublish = () => {
    if (!composerText.trim() || isCreating) return;
    createPost(
      { content: composerText },
      {
        onSuccess: () => {
          setComposerText('');
          setComposerExpanded(false);
        },
      }
    );
  };

  const handleToggleLike = (postId: string) => {
    toggleLike(postId);
  };

  const handleToggleCongrats = (postId: string) => {
    toast('Em desenvolvimento: Enviar parabéns.', { icon: '🚧' });
  };

  const handleSendWish = (postId: string) => {
    toast('Em desenvolvimento: Enviar felicitação de aniversário.', { icon: '🚧' });
  };

  const handleSendWelcome = (postId: string) => {
    toast('Em desenvolvimento: Enviar mensagem de boas-vindas.', { icon: '🚧' });
  };

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1440px] mx-auto w-full">
        {/* Top Welcome Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Rede Genesis Integrada • São Paulo Headquarter</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Painel & Feed da Comunidade
            </h1>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              248 colaboradores ativos agora
            </span>
            <button
              onClick={() => toast('Em desenvolvimento: Filtros e personalização do feed corporativo.', { icon: '🚧' })}
              className="h-9 px-3.5 rounded-xl bg-white text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Personalizar feed</span>
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout: 8 cols feed + 4 cols right sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* MAIN FEED COLUMN (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Top Carousel Track: Destaques Corporativos */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Destaques Corporativos
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      setCarouselIndex((prev) => (prev > 0 ? prev - 1 : carouselItems.length - 1))
                    }
                    className="p-1 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 shadow-xs transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setCarouselIndex((prev) => (prev < carouselItems.length - 1 ? prev + 1 : 0))
                    }
                    className="p-1 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 shadow-xs transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3 Featured Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1: Video Tour SP */}
                <div className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col">
                  <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={carouselItems[0].image!}
                      alt="Tour Escritório"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                      Destaque
                    </span>
                    <button
                      onClick={carouselItems[0].onAction}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/95 text-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </button>
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] bg-black/80 text-white font-mono">
                      3:14
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Vídeo Institucional
                      </span>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 mt-1 leading-snug">
                        Tour pelo nosso novo escritório em São Paulo (Vila Olímpia)
                      </h3>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-xs text-slate-400">
                      <span>1.4k views</span>
                      <button
                        onClick={carouselItems[0].onAction}
                        className="text-blue-600 font-semibold text-xs hover:underline flex items-center gap-0.5"
                      >
                        Assistir →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 2: Tech Partnership */}
                <div className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col">
                  <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={carouselItems[1].image!}
                      alt="Parceria Nuvem"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900">
                      Inovação
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Aliança Estratégica
                      </span>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 mt-1 leading-snug">
                        Parceria global fechada com gigante de infraestrutura de Nuvem
                      </h3>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-xs text-slate-400">
                      <span>Comunicado Oficial</span>
                      <button
                        onClick={carouselItems[1].onAction}
                        className="text-blue-600 font-semibold text-xs hover:underline flex items-center gap-0.5"
                      >
                        Ler nota →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 3: Q3 Targets OKRs */}
                <div className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col">
                  <div className="relative h-36 w-full overflow-hidden bg-gradient-to-br from-blue-700 to-indigo-900 p-4 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 backdrop-blur-xs text-white">
                        Metas Corporativas
                      </span>
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-3xl font-extrabold leading-none">+128%</span>
                      <p className="text-[11px] text-blue-100 font-medium mt-1">
                        Superação de OKRs Globais Q3
                      </p>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Relatório Executivo
                      </span>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 mt-1 leading-snug">
                        Resultados e metas Q3 superadas: veja mensagem do CEO
                      </h3>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-xs text-slate-400">
                      <span>Diretoria Executiva</span>
                      <button
                        onClick={carouselItems[2].onAction}
                        className="text-blue-600 font-semibold text-xs hover:underline flex items-center gap-0.5"
                      >
                        Acessar →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* POST COMPOSER */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative ring-2 ring-slate-100">
                    <Image
                      src={USER_AVATAR_URL}
                      alt="Mariana Alencar"
                      fill
                      sizes="40px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                </div>

                <div className="flex-1 flex flex-col">
                  <textarea
                    rows={composerExpanded ? 3 : 2}
                    value={composerText}
                    onFocus={() => setComposerExpanded(true)}
                    onChange={(e) => setComposerText(e.target.value)}
                    placeholder="Compartilhe uma conquista, reconhecimento ou ideia com o time Genesis..."
                    className="w-full p-3 rounded-xl bg-slate-50 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none border border-transparent focus:border-blue-600"
                  />

                  <div className="flex flex-wrap items-center justify-between pt-3 gap-2">
                    <div className="flex items-center flex-wrap gap-1.5">
                      <button
                        onClick={() => toast('Em desenvolvimento: Selecione uma imagem para anexar à publicação.', { icon: '🚧' })}
                        type="button"
                        className="px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <ImageIcon className="w-4 h-4 text-blue-600" />
                        <span>Foto</span>
                      </button>
                      <button
                        onClick={() => toast('Em desenvolvimento: Anexar link de vídeo corporativo.', { icon: '🚧' })}
                        type="button"
                        className="px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Video className="w-4 h-4 text-indigo-600" />
                        <span>Vídeo institucional</span>
                      </button>
                      <button
                        onClick={() => toast('Em desenvolvimento: Anexar certificado profissional verificado.', { icon: '🚧' })}
                        type="button"
                        className="px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Award className="w-4 h-4 text-amber-600" />
                        <span>Certificado</span>
                      </button>
                      <button
                        onClick={() => toast('Em desenvolvimento: Criar nova enquete interna com opções de voto.', { icon: '🚧' })}
                        type="button"
                        className="px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <BarChart2 className="w-4 h-4 text-emerald-600" />
                        <span>Enquete</span>
                      </button>
                    </div>

                    <button
                      onClick={handlePublish}
                      disabled={!composerText.trim() || isCreating}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5"
                    >
                      {isCreating ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <span>Publicar</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* FEED STREAM */}
            <div className="flex flex-col gap-6">
              {isLoading && (
                <div className="flex flex-col gap-4 animate-pulse">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs h-40 flex flex-col justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-slate-200" />
                        <div className="flex flex-col gap-1">
                          <div className="w-32 h-3 bg-slate-200 rounded-full" />
                          <div className="w-24 h-2 bg-slate-100 rounded-full" />
                        </div>
                      </div>
                      <div className="w-full h-4 bg-slate-100 rounded mt-4" />
                      <div className="w-2/3 h-4 bg-slate-100 rounded mt-2" />
                    </div>
                  ))}
                </div>
              )}

              {isError && (
                <div className="bg-red-50 text-red-600 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 border border-red-100">
                  <span className="font-bold text-sm">Falha ao carregar o feed</span>
                  <p className="text-xs text-red-500">Ocorreu um erro de conexão. Tente novamente.</p>
                  <button onClick={() => refetch()} className="px-4 py-2 bg-white text-red-600 rounded-xl font-bold shadow-sm text-xs border border-red-200 hover:bg-red-50 flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5" /> Tentar Novamente
                  </button>
                </div>
              )}

              {!isLoading && !isError && posts.length === 0 && (
                <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs flex flex-col items-center text-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-2">
                    <MessageSquare className="w-6 h-6 text-slate-300" />
                  </div>
                  <h3 className="font-bold text-slate-900">Nenhuma publicação</h3>
                  <p className="text-xs text-slate-500">Seja o primeiro a compartilhar algo com a equipe Genesis!</p>
                </div>
              )}

              {!isLoading && !isError && posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {post.author.avatar ? (
                        <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-slate-100">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            sizes="44px"
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
                          <Megaphone className="w-5 h-5" />
                        </div>
                      )}

                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">
                            {post.author.name}
                          </span>
                          {post.author.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                              {post.author.badge}
                            </span>
                          )}
                          {post.author.role && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                              {post.author.role}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400">
                          {post.timeAgo} • {post.subtitle}
                        </span>
                      </div>
                    </div>

                    <button className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-50 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-xs sm:text-sm text-slate-700 mb-4 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>

                  {/* Video Player Box */}
                  {post.videoUrl && (
                    <div
                      onClick={() =>
                        onPlayVideo(post.videoTitle || 'Vídeo Institucional', post.videoUrl!, post.videoDuration)
                      }
                      className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 mb-4 shadow-xs group cursor-pointer"
                    >
                      <Image
                        src={post.videoUrl}
                        alt="Vídeo Convenção"
                        fill
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover group-hover:scale-102 transition-transform duration-700 opacity-90"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/30 transition-colors" />

                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/95 text-blue-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 fill-current ml-1" />
                        </div>
                        <span className="mt-3 text-xs font-semibold text-white px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs">
                          Assistir Vídeo ({post.videoDuration || '04:22'})
                        </span>
                      </div>

                      <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-xs text-slate-200">
                        <span>{post.videoTitle}</span>
                        <span className="px-1.5 py-0.5 rounded bg-black/70 text-[10px] font-bold text-blue-400">
                          4K ULTRA HD
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Certificate Card */}
                  {post.certificate && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50/50 border border-slate-200/80 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/60">
                          <Award className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-slate-900">
                              {post.certificate.title}
                            </span>
                            <span className="px-1.5 py-0.2 rounded font-mono text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              VERIFICADO
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Emissor: {post.certificate.issuer} • ID:{' '}
                            <span className="font-mono font-semibold text-slate-700">
                              {post.certificate.credentialId}
                            </span>
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          toast(`Em desenvolvimento: Credencial ${post.certificate?.credentialId} verificada com sucesso via AWS Certification Portal.`, { icon: '🚧' })
                        }
                        className="px-3.5 py-2 rounded-xl bg-white text-blue-700 font-semibold text-xs border border-slate-200 shadow-xs hover:bg-blue-50 transition-all flex items-center gap-1.5 shrink-0"
                      >
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span>Validar no Portal</span>
                      </button>
                    </div>
                  )}

                  {/* Birthday Card */}
                  {post.birthday && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-pink-50/80 to-purple-50/80 border border-pink-100 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-xs sm:text-sm text-slate-700 italic">
                        {post.birthday.quote}
                      </p>
                      <button
                        onClick={() => handleSendWish(post.id)}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
                      >
                        <Cake className="w-4 h-4" />
                        <span>Deixar parabéns ({post.birthday.wishesCount})</span>
                      </button>
                    </div>
                  )}

                  {/* Welcome Card */}
                  {post.welcome && (
                    <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 mb-4 shadow-xs">
                      <Image
                        src={post.welcome.image}
                        alt={post.welcome.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-semibold">
                        {post.welcome.name} • {post.welcome.desk}
                      </div>
                    </div>
                  )}

                  {/* Reactions Bar */}
                  <div className="flex items-center justify-between py-2 border-t border-slate-100 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                          👍
                        </span>
                        <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">
                          ❤️
                        </span>
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
                          🎉
                        </span>
                      </div>
                      <span>{post.likesCount} interações</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span>{post.commentsCount} comentários</span>
                      <span>•</span>
                      <span>{post.sharesCount} compartilhamentos</span>
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="pt-2 flex items-center justify-around bg-slate-50/70 rounded-xl py-1.5 text-xs text-slate-600">
                    <button
                      onClick={() => handleToggleLike(post.id)}
                      className={`flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-100 transition-colors ${
                        post.liked ? 'text-blue-600 font-bold' : ''
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                      <span>Curtir</span>
                    </button>

                    <button
                      onClick={() => {
                        if (post.certificate) {
                          handleToggleCongrats(post.id);
                        } else if (post.birthday) {
                          handleSendWish(post.id);
                        } else if (post.welcome) {
                          handleSendWelcome(post.id);
                        } else {
                          handleToggleLike(post.id);
                        }
                      }}
                      className="flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Parabenizar</span>
                    </button>

                    <button
                      onClick={() => toast(`Em desenvolvimento: Comentários para a postagem de ${post.author.name}`, { icon: '🚧' })}
                      className="flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Comentar</span>
                    </button>

                    <button
                      onClick={() => toast('Em desenvolvimento: Link da publicação copiado para a área de transferência.', { icon: '🚧' })}
                      className="flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Encaminhar</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* RIGHT WIDGETS COLUMN (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Widget 1: Aniversariantes */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Cake className="w-5 h-5 text-blue-600" />
                  <h2 className="font-bold text-sm text-slate-900">Aniversariantes</h2>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  Esta Semana
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {/* Person 1 */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBByDpPNqH89jGELjV-u3V2-C-144o-Go8afFLG0IebbyG4WS5P6KA5xm_kqnise81eHAYNW1c6CXUp-NgoGmkFtGWk8DiEXp5O2Hq3Z4ge-FI-dGOauofN04wA7sDGneFyLqwXZFrGL2tRnSysee7fBDPwsMe7PuQfKJcMQzJzsQx6qMCPuPQc-P6smh6aL9S2wLyJJdJdPFcNdobWSFWf_1KDfZ-honSkgKdDGNptTzzgP6Uy948q"
                        alt="Lucas Silveira"
                        fill
                        sizes="36px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col text-xs">
                      <span className="font-semibold text-slate-900">Lucas Silveira</span>
                      <span className="text-slate-500">Engenharia de Dados</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-100 text-pink-700">
                    Hoje!
                  </span>
                </div>

                {/* Person 2 */}
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVS40c1pADpunoeRaGrK84LkiQWe2_zybrHYvkHipaghhB1a7MeuvmFrC1Y8gV3lUCnWpQVG4R9D7EJzsQNkO_AgCcP1MfZQ1q3tRcDwAN6c_wk8K6qcN3YbGEWs8a39dtaS_LkBVzFlz1xA8kMFwINV1-B5prXVXiVtXtZ3ludzcB4Iga8KUSvir7eL3Q-6zWQLun5q3yBNAR3fIt1esQv2MiskQekkIsPkPIUclRKczwmoY4GBZK"
                        alt="Fernanda Castro"
                        fill
                        sizes="36px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col text-xs">
                      <span className="font-semibold text-slate-900">Fernanda Castro</span>
                      <span className="text-slate-500">Controladoria & Finanças</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Amanhã</span>
                </div>

                {/* Person 3 */}
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi5dreQzgF76HiFvPecOO7XriG5p6Rb22fyPXOkPxpKOVuJER60Y7S8bEXy8sbPb2oJKZ95ABwaqUaFsa1ocS9oMftGD8D0oGWPVNHIvltz4LN2U37YtlfTzLlzKAlujE4YQvQVCIoSNjVC_l15bf8KW1GZX1UVzYnVBGPE25Q1QSBomj-t49rbtOSauNW5PcZkp4en3gmXd5476bTHaDFV-F0w-3iagSAxXVfv8EhrJyyQsisJZd0"
                        alt="Bruno Mendonça"
                        fill
                        sizes="36px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col text-xs">
                      <span className="font-semibold text-slate-900">Bruno Mendonça</span>
                      <span className="text-slate-500">Customer Success</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Quinta-feira</span>
                </div>
              </div>

              <button
                onClick={() => toast('Em desenvolvimento: 7 colaboradores fazem aniversário neste mês no Genesis Hub!', { icon: '🚧' })}
                className="w-full mt-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-blue-600 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
              >
                <span>Ver todos aniversariantes (7)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Widget 2: Novos Colaboradores */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                  <h2 className="font-bold text-sm text-slate-900">Novos Colaboradores</h2>
                </div>
                <span className="text-xs text-slate-400 font-medium">Setembro</span>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdD1MEUltw728drWKEEJc3D2J7Xk7eCBQp46Mj4YqbOafnDRkU33zfsxueUuG02jg8cX3wvNaz5TGO1qeuCXOH3o-tmL54B3zfzoBO1vh3Q14Ay3N2C1G9JLRa_inud52LBGrS0lJpROV_PxuKZLTDEHKlY1SKJCaVTvDZKp07Og0mUTuOOVKHMVWEvSp9GAv_5zgvx_Wd3wCKqgJVjAyVGni2oGAxHZAmYKqTXRk9Iguqsn76QuWQ"
                        alt="Rafael Santos"
                        fill
                        sizes="36px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col text-xs">
                      <span className="font-semibold text-slate-900">Rafael Santos</span>
                      <span className="text-slate-500">Marketing Hub • Ramal 4102</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-bold">
                    Início Ontem
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCvOE7KA6AnSmb6i9OIASvrYs_CMHtXEMoAlDDFLFzHrOHW9OZP4H_5ZCjhpeu95LAd3CkBKYqC4XI96EIHZAlCg9eFseQtiPB4SzH4dWdfocR_M6hwBoKHHUTGdkvcpdXGmYdlL-Mj-KP2gpe9rmHetaBGgTgoL6yRvZpoCBK-RLW6Pr0EojRWNX_xdo-EexULrq5bhR-vK63yacZZP1a_xwL8ocnc8bIjUOYFue3EXfCQYDr-qyE"
                        alt="Beatriz Lima"
                        fill
                        sizes="36px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col text-xs">
                      <span className="font-semibold text-slate-900">Beatriz Lima</span>
                      <span className="text-slate-500">Segurança Info • Ramal 3088</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-medium">
                    02/09
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1GjS8erPA21TxJ_z6FkYQKLfTu7E5HnrMoKZCuRRqAa2TxZrJlbNfOS2fZfpKicJxLVZThPlD4vMEb41QYYIr3iohwA1wQV-kjcTV0M9RdCXcFqYHq-p67jil5dc4XGNEvpaOTy48BMEerSrjYnW5K7NbdIOfC5XqNwhjtS8pj6IwFl7QeeaJvtIzM2tbKuA_yOqU1gjOyHwc88b2DVBOVMQGq3k3H2GvFO8WFB58nAckFcBFoxGr"
                        alt="André Meireles"
                        fill
                        sizes="36px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col text-xs">
                      <span className="font-semibold text-slate-900">André Meireles</span>
                      <span className="text-slate-500">Infraestrutura • Ramal 5541</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-medium">
                    01/09
                  </span>
                </div>
              </div>
            </div>

            {/* Widget 3: Atalhos Rápidos */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
              <h2 className="font-bold text-sm text-slate-900 pb-3 mb-2 border-b border-slate-100">
                Atalhos Rápidos
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={onOpenRequests}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-left transition-colors flex flex-col gap-2 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <PlusCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block leading-tight">
                      Nova Solicitação
                    </span>
                    <span className="text-[11px] text-slate-500">Chamados & OS</span>
                  </div>
                </button>

                <button
                  onClick={onOpenMarketingForm}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-left transition-colors flex flex-col gap-2 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block leading-tight">
                      Marketing Hub
                    </span>
                    <span className="text-[11px] text-slate-500">Peças & Marcas</span>
                  </div>
                </button>

                <button
                  onClick={onOpenRequests}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-left transition-colors flex flex-col gap-2 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block leading-tight">
                      Suporte T.I.
                    </span>
                    <span className="text-[11px] text-slate-500">Atendimento ágil</span>
                  </div>
                </button>

                <button
                  onClick={() => toast('Em desenvolvimento: Abrindo portal corporativo de holerites e férias.', { icon: '🚧' })}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-left transition-colors flex flex-col gap-2 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block leading-tight">
                      Holerites & RH
                    </span>
                    <span className="text-[11px] text-slate-500">Benefícios & Ponto</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Widget 4: Eventos & Agenda */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h2 className="font-bold text-sm text-slate-900">Eventos & Agenda</h2>
                </div>
                <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">
                  Ver mês
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="p-3 rounded-xl bg-slate-50 flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex flex-col items-center justify-center shrink-0 leading-tight">
                    <span className="font-bold text-sm">13</span>
                    <span className="text-[9px] uppercase font-bold">Sex</span>
                  </div>
                  <div className="flex-1 flex flex-col text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">All Hands Genesis Q3/Q4</span>
                      <span className="px-1.5 py-0.2 rounded font-bold text-[10px] bg-blue-100 text-blue-800">
                        16:00
                      </span>
                    </div>
                    <span className="text-slate-500 text-[11px] mt-0.5">Auditório Principal + Teams</span>
                    <span className="text-[10px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
                      <VideoIcon className="w-3 h-3" /> Link ao vivo disponível
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-200 text-slate-700 flex flex-col items-center justify-center shrink-0 leading-tight">
                    <span className="font-bold text-sm">17</span>
                    <span className="text-[9px] uppercase font-bold">Ter</span>
                  </div>
                  <div className="flex-1 flex flex-col text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Workshop Design System</span>
                      <span className="px-1.5 py-0.2 rounded font-bold text-[10px] bg-slate-100 text-slate-700">
                        10:00
                      </span>
                    </div>
                    <span className="text-slate-500 text-[11px] mt-0.5">Sala de Inovação 02</span>
                    <span className="text-[10px] text-blue-600 font-semibold mt-1">28 inscritos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
