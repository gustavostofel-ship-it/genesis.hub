'use client';

import React from 'react';
import Image from 'next/image';
import {
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  Award,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { Employee } from '@/lib/data';

interface ProfileDrawerProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onStartCall: (employee: Employee) => void;
}

export default function ProfileDrawer({
  employee,
  isOpen,
  onClose,
  onStartCall,
}: ProfileDrawerProps) {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-300">
        <div>
          {/* Header Banner */}
          <div className="relative h-32 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Header Info */}
          <div className="px-6 relative -mt-14 pb-6 border-b border-slate-100">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg mb-3">
              <Image
                src={employee.avatar}
                alt={employee.name}
                fill
                sizes="96px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-slate-900">{employee.name}</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                {employee.departmentLabel}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-600">{employee.role}</p>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{employee.location}</span>
            </div>

            {/* CTA row */}
            <div className="flex items-center gap-2.5 mt-5">
              <button
                onClick={() => onStartCall(employee)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Chamar no Ramal {employee.ramal}</span>
              </button>
            </div>
          </div>

          {/* Detailed attributes */}
          <div className="p-6 space-y-6">
            {/* Quick Contacts Box */}
            <div className="rounded-xl bg-slate-50 p-4 space-y-3 border border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Canais de Contato Corporativo
              </span>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" /> Ramal Interno:
                </span>
                <span className="font-mono font-bold text-slate-900">{employee.ramal}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-600" /> E-mail:
                </span>
                <span className="font-medium text-blue-600 hover:underline">{employee.email}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-600" /> Centro de Custo:
                </span>
                <span className="font-mono text-slate-700 font-semibold">CC-204 (Marketing)</span>
              </div>
            </div>

            {/* Skills */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                Competências & Especialidades
              </span>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Current Work / Availability */}
            <div className="rounded-xl bg-blue-50/50 border border-blue-100 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 mb-1">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Horário de Atendimento</span>
              </div>
              <p className="text-xs text-blue-800/80 leading-relaxed">
                Segunda a Sexta, das 09h às 18h (Horário de Brasília).
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Diretório Genesis Atualizado
          </span>
          <button onClick={onClose} className="font-semibold text-slate-700 hover:underline">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
