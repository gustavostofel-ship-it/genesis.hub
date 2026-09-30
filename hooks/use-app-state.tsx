'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Employee, RequestItem } from '@/lib/data';

interface AppState {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  callingEmployee: Employee | null;
  setCallingEmployee: (emp: Employee | null) => void;
  selectedEmployee: Employee | null;
  setSelectedEmployee: (emp: Employee | null) => void;
  selectedRequest: RequestItem | null;
  setSelectedRequest: (req: RequestItem | null) => void;
  brandManualOpen: boolean;
  setBrandManualOpen: (open: boolean) => void;
  chatBotOpen: boolean;
  setChatBotOpen: (open: boolean) => void;
  videoModal: { title: string; cover: string; duration?: string } | null;
  setVideoModal: (video: { title: string; cover: string; duration?: string } | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [callingEmployee, setCallingEmployee] = useState<Employee | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);
  const [brandManualOpen, setBrandManualOpen] = useState(false);
  const [chatBotOpen, setChatBotOpen] = useState(false);
  const [videoModal, setVideoModal] = useState<{ title: string; cover: string; duration?: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        mobileMenuOpen, setMobileMenuOpen,
        searchQuery, setSearchQuery,
        callingEmployee, setCallingEmployee,
        selectedEmployee, setSelectedEmployee,
        selectedRequest, setSelectedRequest,
        brandManualOpen, setBrandManualOpen,
        chatBotOpen, setChatBotOpen,
        videoModal, setVideoModal,
        toastMessage, showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
}
