'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PhoneOff, Mic, MicOff, Volume2, ShieldCheck } from 'lucide-react';
import { Employee } from '@/lib/data';

interface CallModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

function ActiveCallDialog({
  employee,
  onClose,
}: {
  employee: Employee;
  onClose: () => void;
}) {
  const [seconds, setSeconds] = useState(0);
  const [isCalling, setIsCalling] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const ringTimer = setTimeout(() => {
      setIsCalling(false);
    }, 2200);

    return () => clearTimeout(ringTimer);
  }, []);

  useEffect(() => {
    if (isCalling) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCalling]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl bg-[#1b293a] text-white p-6 shadow-2xl border border-slate-700/60 flex flex-col items-center text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Genesis VoIP Ramal Criptografado</span>
        </div>

        {/* Avatar with pulse ring */}
        <div className="relative mb-4">
          {isCalling && (
            <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
          )}
          <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-500/50 shadow-xl">
            <Image
              src={employee.avatar}
              alt={employee.name}
              fill
              sizes="96px"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight">{employee.name}</h3>
        <p className="text-sm text-slate-300 mt-0.5">{employee.role}</p>
        <span className="text-xs font-mono font-bold text-blue-400 mt-2 px-2.5 py-0.5 bg-blue-950/80 rounded-md border border-blue-800/40">
          Ramal: {employee.ramal}
        </span>

        {/* Call Timer or Ringing indicator */}
        <div className="mt-4 mb-8">
          {isCalling ? (
            <span className="text-sm text-blue-300 animate-pulse font-medium">
              Chamando ramal corporativo...
            </span>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-2xl font-mono font-bold tracking-wider text-emerald-400">
                {formatTime(seconds)}
              </span>
              <span className="text-xs text-slate-400 mt-1">Ligação em andamento (HD Voice)</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3.5 rounded-full transition-colors ${
              isMuted
                ? 'bg-amber-500 text-white'
                : 'bg-slate-700/70 text-slate-200 hover:bg-slate-600'
            }`}
            title={isMuted ? 'Desmutar microfone' : 'Mutar microfone'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            title="Encerrar ligação"
          >
            <PhoneOff className="w-6 h-6" />
          </button>

          <button
            className="p-3.5 rounded-full bg-slate-700/70 text-slate-200 hover:bg-slate-600 transition-colors"
            title="Viva-voz"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CallModal({ employee, isOpen, onClose }: CallModalProps) {
  if (!isOpen || !employee) return null;
  return <ActiveCallDialog employee={employee} onClose={onClose} />;
}
