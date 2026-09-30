'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import CallModal from '@/components/modals/CallModal';
import ProfileDrawer from '@/components/modals/ProfileDrawer';
import TicketDetailsDrawer from '@/components/modals/TicketDetailsDrawer';
import BrandManualModal from '@/components/modals/BrandManualModal';
import VideoPlayerModal from '@/components/modals/VideoPlayerModal';
import ChatBotModal from '@/components/modals/ChatBotModal';
import { useAppState } from '@/hooks/use-app-state';
import { INITIAL_EMPLOYEES } from '@/lib/data';
import { CheckCircle2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const {
    mobileMenuOpen, setMobileMenuOpen,
    searchQuery, setSearchQuery,
    callingEmployee, setCallingEmployee,
    selectedEmployee, setSelectedEmployee,
    selectedRequest, setSelectedRequest,
    brandManualOpen, setBrandManualOpen,
    chatBotOpen, setChatBotOpen,
    videoModal, setVideoModal,
    toastMessage, showToast
  } = useAppState();

  const router = useRouter();
  const pathname = usePathname();
  const currentTab = pathname.split('/')[1] || 'inicio';

  const handleStartCall = (emp: any) => {
    setCallingEmployee(emp);
  };

  const marianaEmployee = INITIAL_EMPLOYEES[0];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={() => showToast('')}
            className="ml-2 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      <Sidebar
        currentTab={currentTab as any}
        onSelectTab={(tab) => {
          router.push(`/${tab}`);
          setMobileMenuOpen(false);
        }}
        openCount={12}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onOpenHelp={() => setChatBotOpen(true)}
      />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenQuickApp={(appName) => showToast(`Abrindo ${appName}...`)}
          onViewMyProfile={() => setSelectedEmployee(marianaEmployee)}
        />

        <main className="flex-1 w-full pt-16">
          {children}
        </main>
      </div>

      <CallModal
        employee={callingEmployee}
        isOpen={!!callingEmployee}
        onClose={() => setCallingEmployee(null)}
      />

      <ProfileDrawer
        employee={selectedEmployee}
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        onStartCall={(emp) => {
          setSelectedEmployee(null);
          handleStartCall(emp);
        }}
      />

      <TicketDetailsDrawer
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />

      <BrandManualModal
        isOpen={brandManualOpen}
        onClose={() => setBrandManualOpen(false)}
      />

      {videoModal && (
        <VideoPlayerModal
          isOpen={!!videoModal}
          onClose={() => setVideoModal(null)}
          title={videoModal.title}
          coverImage={videoModal.cover}
          duration={videoModal.duration}
        />
      )}

      <ChatBotModal
        isOpen={chatBotOpen}
        onClose={() => setChatBotOpen(false)}
        onOpenMarketingForm={() => {
          setChatBotOpen(false);
          router.push('/nova-solicitacao-marketing');
        }}
      />
    </div>
  );
}
