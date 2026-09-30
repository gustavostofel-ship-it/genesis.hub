'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  duration?: string;
  coverImage: string;
}

export default function VideoPlayerModal({
  isOpen,
  onClose,
  title,
  subtitle,
  duration = '04:22',
  coverImage,
}: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-700/60 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 px-6 bg-slate-950/60 flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white">{title}</h3>
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Area */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center group">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover opacity-80"
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 bg-slate-950/30" />

          {/* Central Play/Pause button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative z-10 w-20 h-20 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="w-9 h-9 fill-current" />
            ) : (
              <Play className="w-9 h-9 fill-current ml-1" />
            )}
          </button>

          {/* Bottom Video Controls overlay */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col gap-2 z-10">
            {/* Progress track */}
            <div
              className="w-full h-1.5 bg-slate-700/80 rounded-full overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                setProgress(Math.round((clickX / rect.width) * 100));
              }}
            >
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono text-[11px]">
                  01:05 / {duration}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-blue-400">
                  4K ULTRA HD
                </span>
                <button className="hover:text-white">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
