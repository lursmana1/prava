"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

// Module-level singleton — only one audio plays across the whole app.
let currentAudio: HTMLAudioElement | null = null;
let currentId: string | null = null;
const listeners = new Set<() => void>();

function stopGlobal() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  currentId = null;
  listeners.forEach((fn) => fn());
}

function playGlobal(id: string, audio: HTMLAudioElement) {
  stopGlobal();
  currentAudio = audio;
  currentId = id;
  listeners.forEach((fn) => fn());
}

// ── Component ──

type AiTutorReadButtonProps = {
  id: string;
  text: string;
  lang?: string;
};

const MAX_CHUNK = 200;

function chunkText(text: string, max: number): string[] {
  const chunks: string[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= max) {
      chunks.push(remaining);
      break;
    }
    let cut = remaining.lastIndexOf(".", max);
    if (cut <= 0) cut = remaining.lastIndexOf(" ", max);
    if (cut <= 0) cut = max;
    chunks.push(remaining.slice(0, cut + 1).trim());
    remaining = remaining.slice(cut + 1).trim();
  }
  return chunks.filter(Boolean);
}

export function AiTutorReadButton({ id, text, lang = "ka" }: AiTutorReadButtonProps) {
  const t = useTranslations("Tickets");
  const [playing, setPlaying] = useState(false);
  const stoppedRef = useRef(false);
  const chunksRef = useRef<string[]>([]);

  useEffect(() => {
    const sync = () => setPlaying(currentId === id);
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, [id]);

  const playChunk = useCallback(
    (idx: number) => {
      if (stoppedRef.current) return;
      const chunk = chunksRef.current[idx];
      if (!chunk) {
        stopGlobal();
        return;
      }

      const src = `/api/tts?lang=${encodeURIComponent(lang)}&q=${encodeURIComponent(chunk)}`;
      const audio = new Audio(src);
      audio.onended = () => playChunk(idx + 1);
      audio.onerror = () => stopGlobal();
      playGlobal(id, audio);
      audio.play().catch(() => stopGlobal());
    },
    [id, lang],
  );

  const handlePlay = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;
    stoppedRef.current = false;
    chunksRef.current = chunkText(trimmed, MAX_CHUNK);
    playChunk(0);
  }, [text, playChunk]);

  const handleStop = useCallback(() => {
    stoppedRef.current = true;
    stopGlobal();
  }, []);

  return (
    <button
      type="button"
      onClick={playing ? handleStop : handlePlay}
      title={playing ? t("aiTutorStop") : t("aiTutorListen")}
      aria-label={playing ? t("aiTutorStop") : t("aiTutorListen")}
      aria-pressed={playing}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      {playing ? <StopIcon className="h-5 w-5" /> : <SpeakerIcon className="h-5 w-5" />}
    </button>
  );
}

function SpeakerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function StopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="1" />
    </svg>
  );
}
