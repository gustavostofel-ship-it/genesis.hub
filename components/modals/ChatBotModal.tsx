'use client';

import React, { useState } from 'react';
import { X, Send, Bot, User, Sparkles, Phone, HelpCircle } from 'lucide-react';

interface ChatBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMarketingForm?: () => void;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export default function ChatBotModal({ isOpen, onClose, onOpenMarketingForm }: ChatBotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Olá, Mariana! Sou o Bot Genesis, seu assistente da intranet. Como posso ajudar você hoje com chamados, ramais ou demandas?',
      time: 'Agora',
    },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    const newMessages: Message[] = [
      ...messages,
      { sender: 'user', text: userMsg, time: 'Agora' },
    ];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      let reply = 'Entendido! Estou registrando sua solicitação nos nossos sistemas integrados.';
      const lower = userMsg.toLowerCase();
      if (lower.includes('marketing') || lower.includes('campanha') || lower.includes('arte')) {
        reply =
          'Para abrir uma nova demanda de marketing (como carrosséis, apresentações ou vídeos), você pode usar o fluxo do Marketing Hub Genesis com SLA garantido de 3 a 5 dias!';
      } else if (lower.includes('ramal') || lower.includes('telefone') || lower.includes('plantão')) {
        reply =
          'O ramal de plantão de emergência é o #9000. Para ligar para qualquer colega, consulte a aba Pessoas & Times.';
      } else if (lower.includes('sla') || lower.includes('prazo')) {
        reply =
          'O tempo médio de 1ª resposta corporativa é de 42 minutos e o índice de cumprimento de SLA é de 98%.';
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: reply, time: 'Agora' },
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[560px]">
        {/* Header */}
        <div className="p-4 px-6 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 text-white flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base leading-none">Bot Genesis</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-400 text-emerald-950">
                  Online
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-1">Assistente Virtual da Intranet Corporativa</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60 text-xs sm:text-sm">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 shadow-xs border border-slate-200 rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick action prompts */}
        <div className="px-4 py-2 border-t border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => {
              if (onOpenMarketingForm) {
                onClose();
                onOpenMarketingForm();
              }
            }}
            className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 whitespace-nowrap font-medium"
          >
            + Abrir Demanda de Marketing
          </button>
          <button
            onClick={() => setInput('Como consultar prazos de SLA?')}
            className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 whitespace-nowrap font-medium"
          >
            Prazos de SLA
          </button>
          <button
            onClick={() => setInput('Qual o ramal do plantão de TI?')}
            className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 whitespace-nowrap font-medium"
          >
            Ramal de Plantão
          </button>
        </div>

        {/* Input footer */}
        <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua dúvida ou comando..."
            className="flex-1 h-10 px-3.5 rounded-xl bg-slate-100 text-slate-800 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
          />
          <button
            onClick={handleSend}
            className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
