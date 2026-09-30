'use client';

import React, { useState } from 'react';
import { Settings, Users, Box, Plus, Loader2, CheckCircle2 } from 'lucide-react';
import { usePeople } from '@/hooks/use-people';
import { useSettings } from '@/hooks/use-settings';
import { Employee } from '@/lib/data';

type Tab = 'perfil' | 'pessoas' | 'modulos' | 'departamentos' | 'tipos' | 'destaques';

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
        <button
          onClick={() => setActiveTab('departamentos')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'departamentos' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Setores
        </button>
        <button
          onClick={() => setActiveTab('tipos')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'tipos' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Tipos de Solicitações
        </button>
        <button
          onClick={() => setActiveTab('destaques')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'destaques' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Destaques
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6">
        {activeTab === 'perfil' && <ProfileSettings />}
        {activeTab === 'pessoas' && <PeopleManagement />}
        {activeTab === 'modulos' && <ModulesManagement />}
        {activeTab === 'departamentos' && <DepartmentsManagement />}
        {activeTab === 'tipos' && <RequestTypesManagement />}
        {activeTab === 'destaques' && <FeaturedItemsManagement />}
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
              {people.map((p: Employee) => (
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

function DepartmentsManagement() {
  const { departments, isLoadingDepartments, saveDepartment, isSavingDepartment } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveDepartment(formData);
    setIsOpen(false);
    setFormData({ name: '', description: '' });
  };

  if (isOpen) {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Novo Setor</h2>
          <button onClick={() => setIsOpen(false)} className="text-xs text-slate-500 hover:text-slate-800">Cancelar</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Nome do Setor</label>
            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Descrição</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none" rows={3}></textarea>
          </div>
          <button disabled={isSavingDepartment} type="submit" className="w-full mt-4 flex items-center justify-center gap-2 h-11 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-colors shadow-md">
            {isSavingDepartment ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            Salvar Setor
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Departamentos</h2>
          <p className="text-xs text-slate-500">Gerencie os setores da empresa.</p>
        </div>
        <button onClick={() => setIsOpen(true)} className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors">
          <Plus className="w-4 h-4" /> Novo Setor
        </button>
      </div>

      {isLoadingDepartments ? (
        <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((d: any) => (
            <div key={d.id} className="p-4 border border-slate-200 bg-slate-50 rounded-2xl">
              <span className="font-bold text-slate-900">{d.name}</span>
              <p className="text-xs text-slate-600 mt-1">{d.description || 'Sem descrição'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RequestTypesManagement() {
  const { requestTypes, isLoadingRequestTypes, saveRequestType, isSavingRequestType } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: 'Recursos Humanos', icon: 'file-text', sla_hours: 24 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveRequestType(formData);
    setIsOpen(false);
    setFormData({ name: '', category: 'Recursos Humanos', icon: 'file-text', sla_hours: 24 });
  };

  if (isOpen) {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Novo Tipo de Solicitação</h2>
          <button onClick={() => setIsOpen(false)} className="text-xs text-slate-500 hover:text-slate-800">Cancelar</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Nome da Solicitação</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Categoria</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none">
                <option value="Recursos Humanos">Recursos Humanos</option>
                <option value="Suporte T.I.">Suporte T.I.</option>
                <option value="Marketing">Marketing</option>
                <option value="Financeiro">Financeiro</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">SLA (horas úteis)</label>
              <input required type="number" min={1} value={formData.sla_hours} onChange={e => setFormData({...formData, sla_hours: Number(e.target.value)})} className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            </div>
          </div>
          <button disabled={isSavingRequestType} type="submit" className="w-full mt-4 flex items-center justify-center gap-2 h-11 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-colors shadow-md">
            {isSavingRequestType ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            Salvar Tipo
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Tipos de Solicitações</h2>
          <p className="text-xs text-slate-500">Configure os catálogos de serviços da intranet.</p>
        </div>
        <button onClick={() => setIsOpen(true)} className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors">
          <Plus className="w-4 h-4" /> Novo Tipo
        </button>
      </div>

      {isLoadingRequestTypes ? (
        <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requestTypes.map((t: any) => (
            <div key={t.id} className="p-4 border border-slate-200 bg-white rounded-2xl flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900">{t.name}</span>
                <p className="text-[11px] text-slate-500 mt-0.5 uppercase tracking-wider font-bold">{t.category}</p>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">SLA: {t.sla_hours}h</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FeaturedItemsManagement() {
  const { featuredItems, isLoadingFeaturedItems, saveFeaturedItem, isSavingFeaturedItem } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', type: 'destaque', link: '', sort_order: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveFeaturedItem(formData);
    setIsOpen(false);
    setFormData({ title: '', type: 'destaque', link: '', sort_order: 0 });
  };

  if (isOpen) {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Novo Destaque</h2>
          <button onClick={() => setIsOpen(false)} className="text-xs text-slate-500 hover:text-slate-800">Cancelar</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Título do Destaque</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Link URL (opcional)</label>
              <input value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none" placeholder="https://" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Ordem de Exibição</label>
              <input required type="number" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: Number(e.target.value)})} className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            </div>
          </div>
          <button disabled={isSavingFeaturedItem} type="submit" className="w-full mt-4 flex items-center justify-center gap-2 h-11 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-colors shadow-md">
            {isSavingFeaturedItem ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            Salvar Destaque
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Destaques Corporativos</h2>
          <p className="text-xs text-slate-500">Notícias e banners em destaque na tela inicial.</p>
        </div>
        <button onClick={() => setIsOpen(true)} className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors">
          <Plus className="w-4 h-4" /> Novo Destaque
        </button>
      </div>

      {isLoadingFeaturedItems ? (
        <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredItems.map((f: any) => (
            <div key={f.id} className="p-4 border border-slate-200 bg-white rounded-2xl">
              <span className="font-bold text-slate-900">{f.title}</span>
              <p className="text-xs text-blue-600 mt-1 truncate">{f.link || 'Sem link'}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">Ordem: {f.sort_order}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
