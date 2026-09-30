'use client';

import React from 'react';
import PeopleView from '@/components/PeopleView';
import { useAppState } from '@/hooks/use-app-state';

export default function PessoasPage() {
  const { searchQuery, setSearchQuery, setSelectedEmployee, setCallingEmployee } = useAppState();

  return (
    <PeopleView
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onSelectEmployee={(emp) => setSelectedEmployee(emp)}
      onCallEmployee={(emp) => setCallingEmployee(emp)}
    />
  );
}
