'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Search,
  Bell,
  MessageSquare,
  LayoutGrid,
  Menu,
  Check,
  ExternalLink,
  User,
  Shield,
  LogOut,
  CheckCircle2,
} from 'lucide-react';
import { useNotifications } from '@/hooks/use-notifications';

export const USER_AVATAR_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1WNA9nH2zY9EotrNixsrRtNBhwi_E0dlvwDGcws0lFFXOAQFQZKLtjtz9XXWZhaA-rVX6fZJHZ0VxnO_B5TkkiZLiIELSMYMIGJ54TQvvaFwsPe_qK4zBmn7JMYYIj4f08AC-H_gdPgFd7omdHlMU9dxdf1DakS-gBzCCyzbVjig8HmyDGwmoWe2V5pMycdWFUWN_tR326ylET4GD-g4cOE276CduGrLzsMkiuBW02AFka7arfrqlzKIvs';

interface HeaderProps {
  onToggleMobileMenu: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenQuickApp?: (appName: string) => void;
  onViewMyProfile?: () => void;
}

export default function Header({
  onToggleMobileMenu,
  searchQuery,
  onSearchChange,
  onOpenQuickApp,
  onViewMyProfile,
}: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);

  const { notifications, unreadCount, markAsRead } = useNotifications();

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut for Command+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white/90 backdrop-blur-md z-40 px-4 lg:px-8 flex items-center justify-between border-b border-slate-200/80 shadow-xs">
      {/* Mobile Hamburger + Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          aria-label="Abrir navegação"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex items-center w-full">
          <Search className="absolute left-3.5 text-slate-400 w-[18px] h-[18px] pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar no Genesis Hub (colaboradores, documentos, chamados...)"
            className="w-full h-10 pl-10 pr-12 rounded-xl bg-[#eff4ff] text-[#0b1c30] placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all border border-transparent focus:border-blue-600"
          />
          <kbd className="hidden sm:inline-block absolute right-3 px-1.5 py-0.5 rounded text-[11px] bg-slate-200/80 text-slate-600 font-mono">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4 ml-2 sm:ml-6">
        {/* Quick Icon Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setAppsOpen(false);
                setProfileOpen(false);
                setMessagesOpen(false);
              }}
              aria-label="Notificações"
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1d4ed8] text-white text-[10px] font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100 mb-2">
                  <span className="font-semibold text-sm text-slate-800">Notificações Recentes</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => {
                        notifications.forEach(n => {
                          if (!n.is_read) markAsRead(n.id);
                        });
                      }}
                      className="text-xs text-blue-600 hover:underline cursor-pointer"
                    >
                      Marcar todas como lidas
                    </button>
                  )}
                </div>
                <div className="space-y-1.5 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-500">
                      Nenhuma notificação encontrada.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl transition-colors flex items-start gap-3 relative ${
                          n.is_read ? 'hover:bg-slate-50' : 'bg-blue-50/60 hover:bg-blue-50'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                            n.is_read ? 'bg-transparent' : 'bg-blue-600'
                          }`}
                        />
                        <div className="flex flex-col text-xs w-full pr-6">
                          <span className="font-semibold text-slate-900">{n.title}</span>
                          <span className="text-slate-600 mt-0.5">{n.message}</span>
                          <span className="text-slate-400 text-[10px] mt-1">
                            {new Date(n.created_at).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        {!n.is_read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(n.id);
                            }}
                            className="absolute right-2 top-2 p-1 text-blue-500 hover:text-blue-700 bg-white rounded-full shadow-xs border border-blue-100"
                            title="Marcar como lida"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="relative">
            <button
              onClick={() => {
                setMessagesOpen(!messagesOpen);
                setNotificationsOpen(false);
                setAppsOpen(false);
                setProfileOpen(false);
              }}
              aria-label="Mensagens e Feed"
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            {messagesOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white shadow-xl border border-slate-200 p-3 z-50">
                <span className="px-2 font-semibold text-xs text-slate-500 uppercase tracking-wider block mb-2">
                  Mensagens Diretas
                </span>
                <div className="space-y-1">
                  <div className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      FC
                    </div>
                    <div className="flex flex-col text-xs truncate">
                      <span className="font-semibold text-slate-900">Felipe Costa</span>
                      <span className="text-slate-500 truncate">Os tokens da API foram atualizados...</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      BR
                    </div>
                    <div className="flex flex-col text-xs truncate">
                      <span className="font-semibold text-slate-900">Beatriz Ramos</span>
                      <span className="text-slate-500 truncate">Marcamos o alinhamento de clima?</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Apps Launcher (9 dots) */}
          <div className="relative">
            <button
              onClick={() => {
                setAppsOpen(!appsOpen);
                setNotificationsOpen(false);
                setProfileOpen(false);
                setMessagesOpen(false);
              }}
              aria-label="Atalhos rápidos"
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>

            {appsOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white shadow-xl border border-slate-200 p-3 z-50">
                <span className="px-2 font-semibold text-xs text-slate-500 uppercase tracking-wider block mb-2">
                  Ecossistema Corporativo
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <button
                    onClick={() => {
                      setAppsOpen(false);
                      if (onOpenQuickApp) onOpenQuickApp('Google Workspace');
                    }}
                    className="p-2 rounded-xl hover:bg-slate-100 flex flex-col items-center gap-1 text-slate-700"
                  >
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm">
                      G
                    </div>
                    <span className="text-[11px]">Workspace</span>
                  </button>
                  <button
                    onClick={() => {
                      setAppsOpen(false);
                      if (onOpenQuickApp) onOpenQuickApp('Genesis BI');
                    }}
                    className="p-2 rounded-xl hover:bg-slate-100 flex flex-col items-center gap-1 text-slate-700"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                      BI
                    </div>
                    <span className="text-[11px]">Metas & BI</span>
                  </button>
                  <button
                    onClick={() => {
                      setAppsOpen(false);
                      if (onOpenQuickApp) onOpenQuickApp('Portal RH');
                    }}
                    className="p-2 rounded-xl hover:bg-slate-100 flex flex-col items-center gap-1 text-slate-700"
                  >
                    <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
                      RH
                    </div>
                    <span className="text-[11px]">Portal RH</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-7 w-[1px] bg-slate-200"></div>

        {/* User Profile Mini Bar */}
        <div className="relative">
          <div
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
              setAppsOpen(false);
              setMessagesOpen(false);
            }}
            className="flex items-center gap-2.5 cursor-pointer p-1 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full overflow-hidden relative ring-2 ring-slate-100">
                <Image
                  src={USER_AVATAR_URL}
                  alt="Mariana Alencar"
                  fill
                  sizes="32px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>

            <div className="hidden md:flex flex-col text-left">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-semibold text-xs sm:text-sm text-slate-800">
                  Mariana Alencar
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-blue-50 text-blue-700 font-bold">
                  Online
                </span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Coord. Branding
              </span>
            </div>
          </div>

          {/* Profile Menu Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-slate-200 p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <span className="font-bold text-sm text-slate-900 block">Mariana Alencar</span>
                <span className="text-xs text-slate-500 block">m.alencar@genesis.io</span>
                <span className="text-[11px] text-blue-600 font-medium block mt-1">ID: #GH-8841 • CC-204</span>
              </div>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  if (onViewMyProfile) onViewMyProfile();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg text-left"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Visualizar meu perfil corporativo</span>
              </button>
              <button
                onClick={() => setProfileOpen(false)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg text-left"
              >
                <Shield className="w-4 h-4 text-slate-400" />
                <span>Permissões & Centro de Custo</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
