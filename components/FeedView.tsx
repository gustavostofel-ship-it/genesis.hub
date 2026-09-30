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

  const carouselItems: any[] = [];

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
            {/* MOCK DE CONTADOR REMOVIDO PARA FASE 3 */}
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

              {carouselItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* render carousel items here */}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-2 mb-4">
                  <Sparkles className="w-8 h-8 text-slate-300" />
                  <span className="font-semibold text-slate-600">Nenhum destaque no momento.</span>
                  <p className="text-xs text-slate-500 max-w-xs">Apenas usuários com papel Administrativo ou de Marketing podem cadastrar novos Destaques Corporativos.</p>
                </div>
              )}
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
                <div className="py-8 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
                  <Cake className="w-6 h-6 text-slate-300" />
                  <span>Nenhum aniversariante nesta semana.</span>
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

            {/* Widget 2: Novos Colaboradores */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                  <h2 className="font-bold text-sm text-slate-900">Novos Colaboradores</h2>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="py-8 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
                  <UserPlus className="w-6 h-6 text-slate-300" />
                  <span>Nenhum novo colaborador neste mês.</span>
                </div>
              </div>
            </div>

            {/* Widget 3: Eventos & Agenda */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h2 className="font-bold text-sm text-slate-900">Eventos & Agenda</h2>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="py-8 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
                  <Calendar className="w-6 h-6 text-slate-300" />
                  <span>Nenhum evento agendado.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
