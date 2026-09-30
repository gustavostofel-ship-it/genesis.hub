'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Users,
  Search,
  Phone,
  Mail,
  MapPin,
  Heart,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  PhoneCall,
  MessageSquare,
  BadgeCheck,
  Building,
  UserCheck,
  Check,
  SortAsc,
  RefreshCw,
} from 'lucide-react';
import { Employee } from '@/lib/data';
import { usePeople } from '@/hooks/use-people';
import toast from 'react-hot-toast';


interface PeopleViewProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectEmployee: (employee: Employee) => void;
  onCallEmployee: (employee: Employee) => void;
}

export default function PeopleView({
  searchQuery,
  onSearchChange,
  onSelectEmployee,
  onCallEmployee,
}: PeopleViewProps) {
  const { people: employees, isLoading, isError, refetch } = usePeople();
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name_asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [onlyWithRamal, setOnlyWithRamal] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const toggleFavorite = (empId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Simulate optimistic update for favorites in memory for Phase 1
    toast('Em desenvolvimento: Ação registrada na camada de serviço.', { icon: '🚧' });
  };

  const filteredEmployees = useMemo(() => {
    return employees
      .filter((emp) => {
        // Department filter
        if (selectedDept !== 'all' && emp.department !== selectedDept) return false;

        // Location filter
        if (selectedLocation) {
          if (selectedLocation === 'sp' && !emp.location.includes('São Paulo')) return false;
          if (selectedLocation === 'bh' && !emp.location.includes('Belo Horizonte')) return false;
          if (selectedLocation === 'cwb' && !emp.location.includes('Curitiba')) return false;
          if (selectedLocation === 'remote' && emp.locationType !== 'remoto') return false;
        }

        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = emp.name.toLowerCase().includes(q);
          const matchRole = emp.role.toLowerCase().includes(q);
          const matchDept = emp.departmentLabel.toLowerCase().includes(q);
          const matchRamal = emp.ramal.toLowerCase().includes(q);
          const matchSkills = emp.skills.some((s) => s.toLowerCase().includes(q));
          if (!matchName && !matchRole && !matchDept && !matchRamal && !matchSkills) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
        if (sortBy === 'status') {
          const order = { online: 0, reuniao: 1, ausente: 2 };
          return order[a.status] - order[b.status];
        }
        if (sortBy === 'ramal') return a.ramal.localeCompare(b.ramal);
        return 0;
      });
  }, [employees, selectedDept, selectedLocation, searchQuery, sortBy]);

  const departments = [
    { id: 'all', label: 'Todos', count: 342 },
    { id: 'marketing', label: 'Marketing', count: 14 },
    { id: 'engenharia', label: 'Engenharia', count: 32 },
    { id: 'rh', label: 'Recursos Humanos', count: 18 },
    { id: 'produto', label: 'Produto & Design', count: 12 },
    { id: 'financeiro', label: 'Financeiro', count: 9 },
  ];

  return (
    <div className="w-full">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Top Header and Stat Summary */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Pessoas & Times
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                79 online agora
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Conecte-se com os 342 colaboradores cadastrados no ecossistema Genesis Hub.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-4 px-4 py-2 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Polos Físicos
                </span>
                <span className="text-sm font-bold text-blue-700">04 Polos</span>
              </div>
              <div className="w-px h-7 bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Remoto
                </span>
                <span className="text-sm font-bold text-slate-700">38%</span>
              </div>
            </div>

            <button
              onClick={() => toast('Em desenvolvimento: Visualização de Organograma e Hierarquias Corporativas.', { icon: '🚧' })}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs sm:text-sm hover:bg-blue-700 transition-colors shadow-xs"
            >
              <Users className="w-4 h-4" />
              <span>Organograma</span>
            </button>
          </div>
        </div>

        {/* Search and Filter Box */}
        <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          {/* Search Input */}
          <div className="relative flex items-center w-full">
            <Search className="absolute left-4 text-slate-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por nome, setor, ramal, habilidade ou cargo (ex: Figma, React, Marketing)..."
              className="w-full h-12 pl-12 pr-28 rounded-xl bg-slate-50 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all border border-transparent focus:border-blue-600"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 px-2 py-1 rounded text-xs bg-slate-200 text-slate-600 hover:bg-slate-300 font-mono"
              >
                ESC limpar
              </button>
            )}
          </div>

          {/* Department Pills & Layout View Toggle */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pt-1">
            {/* Department buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {departments.map((dept) => {
                const isActive = selectedDept === dept.id;
                return (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDept(dept.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <span>{dept.label}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        isActive ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {dept.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Filter Dropdowns and Grid/List Mode */}
            <div className="flex items-center flex-wrap gap-2.5">
              {/* Location Select */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              >
                <option value="">Polos: Todos</option>
                <option value="sp">São Paulo (Sede)</option>
                <option value="bh">Belo Horizonte</option>
                <option value="cwb">Curitiba</option>
                <option value="remote">Remoto Nacional</option>
              </select>

              {/* Sort Select */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              >
                <option value="name_asc">Ordem: Nome (A-Z)</option>
                <option value="status">Status (Online primeiro)</option>
                <option value="ramal">Número do Ramal</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                  aria-label="Visualização em Grade"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                  aria-label="Visualização em Lista"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Counter Info Bar */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-slate-500">
            Mostrando{' '}
            <strong className="text-slate-900 font-bold">{filteredEmployees.length}</strong> de{' '}
            <strong className="text-slate-900 font-bold">342</strong> colaboradores
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Filtros rápidos:</span>
            <button
              onClick={() => setOnlyWithRamal(!onlyWithRamal)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                onlyWithRamal
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Com Ramal Ativo
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Grid: 3-column cards */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200/80 h-48 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-200 mb-4" />
                <div className="w-32 h-4 bg-slate-200 rounded-full mb-2" />
                <div className="w-24 h-3 bg-slate-100 rounded-full" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="bg-red-50 text-red-600 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-3 border border-red-100 my-8">
            <span className="font-bold text-sm">Falha ao carregar o diretório</span>
            <p className="text-xs text-red-500">Ocorreu um erro ao buscar os colaboradores. Tente novamente.</p>
            <button onClick={() => refetch()} className="px-4 py-2 mt-2 bg-white text-red-600 rounded-xl font-bold shadow-sm text-xs border border-red-200 hover:bg-red-50 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> Tentar Novamente
            </button>
          </div>
        )}

        {!isLoading && !isError && filteredEmployees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Nenhum colaborador encontrado</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Não encontramos resultados para seus filtros atuais. Tente mudar o termo de busca ou limpar os filtros de departamento e status.
            </p>
          </div>
        ) : !isLoading && !isError && viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((emp) => {
              const isOnline = emp.status === 'online';
              const isMeeting = emp.status === 'reuniao';

              return (
                <div
                  key={emp.id}
                  className="group flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col">
                    {/* Top Row: Status badge + Department + Favorite */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {isOnline && (
                          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px]">
                            <span className="h-2 w-2 rounded-full bg-blue-600" />
                            Online
                          </span>
                        )}
                        {isMeeting && (
                          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold text-[11px]">
                            <span className="h-2 w-2 rounded-full bg-purple-600" />
                            Em reunião
                          </span>
                        )}
                        {emp.status === 'ausente' && (
                          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[11px]">
                            <span className="h-2 w-2 rounded-full bg-slate-400" />
                            Ausente
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          {emp.departmentLabel}
                        </span>
                      </div>

                      <button
                        onClick={(e) => toggleFavorite(emp.id, e)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          emp.isFavorite
                            ? 'text-red-500 bg-red-50'
                            : 'text-slate-300 hover:text-red-400 hover:bg-slate-50'
                        }`}
                        title="Favoritar colaborador"
                      >
                        <Heart className={`w-4 h-4 ${emp.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Profile Row */}
                    <div className="flex items-start gap-3.5 mb-4">
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-slate-100 shadow-xs relative">
                          <Image
                            src={emp.avatar}
                            alt={emp.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span
                          className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-white ${
                            isOnline
                              ? 'bg-blue-600'
                              : isMeeting
                              ? 'bg-purple-600'
                              : 'bg-slate-400'
                          }`}
                        />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <h2 className="font-bold text-sm sm:text-base text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                          {emp.name}
                        </h2>
                        <span className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {emp.role}
                        </span>
                        <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{emp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Ramal & Contact Quick Stat Box */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-xs">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">
                            Ramal Interno
                          </span>
                          <span className="font-mono font-bold text-slate-900 text-xs">
                            {emp.ramal}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-indigo-600" />
                        <div className="flex flex-col text-right">
                          <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">
                            E-mail Institucional
                          </span>
                          <span className="font-medium text-slate-700 truncate max-w-[120px] text-[11px]">
                            {emp.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-col gap-1.5 mb-5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Competências Chave
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {emp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => onSelectEmployee(emp)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Ver perfil</span>
                    </button>

                    <button
                      onClick={() => onCallEmployee(emp)}
                      className="inline-flex items-center justify-center gap-1.5 h-10 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
                      title={`Ligar para Ramal ${emp.ramal}`}
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span className="hidden sm:inline">Ligar</span>
                    </button>

                    <button
                      onClick={() => toast(`Em desenvolvimento: Iniciando chat corporativo com ${emp.name}`, { icon: '🚧' })}
                      className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                      title="Mensagem interna"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List Mode */
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={emp.avatar}
                        alt={emp.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{emp.name}</span>
                        <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          {emp.departmentLabel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{emp.role}</p>
                      <span className="text-[11px] text-slate-400">{emp.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex flex-col text-right">
                      <span className="font-mono font-bold text-slate-900">{emp.ramal}</span>
                      <span className="text-slate-500">{emp.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectEmployee(emp)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs"
                      >
                        Perfil
                      </button>
                      <button
                        onClick={() => onCallEmployee(emp)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold text-xs flex items-center gap-1"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Ligar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500">
            Carregando <strong className="text-slate-800">1-{filteredEmployees.length}</strong> de{' '}
            <strong className="text-slate-800">342</strong> colaboradores
          </span>

          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-semibold flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold">1</button>
            <button className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">
              2
            </button>
            <button className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">
              29
            </button>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1"
            >
              <span>Próxima</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
