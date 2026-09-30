'use client';

import React from 'react';
import Image from 'next/image';
import {
  Home,
  Users,
  ClipboardList,
  FileText,
  Megaphone,
  Settings,
  HelpCircle,
  X,
} from 'lucide-react';

export type NavTab = 'inicio' | 'pessoas' | 'solicitacoes' | 'documentos' | 'marketing-hub' | 'nova-solicitacao-marketing' | 'configuracoes';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  openCount?: number;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenHelp?: () => void;
}

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1VcnN5JNdIXY-jtmDNYj-F09oQlENcYwUYvkp5GU7p9VMAMbDPdVr4IZ3qUG27_l9JIw0vJwzjuigbyJAsJcP9hIc3ilo4pRaZZ9pX_mSMINuwUPsyjcy8WdUWFUTheBvTqyH6XZrLKk4_qA8eJfLG3TIfTvdxGnx_pXTzLFVbemAK_ykOT3V-oSm-7wZl5nQ7scFRAaAPzsO92GCwFj__r4Fs6gaPICk6VWzeOns_X7ubXck3QQx-jhQ';

export default function Sidebar({
  currentTab,
  onSelectTab,
  openCount = 12,
  mobileOpen = false,
  onCloseMobile,
  onOpenHelp,
}: SidebarProps) {
  const navItems = [
    { id: 'inicio' as NavTab, label: 'Início', icon: Home },
    { id: 'pessoas' as NavTab, label: 'Pessoas', icon: Users },
    {
      id: 'solicitacoes' as NavTab,
      label: 'Solicitações',
      icon: ClipboardList,
      badge: openCount,
    },
    { id: 'documentos' as NavTab, label: 'Documentos', icon: FileText },
    {
      id: 'nova-solicitacao-marketing' as NavTab,
      label: 'Marketing Hub',
      icon: Megaphone,
    },
    { id: 'configuracoes' as NavTab, label: 'Configurações', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-[#213145] text-slate-100 z-50 flex flex-col justify-between shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between bg-[#1b293a] border-b border-slate-700/40">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => onSelectTab('inicio')}
            >
              <div className="relative h-8 w-8 flex-shrink-0">
                <Image
                  src={LOGO_URL}
                  alt="Genesis Hub"
                  fill
                  sizes="32px"
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[18px] text-white tracking-tight leading-none">
                  Genesis Hub
                </span>
                <span className="text-[10px] text-blue-300 uppercase tracking-wider font-semibold mt-0.5">
                  Intranet
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Section */}
          <div className="px-3 pt-6">
            <span className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Navegação Corporativa
            </span>
            <nav className="mt-3 flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  currentTab === item.id ||
                  (item.id === 'solicitacoes' && currentTab === 'nova-solicitacao-marketing' && false);
                const isMarketingActive =
                  item.id === 'nova-solicitacao-marketing' && currentTab === 'nova-solicitacao-marketing';

                const highlight = isActive || isMarketingActive;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-[14px] font-semibold transition-all ${
                      highlight
                        ? 'bg-[#1d4ed8] text-white shadow-md'
                        : 'text-slate-300 hover:bg-slate-700/40 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 opacity-90" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          highlight
                            ? 'bg-blue-300 text-blue-950'
                            : 'bg-blue-500/20 text-blue-200'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Network Status Card */}
        <div className="p-3 m-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-white">Rede Genesis</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
          </div>
          <p className="text-[12px] text-slate-300 mb-2 leading-relaxed">
            Todos os subsistemas operacionais integrados.
          </p>
          <button
            onClick={onOpenHelp}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-blue-300 hover:text-white transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Suporte & Políticas</span>
          </button>
        </div>
      </aside>
    </>
  );
}
