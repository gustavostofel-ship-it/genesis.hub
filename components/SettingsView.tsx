'use client';

import React, { useState } from 'react';
import { Settings, Users, Box, Plus, Loader2, CheckCircle2 } from 'lucide-react';
import { usePeople } from '@/hooks/use-people';

type Tab = 'perfil' | 'pessoas' | 'modulos';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState<Tab>('pessoas');

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Configurações & Painel Admin</h1>
          <p className="text-xs text-slate-500">
            Gerencie seu perfil, adicione novos colaboradores e ative módulos do Hub.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('perfil')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'perfil' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Meu Perfil
        </button>
        <button
          onClick={() => setActiveTab('pessoas')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'pessoas' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Gestão de Pessoas (RH)
        </button>
        <button
          onClick={() => setActiveTab('modulos')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'modulos' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Box className="w-4 h-4" />
          Módulos
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6">
        {activeTab === 'perfil' && <ProfileSettings />}
        {activeTab === 'pessoas' && <PeopleManagement />}
        {activeTab === 'modulos' && <ModulesManagement />}
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Preferências Pessoais</h2>
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
        <div>
          <span className="font-bold text-slate-900 block text-sm">Ramal Virtual WebRTC</span>
          <span className="text-xs text-slate-500">Receber chamadas de ramal diretamente pelo navegador</span>
        </div>
        <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-emerald-100 text-emerald-800">
          Ativo (#4402)
        </span>
      </div>
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
        <div>
          <span className="font-bold text-slate-900 block text-sm">Notificações por E-mail</span>
          <span className="text-xs text-slate-500">Alertas de aprovação de demandas e aniversários</span>
        </div>
        <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-blue-100 text-blue-800">
          m.alencar@genesis.io
        </span>
      </div>
    </div>
  );
}

function PeopleManagement() {
  const { people, isLoading, createPerson, isCreating } = usePeople();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: 'marketing',
    email: '',
    location: '',
    ramal: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPerson(formData);
    setIsFormOpen(false);
    setFormData({ name: '', role: '', department: 'marketing', email: '', location: '', ramal: '' });
  };

  if (isFormOpen) {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Cadastrar Novo Colaborador</h2>
          <button onClick={() => setIsFormOpen(false)} className="text-xs text-slate-500 hover:text-slate-800">
            Cancelar
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Nome Completo</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">E-mail Corporativo</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Cargo</label>
              <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Departamento</label>
              <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none">
                <option value="marketing">Marketing</option>
                <option value="engenharia">Engenharia</option>
                <option value="rh">Recursos Humanos</option>
                <option value="financeiro">Financeiro</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Localização / Polo</label>
              <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Ex: Sede SP, Remoto..." className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Ramal</label>
              <input required value={formData.ramal} onChange={e => setFormData({...formData, ramal: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            </div>
          </div>
          <button disabled={isCreating} type="submit" className="w-full mt-4 flex items-center justify-center gap-2 h-11 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-colors shadow-md">
            {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            Cadastrar Colaborador
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Diretório de Pessoas</h2>
          <p className="text-xs text-slate-500">Adicione ou suspenda contas da Intranet.</p>
        </div>
        <button onClick={() => setIsFormOpen(true)} className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors">
          <Plus className="w-4 h-4" /> Novo Colaborador
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
      ) : (
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Nome</th>
                <th className="px-4 py-3 font-semibold">Cargo / Setor</th>
                <th className="px-4 py-3 font-semibold">E-mail</th>
                <th className="px-4 py-3 font-semibold text-right">Ramal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {people.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">{p.name}</td>
                  <td className="px-4 py-3">
                    <span className="block">{p.role}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{p.departmentLabel}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.email}</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-slate-700">{p.ramal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ModulesManagement() {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900 mb-4">Módulos do Sistema</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 border border-blue-200 bg-blue-50/50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-900">Formulários de Marketing</span>
            <span className="px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-md uppercase tracking-wider">Ativo</span>
          </div>
          <p className="text-xs text-slate-600">Recebimento de demandas com campos obrigatórios e SLA dinâmico.</p>
        </div>
        <div className="p-5 border border-slate-200 rounded-2xl opacity-60">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-900">Ouvidoria (Anônima)</span>
            <span className="px-2 py-1 bg-slate-200 text-slate-500 text-[10px] font-bold rounded-md uppercase tracking-wider">Inativo</span>
          </div>
          <p className="text-xs text-slate-600">Canal de denúncias ouvidoria. Requer aprovação do jurídico para ativar.</p>
        </div>
      </div>
    </div>
  );
}
