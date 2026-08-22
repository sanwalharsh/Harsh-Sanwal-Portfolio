"use client";

/* The desk objects. Everything is drawn with SVG/CSS — gradients and layered
   shadows stand in for photography, so the whole desk stays on-palette,
   weighs nothing, and scales to any screen. */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { nowPlaying, profile } from "@/lib/data";
import { sound } from "@/lib/sound";

const VOLUME = 0.85;

const DROP = "drop-shadow(0 18px 18px rgb(23 17 13 / 0.24))";

/* ── the lamp ─────────────────────────────────────────────── */

export function DeskLamp({ scale = 1 }: { scale?: number }) {
  return (
    <svg
      width={236 * scale}
      height={430 * scale}
      viewBox="0 0 236 430"
      fill="none"
      style={{ filter: DROP }}
      aria-hidden
    >
      <defs>
        <radialGradient id="dome" cx="0.34" cy="0.24" r="0.85">
          <stop offset="0" stopColor="#b8604c" />
          <stop offset="0.42" stopColor="#8f3a29" />
          <stop offset="1" stopColor="#5d2118" />
        </radialGradient>
        <linearGradient id="domeShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="stem" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5d2118" />
          <stop offset="0.35" stopColor="#9c4433" />
          <stop offset="1" stopColor="#4d1b13" />
        </linearGradient>
        <radialGradient id="bulb" cx="0.5" cy="0.2" r="0.8">
          <stop offset="0" stopColor="#fbe9c9" />
          <stop offset="1" stopColor="#d7b285" />
        </radialGradient>
      </defs>

      {/* knob */}
      <circle cx="118" cy="16" r="9" fill="#8a8f94" />
      <circle cx="115" cy="13" r="3.4" fill="#dfe4e8" />
      {/* dome */}
      <path d="M8 132C8 71 57 22 118 22s110 49 110 110H8z" fill="url(#dome)" />
      <path d="M8 132C8 71 57 22 118 22s110 49 110 110H8z" fill="url(#domeShine)" />
      <ellipse cx="118" cy="132" rx="110" ry="15" fill="#4a1a12" />
      {/* inner shade + bulb */}
      <ellipse cx="118" cy="132" rx="92" ry="12" fill="#2f100a" />
      <ellipse cx="118" cy="146" rx="42" ry="34" fill="url(#bulb)" opacity="0.95" />
      {/* stem */}
      <rect x="111" y="150" width="14" height="264" rx="3" fill="url(#stem)" />
      <ellipse cx="118" cy="416" rx="26" ry="7" fill="#4d1b13" opacity="0.55" />
    </svg>
  );
}

/* ── paper & stationery ───────────────────────────────────── */

/** Cream fabric-paper strip with a big paperclip biting its edge */
export function ClippedStrip({ scale = 1 }: { scale?: number }) {
  return (
    <div
      style={{
        width: 128 * scale,
        height: 300 * scale,
        filter: "drop-shadow(0 18px 22px rgb(23 17 13 / 0.22))",
      }}
      className="relative"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(122deg,#eee5d5 0%,#ded2bd 46%,#f0e8da 47%,#d8cbb4 100%)",
          clipPath: "polygon(4% 0, 100% 2%, 96% 100%, 0 97%)",
        }}
      />
      {/* woven tooth */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg,rgb(23 17 13 / .05) 0 1px,transparent 1px 4px),repeating-linear-gradient(0deg,rgb(23 17 13 / .05) 0 1px,transparent 1px 4px)",
          clipPath: "polygon(4% 0, 100% 2%, 96% 100%, 0 97%)",
        }}
      />
      <svg
        width={64 * scale}
        height={150 * scale}
        viewBox="0 0 64 150"
        fill="none"
        className="absolute"
        style={{ left: -22 * scale, top: 26 * scale, transform: "rotate(-4deg)" }}
      >
        <defs>
          <linearGradient id="clipG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#7f868c" />
            <stop offset="0.4" stopColor="#e8edf1" />
            <stop offset="0.62" stopColor="#aab1b7" />
            <stop offset="1" stopColor="#767d83" />
          </linearGradient>
        </defs>
        <path
          d="M45 44v66c0 12-9.6 22-22 22S1 122 1 110V38C1 20 15 6 33 6s31 14 31 32v72c0 8-6 14-14 14s-14-6-14-14V46"
          stroke="url(#clipG)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

/** The big grid-paper page the whole composition leans on */
export function GridSheet({
  w = 520,
  h = 640,
  className = "",
}: {
  w?: number;
  h?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: w,
        height: h,
        background: "linear-gradient(160deg,#ffffff 0%,#fdfbf6 55%,#f2ece1 100%)",
        boxShadow:
          "0 2px 2px rgb(23 17 13 / .05), 0 34px 46px -22px rgb(23 17 13 / .34)",
        borderRadius: 3,
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          borderRadius: 3,
          backgroundImage:
            "linear-gradient(rgb(23 17 13 / .07) 1px, transparent 1px),linear-gradient(90deg, rgb(23 17 13 / .07) 1px, transparent 1px)",
          backgroundSize: "19px 19px",
        }}
      />
      {/* page edge + a hint of the sheet underneath */}
      <div className="absolute inset-0 rounded-[3px] ring-1 ring-black/[0.06]" />
      <div
        className="absolute -bottom-2 left-3 right-6 h-3 rounded-b-[3px] bg-[#efe8dc]"
        style={{ transform: "rotate(1.4deg)", zIndex: -1 }}
      />
    </div>
  );
}

/** A slim gel pen, meant to lie on the sheet */
export function Pen({ scale = 1 }: { scale?: number }) {
  return (
    <svg
      width={20 * scale}
      height={210 * scale}
      viewBox="0 0 20 210"
      fill="none"
      style={{ filter: "drop-shadow(0 10px 12px rgb(23 17 13 / 0.3))" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="penBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#cfd4d8" />
          <stop offset="0.35" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#dfe4e8" />
          <stop offset="1" stopColor="#a9b0b6" />
        </linearGradient>
      </defs>
      <rect x="3" y="16" width="14" height="180" rx="7" fill="url(#penBody)" />
      <rect x="3" y="48" width="14" height="8" fill="#2b2f33" opacity=".7" />
      <rect x="6.5" y="0" width="7" height="52" rx="3.5" fill="#3b4046" />
      <path d="M10 196l5 12-5 2-5-2 5-12z" fill="#2b2f33" />
    </svg>
  );
}

/* ── Kodak-ish film canister with a tongue of film ────────── */

export function FilmCanister({ scale = 1 }: { scale?: number }) {
  return (
    <svg
      width={230 * scale}
      height={148 * scale}
      viewBox="0 0 230 148"
      fill="none"
      style={{ filter: DROP }}
      aria-hidden
    >
      <defs>
        <linearGradient id="canBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0c65a" />
          <stop offset="0.34" stopColor="#e0a72c" />
          <stop offset="0.75" stopColor="#c98d1c" />
          <stop offset="1" stopColor="#8c5e10" />
        </linearGradient>
        <linearGradient id="filmG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a2a1e" />
          <stop offset="0.5" stopColor="#6b4c33" />
          <stop offset="1" stopColor="#43301f" />
        </linearGradient>
      </defs>

      {/* film tongue */}
      <path d="M96 34h126v78H96z" fill="url(#filmG)" />
      {[0, 1].map((row) =>
        Array.from({ length: 9 }).map((_, i) => (
          <rect
            key={`${row}-${i}`}
            x={104 + i * 13}
            y={row ? 100 : 38}
            width="7"
            height="7"
            rx="1.5"
            fill="#fffaf5"
            opacity="0.9"
          />
        ))
      )}
      <rect x="104" y="54" width="112" height="38" fill="#8a6a4a" opacity="0.5" />

      {/* canister */}
      <rect x="8" y="18" width="92" height="112" rx="10" fill="url(#canBody)" />
      <rect x="8" y="18" width="92" height="20" rx="9" fill="#2b2b2b" />
      <rect x="8" y="112" width="92" height="18" rx="9" fill="#2b2b2b" />
      <rect x="46" y="4" width="16" height="18" rx="3" fill="#4a4a4a" />
      <rect x="14" y="44" width="80" height="62" rx="4" fill="#171614" opacity=".07" />
      <text
        x="54"
        y="66"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="#3a2a08"
        fontFamily="ui-sans-serif, system-ui"
      >
        PORTRA
      </text>
      <text
        x="54"
        y="92"
        textAnchor="middle"
        fontSize="26"
        fontWeight="800"
        fill="#3a2a08"
        fontFamily="ui-sans-serif, system-ui"
      >
        400
      </text>
      <text
        x="54"
        y="106"
        textAnchor="middle"
        fontSize="8"
        fill="#3a2a08"
        opacity=".7"
        fontFamily="ui-monospace, monospace"
      >
        C-41 · 36 exp
      </text>
    </svg>
  );
}

/* ── a soft blue tube (the coffee-shop kind) ──────────────── */

export function BlueTube({ scale = 1 }: { scale?: number }) {
  return (
    <svg
      width={128 * scale}
      height={330 * scale}
      viewBox="0 0 128 330"
      fill="none"
      style={{ filter: DROP }}
      aria-hidden
    >
      <defs>
        <linearGradient id="tubeG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7fa9c9" />
          <stop offset="0.22" stopColor="#cfe3f1" />
          <stop offset="0.55" stopColor="#a8cbe2" />
          <stop offset="1" stopColor="#6f9ab8" />
        </linearGradient>
        <linearGradient id="capG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8fb4cf" />
          <stop offset="0.3" stopColor="#e8f2f8" />
          <stop offset="1" stopColor="#7ea6c2" />
        </linearGradient>
      </defs>
      <path d="M18 40h92v238a26 26 0 01-26 26H44a26 26 0 01-26-26V40z" fill="url(#tubeG)" />
      <path d="M18 40h92l-10 14H28L18 40z" fill="#5f8aa8" opacity=".35" />
      <rect x="40" y="6" width="48" height="40" rx="8" fill="url(#capG)" />
      <rect x="40" y="6" width="48" height="7" rx="3.5" fill="#fff" opacity=".55" />
      <circle cx="64" cy="150" r="15" fill="#2f6b93" opacity=".85" />
      <path
        d="M64 138c6 8 9 12 9 17a9 9 0 01-18 0c0-5 3-9 9-17z"
        fill="#fffaf5"
        opacity=".9"
      />
      <rect x="34" y="196" width="60" height="4" rx="2" fill="#3d7396" opacity=".35" />
      <rect x="40" y="208" width="48" height="4" rx="2" fill="#3d7396" opacity=".25" />
    </svg>
  );
}

/* ── lighter with a sticker on it ─────────────────────────── */

export function Lighter({ scale = 1 }: { scale?: number }) {
  return (
    <svg
      width={78 * scale}
      height={190 * scale}
      viewBox="0 0 78 190"
      fill="none"
      style={{ filter: DROP }}
      aria-hidden
    >
      <defs>
        <linearGradient id="litG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d9dde0" />
          <stop offset="0.3" stopColor="#ffffff" />
          <stop offset="0.72" stopColor="#e6eaed" />
          <stop offset="1" stopColor="#b6bcc1" />
        </linearGradient>
      </defs>
      <rect x="9" y="30" width="60" height="156" rx="12" fill="url(#litG)" />
      <rect x="18" y="6" width="42" height="30" rx="5" fill="#9aa0a6" />
      <rect x="24" y="12" width="30" height="10" rx="3" fill="#d8dde1" />
      <rect x="30" y="30" width="18" height="12" rx="3" fill="#c0453a" />
      <rect x="17" y="60" width="44" height="86" rx="5" fill="#fffaf5" opacity=".9" />
      <path
        d="M39 76c9 10 14 17 14 24a14 14 0 01-28 0c0-7 5-14 14-24z"
        fill="#c0453a"
        opacity=".85"
      />
      <text
        x="39"
        y="134"
        textAnchor="middle"
        fontSize="9"
        fill="#c0453a"
        fontFamily="ui-monospace, monospace"
      >
        ship it
      </text>
    </svg>
  );
}

/* ── newspaper clipping with a highlighted definition ─────── */

export function NewsClip({ scale = 1 }: { scale?: number }) {
  return (
    <div
      className="relative"
      style={{
        width: 250 * scale,
        filter: "drop-shadow(0 16px 18px rgb(23 17 13 / 0.2))",
      }}
      aria-hidden
    >
      <div
        className="px-4 py-3"
        style={{
          background: "linear-gradient(150deg,#f4ecdc 0%,#e9dfcb 60%,#f1e8d6 100%)",
          clipPath:
            "polygon(0 4%, 9% 0, 27% 5%, 49% 0, 71% 5%, 89% 0, 100% 4%, 97% 95%, 79% 100%, 55% 95%, 31% 100%, 11% 95%, 0 99%)",
        }}
      >
        <p className="font-serif text-[12px] leading-[1.3] text-[#3f362a]">
          …from natural affinity, or from noise; the difference is whether the pattern
        </p>
        <p className="relative mt-1.5 inline-block font-serif text-[26px] font-bold leading-none tracking-tight text-[#241d16]">
          <span
            className="absolute inset-x-[-4px] bottom-[1px] top-[6px] -z-0"
            style={{ background: "rgb(240 198 90 / .78)", transform: "rotate(-1deg)" }}
          />
          <span className="relative">Signal</span>
        </p>
        <span className="ml-1.5 font-mono text-[11px] text-[#3f362a]">/ˈsɪɡnəl/</span>
        <p className="mt-1.5 font-serif text-[11px] leading-[1.35] text-[#3f362a]">
          survives the next quarter, the next sensor, the next
        </p>
        <div className="mt-2 space-y-[4px]">
          {[100, 94, 72].map((w) => (
            <div
              key={w}
              className="h-[3px] bg-[#3f362a]/22"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── coffee ring + a couple of drips ──────────────────────── */

export function CoffeeRing({ size = 190 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 190 190" fill="none" aria-hidden>
      <defs>
        <radialGradient id="ringG" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.62" stopColor="#8c3a2b" stopOpacity="0.05" />
          <stop offset="0.82" stopColor="#8c3a2b" stopOpacity="0.3" />
          <stop offset="0.95" stopColor="#8c3a2b" stopOpacity="0.12" />
          <stop offset="1" stopColor="#8c3a2b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="95" cy="95" r="88" fill="url(#ringG)" />
      <path
        d="M18 92c2-40 36-72 77-72 40 0 74 31 77 71 3 42-33 78-77 78-45 0-80-36-77-77z"
        stroke="#8c3a2b"
        strokeOpacity="0.26"
        strokeWidth="6"
        fill="none"
      />
      <circle cx="171" cy="140" r="7" fill="#8c3a2b" opacity=".16" />
      <circle cx="160" cy="163" r="4" fill="#8c3a2b" opacity=".13" />
      <circle cx="27" cy="36" r="5" fill="#8c3a2b" opacity=".12" />
    </svg>
  );
}

/* ── sticky note ──────────────────────────────────────────── */

export function StickyNote({
  children,
  color = "var(--sun)",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative px-5 py-4 ${className}`}
      style={{
        background: `linear-gradient(160deg, ${color} 0%, color-mix(in srgb, ${color} 82%, #000) 100%)`,
        boxShadow:
          "0 1px 1px rgb(23 17 13 / .07), 0 18px 30px -18px rgb(23 17 13 / .55)",
        clipPath: "polygon(0 0, 100% 0, 100% 86%, 90% 100%, 0 100%)",
      }}
    >
      {children}
    </div>
  );
}

/* ── the desktop widgets ──────────────────────────────────── */

const fmt = (sec: number) => {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

/**
 * Record player — plays the real track when public/audio holds the file, and
 * falls back to a silent spinning record when it doesn't.
 */
export function NowPlaying({ scale = 1 }: { scale?: number }) {
  const [on, setOn] = useState(true);
  const [hasAudio, setHasAudio] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const manualRef = useRef(false);
  const fadeRef = useRef<number | null>(null);
  const fadeTimer = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const progress = useMotionValue(0);
  const knobX = useTransform(progress, (p) => `${p * 100}%`);

  // with a file loaded the disc follows the audio; without one it is decorative
  const playing = hasAudio ? on : on && inView;
  const s = (n: number) => n * scale;

  // the nav's mute button stops the music as well
  useEffect(() => {
    const onToggle = (e: Event) => {
      const on = (e as CustomEvent<{ on: boolean }>).detail?.on;
      if (!on) {
        manualRef.current = false;
        audioRef.current?.pause();
      }
    };
    window.addEventListener("desk-sound", onToggle);
    return () => window.removeEventListener("desk-sound", onToggle);
  }, []);

  /** ramps the volume so hover in/out never clicks or cuts */
  const fade = (to: number, ms: number, done?: () => void) => {
    const el = audioRef.current;
    if (!el) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);

    const from = el.volume;
    const t0 = performance.now();
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      fadeTimer.current = null;
      el.volume = Math.min(1, Math.max(0, to));
      done?.();
    };
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      el.volume = Math.min(1, Math.max(0, from + (to - from) * k));
      if (k < 1) fadeRef.current = requestAnimationFrame(step);
      else finish();
    };
    fadeRef.current = requestAnimationFrame(step);
    // rAF stalls in background tabs — this guarantees the ramp always lands
    fadeTimer.current = window.setTimeout(finish, ms + 80);
  };

  const start = (manual: boolean) => {
    const el = audioRef.current;
    if (!hasAudio || !el || !sound.enabled) return;
    manualRef.current = manual || manualRef.current;
    if (!el.paused) {
      fade(VOLUME, 220);
      return;
    }
    el.volume = 0;
    el
      .play()
      .then(() => {
        setBlocked(false);
        fade(VOLUME, 420);
      })
      // browsers refuse audio until the page has had a real click
      .catch(() => setBlocked(true));
  };

  const stop = (manual: boolean) => {
    const el = audioRef.current;
    if (!el || el.paused) return;
    if (manual) manualRef.current = false;
    fade(0, 300, () => el.pause());
  };

  /** hover starts it; leaving pauses it again, unless you pressed play yourself */
  useEffect(() => {
    const card = ref.current;
    if (!card || !hasAudio) return;
    const enter = (e: PointerEvent) => {
      if (e.pointerType !== "touch") start(false);
    };
    const leave = (e: PointerEvent) => {
      if (e.pointerType !== "touch" && !manualRef.current) stop(false);
    };
    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointerover", enter);
    card.addEventListener("pointerleave", leave);
    return () => {
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointerover", enter);
      card.removeEventListener("pointerleave", leave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAudio]);

  const toggle = () => {
    const el = audioRef.current;
    if (!hasAudio || !el) {
      setOn((p) => !p);
      return;
    }
    if (el.paused) start(true);
    else stop(true);
  };

  const seek = (clientX: number) => {
    const el = audioRef.current;
    const bar = trackRef.current;
    if (!hasAudio || !el || !bar || !el.duration) return;
    const r = bar.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    el.currentTime = p * el.duration;
    progress.set(p);
    setElapsed(el.currentTime);
  };

  const nudge = (delta: number) => {
    const el = audioRef.current;
    if (!hasAudio || !el || !el.duration) return;
    el.currentTime = Math.min(el.duration, Math.max(0, el.currentTime + delta));
  };

  return (
    <div
      ref={ref}
      className="relative rounded-[26px] bg-[#fffdf9] p-5"
      data-grab
      style={{
        width: s(300),
        boxShadow:
          "0 1px 1px rgb(23 17 13 / .05), 0 40px 60px -26px rgb(23 17 13 / .35)",
      }}
    >
      <audio
        ref={audioRef}
        src={nowPlaying.src}
        preload="metadata"
        onLoadedMetadata={(e) => {
          setHasAudio(true);
          setDuration(e.currentTarget.duration);
          e.currentTarget.volume = 0;
          setOn(false);
        }}
        onError={() => setHasAudio(false)}
        onPlay={() => setOn(true)}
        onPause={() => setOn(false)}
        onEnded={() => {
          setOn(false);
          progress.set(0);
          setElapsed(0);
        }}
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          if (el.duration) progress.set(el.currentTime / el.duration);
          setElapsed(Math.floor(el.currentTime));
        }}
      />
      <div className="relative mx-auto" style={{ width: s(236), height: s(236) }}>
        <motion.div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 34% 26%, #4a4a4a 0%, #1c1c1c 26%, #101010 62%, #232323 100%)",
            willChange: "transform",
          }}
          animate={playing ? { rotate: 360 } : {}}
          transition={{ duration: 7, repeat: playing ? Infinity : 0, ease: "linear" }}
        >
          {/* grooves */}
          <div
            className="absolute inset-[8%] rounded-full"
            style={{
              background:
                "repeating-radial-gradient(circle at 50% 50%, rgb(255 255 255 / .05) 0 1px, transparent 1px 4px)",
            }}
          />
          {/* split label */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
            style={{ width: s(94), height: s(94) }}
          >
            <div className="absolute inset-0 bg-[#c73a2c]" />
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[#f5ead6]" />
            <div className="absolute inset-0 rounded-full ring-1 ring-black/20" />
          </div>
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fffdf9]"
            style={{ width: s(11), height: s(11) }}
          />
          {/* sheen */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(122deg, rgb(255 255 255 / .16) 0%, transparent 32%, transparent 62%, rgb(255 255 255 / .09) 82%, transparent 100%)",
            }}
          />
        </motion.div>
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label={
          playing
            ? `Pause ${nowPlaying.title}`
            : hasAudio
              ? `Play ${nowPlaying.title} by ${nowPlaying.artist}`
              : "Spin the record"
        }
        className="mx-auto mt-4 flex h-7 w-9 items-end justify-center gap-[2px] rounded-md transition-opacity hover:opacity-60"
      >
        {[9, 16, 22, 13, 19, 8].map((h, i) => (
          <motion.span
            key={i}
            className="w-[2.5px] rounded-full bg-[var(--ink)]"
            style={{ height: h }}
            animate={playing ? { scaleY: [1, 0.45, 1] } : { scaleY: 1 }}
            transition={{
              duration: 1.1 + i * 0.13,
              repeat: playing ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        ))}
      </button>

      {hasAudio && (
        <p className="mt-1.5 text-center text-[9px] tracking-[0.14em] text-muted">
          {blocked ? "click once to allow sound" : playing ? "playing" : "hover to play"}
        </p>
      )}

      <p className="mt-2 text-center text-[12px] text-muted">{nowPlaying.artist}</p>
      <p className="text-center text-[15px]">{nowPlaying.title}</p>

      <div className="mt-4 flex items-center gap-3">
        <div
          ref={trackRef}
          role={hasAudio ? "slider" : undefined}
          tabIndex={hasAudio ? 0 : undefined}
          aria-label={hasAudio ? "Seek" : undefined}
          aria-valuemin={hasAudio ? 0 : undefined}
          aria-valuemax={hasAudio ? Math.round(duration) : undefined}
          aria-valuenow={hasAudio ? Math.round(elapsed) : undefined}
          aria-valuetext={hasAudio ? `${fmt(elapsed)} of ${fmt(duration)}` : undefined}
          onClick={hasAudio ? (e) => seek(e.clientX) : undefined}
          onKeyDown={
            hasAudio
              ? (e) => {
                  if (e.key === "ArrowRight") nudge(5);
                  else if (e.key === "ArrowLeft") nudge(-5);
                  else if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    toggle();
                  } else return;
                  e.preventDefault();
                }
              : undefined
          }
          className={`relative h-[3px] flex-1 overflow-visible rounded-full bg-[var(--line)] ${
            hasAudio ? "cursor-pointer py-2 before:absolute before:inset-x-0 before:-inset-y-2" : ""
          }`}
        >
          {hasAudio ? (
            <>
              <motion.div
                className="absolute inset-x-0 top-1/2 h-[3px] origin-left -translate-y-1/2 rounded-full bg-[var(--ink)]"
                style={{ scaleX: progress, willChange: "transform" }}
              />
              <motion.div
                className="pointer-events-none absolute inset-y-0 left-0 w-full"
                style={{ x: knobX, willChange: "transform" }}
              >
                <span className="absolute left-0 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ink)]" />
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                className="absolute inset-0 origin-left rounded-full bg-[var(--ink)]"
                style={{ willChange: "transform" }}
                animate={{ scaleX: playing ? [0.28, 0.78] : 0.28 }}
                transition={{ duration: 18, repeat: playing ? Infinity : 0, ease: "linear" }}
              />
              {/* full-width carrier, so a % translate is a % of the track */}
              <motion.div
                className="pointer-events-none absolute inset-y-0 left-0 w-full"
                style={{ willChange: "transform" }}
                animate={{ x: playing ? ["28%", "78%"] : "28%" }}
                transition={{ duration: 18, repeat: playing ? Infinity : 0, ease: "linear" }}
              >
                <span className="absolute left-0 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ink)]" />
              </motion.div>
            </>
          )}
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] tabular-nums text-muted">
        {hasAudio ? fmt(elapsed) : "1:35"}{" "}
        <span className="opacity-50">/</span>{" "}
        {hasAudio ? fmt(duration) : nowPlaying.fallbackDuration}
      </p>
    </div>
  );
}

/** Big glossy folder */
export function FolderTile({ label, scale = 1 }: { label: string; scale?: number }) {
  return (
    <div className="select-none text-center" style={{ width: 232 * scale }} aria-hidden>
      <svg
        width={232 * scale}
        height={176 * scale}
        viewBox="0 0 232 176"
        fill="none"
        style={{ filter: DROP }}
      >
        <defs>
          <linearGradient id="folderBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#63a9ec" />
            <stop offset="1" stopColor="#3f8ede" />
          </linearGradient>
          <linearGradient id="folderFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8ec8f7" />
            <stop offset="0.5" stopColor="#69b0f0" />
            <stop offset="1" stopColor="#4f9ae7" />
          </linearGradient>
        </defs>
        <path
          d="M6 28a12 12 0 0112-12h62l20 18h114a12 12 0 0112 12v96a12 12 0 01-12 12H18a12 12 0 01-12-12V28z"
          fill="url(#folderBack)"
        />
        <path
          d="M6 54a12 12 0 0112-12h196a12 12 0 0112 12v88a12 12 0 01-12 12H18a12 12 0 01-12-12V54z"
          fill="url(#folderFront)"
        />
        <path d="M6 56h220v5H6z" fill="#fff" opacity=".45" />
        <path
          d="M6 120c60 14 150 16 220 2v20a12 12 0 01-12 12H18a12 12 0 01-12-12v-22z"
          fill="#3f8ede"
          opacity=".35"
        />
      </svg>
      <p className="hand mt-1 text-[19px] text-[#3a3128]">{label}</p>
    </div>
  );
}

/** AirDrop-style share sheet with a noisy gradient thumbnail */
export function ShareSheet({ scale = 1 }: { scale?: number }) {
  return (
    <div
      className="overflow-hidden rounded-[20px] bg-[#fffdf9]"
      style={{
        width: 236 * scale,
        boxShadow:
          "0 1px 1px rgb(23 17 13 / .05), 0 36px 54px -26px rgb(23 17 13 / .38)",
      }}
      data-grab
    >
      <p className="pt-3.5 text-center text-[13px] font-semibold">AirDrop</p>
      <p className="px-4 pb-3 pt-1 text-center text-[11px] leading-snug text-muted">
        Harsh would like to share a résumé
      </p>
      <div
        className="mx-4 h-[186px] rounded-[6px]"
        style={{
          background:
            "conic-gradient(from 210deg at 30% 20%, #f0562a 0deg, #e0246b 90deg, #7b2ff7 160deg, #f2a03d 250deg, #d8202a 320deg, #f0562a 360deg)",
        }}
      >
        <div
          className="h-full w-full rounded-[6px] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
          }}
        />
      </div>
      <div className="mt-3 grid grid-cols-2 border-t border-[var(--line)] text-[13px]">
        <a
          href="#about"
          className="border-r border-[var(--line)] py-2.5 text-center text-[#2f7fe0] transition-colors hover:bg-cream"
        >
          Decline
        </a>
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 text-center font-medium text-[#2f7fe0] transition-colors hover:bg-cream"
        >
          Accept
        </a>
      </div>
    </div>
  );
}

/** 8-bit pointer sticker */
export function PixelCursor({ scale = 1 }: { scale?: number }) {
  const px = 5 * scale;
  const grid = [
    "1........",
    "11.......",
    "121......",
    "1221.....",
    "12221....",
    "122221...",
    "1222221..",
    "12211111.",
    "121.11...",
    "11..121..",
    "1....121.",
    "......11.",
  ];
  const colors: Record<string, string> = { "1": "#17110d", "2": "#f2b8d8" };
  return (
    <div
      style={{ filter: "drop-shadow(0 10px 12px rgb(23 17 13 / .25))" }}
      aria-hidden
      className="select-none"
    >
      {grid.map((row, y) => (
        <div key={y} className="flex">
          {row.split("").map((c, x) => (
            <span
              key={x}
              style={{
                width: px,
                height: px,
                background: colors[c] ?? "transparent",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/** MS-Paint-ish tool palette, parked at the right edge */
export function PixelToolbar({ scale = 1 }: { scale?: number }) {
  const I = (d: React.ReactNode) => (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" stroke="#2b2f33" strokeWidth="1.4">
      {d}
    </svg>
  );
  const tools = [
    I(<><path d="M3 15l3-1 9-9-2-2-9 9-1 3z" fill="#fffaf5" /><path d="M12 4l3 3" /></>), // pencil
    I(<><rect x="3" y="9" width="8" height="6" fill="#fffaf5" /><path d="M6 9l5-5 5 5-5 5" /></>), // eraser
    I(<><path d="M4 10l6-6 5 5-6 6H6z" fill="#fffaf5" /><path d="M15 12v3" /></>), // fill
    I(<><path d="M4 15l2-4 7-7 2 2-7 7-4 2z" fill="#fffaf5" /><path d="M11 5l3 3" /></>), // brush
    I(<><circle cx="8" cy="8" r="5" fill="#fffaf5" /><path d="M12 12l4 4" /></>), // zoom
    I(<><path d="M13 3l3 3-8 8-4 1 1-4 8-8z" fill="#fffaf5" /><path d="M5 15l-2 1" /></>), // dropper
    I(<><path d="M3 16l13-13" /><circle cx="4" cy="15" r="1.6" fill="#2b2f33" /></>), // line
    I(<><path d="M3 14c4-10 9 8 13-2" /></>), // curve
    I(<rect x="3" y="5" width="13" height="9" fill="#fffaf5" />), // rect
    I(<ellipse cx="9.5" cy="9.5" rx="6.5" ry="4.5" fill="#fffaf5" />), // ellipse
    I(<><path d="M3 14V5h6M6 5v9" /><path d="M11 14h5M13 8v6" /></>), // text A
    I(<path d="M3 14l6-9 7 9H3z" fill="#fffaf5" />), // polygon
    I(<><rect x="3" y="4" width="13" height="11" strokeDasharray="2 2" /></>), // select
    I(<><path d="M4 4l4 12 2-5 5-2L4 4z" fill="#fffaf5" /></>), // pointer
    I(<><rect x="3" y="4" width="13" height="11" rx="3" fill="#fffaf5" /><path d="M6 9h7" /></>), // rounded rect
    I(<><path d="M3 9h13M9.5 3v13" /></>), // crosshair
  ];
  return (
    <div
      className="grid grid-cols-2 border border-[#8f959b] bg-[#dfe2e5] p-[3px]"
      style={{ width: 104 * scale, boxShadow: "3px 3px 0 rgb(23 17 13 / .16)" }}
      aria-hidden
    >
      {tools.map((t, i) => (
        <span
          key={i}
          className="grid place-items-center"
          style={{
            height: 44 * scale,
            background: i === 13 ? "#c3c8cc" : "#eceef0",
            boxShadow:
              i === 13
                ? "inset 1px 1px 0 #9aa0a6, inset -1px -1px 0 #fff"
                : "inset -1px -1px 0 #9aa0a6, inset 1px 1px 0 #fff",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* ── the three little app tiles under the hero copy ───────── */

export function IconTile({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      className="group grid h-[62px] w-[62px] place-items-center rounded-[16px] bg-[#fffdf9] ring-1 ring-black/[0.06] transition-transform duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 2px 2px rgb(23 17 13 / .04), 0 14px 22px -12px rgb(23 17 13 / .3)" }}
    >
      {children}
    </a>
  );
}

export const TileArt = {
  github: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z"
        fill="#17110d"
      />
    </svg>
  ),
  linkedin: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#17110d" />
      <circle cx="7.2" cy="7.4" r="1.6" fill="#fffaf5" />
      <rect x="5.9" y="10" width="2.6" height="8" fill="#fffaf5" />
      <path
        d="M11 10h2.5v1.1c.5-.8 1.4-1.3 2.5-1.3 2 0 3 1.3 3 3.6V18h-2.6v-4.2c0-1.1-.4-1.7-1.3-1.7-.9 0-1.5.6-1.5 1.8V18H11v-8z"
        fill="#fffaf5"
      />
    </svg>
  ),
  mail: (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="3" y="7" width="26" height="18" rx="3" fill="#f5ead6" stroke="#17110d" strokeWidth="1.6" />
      <path d="M4.5 9L16 18 27.5 9" stroke="#17110d" strokeWidth="1.6" fill="none" />
      <path d="M4.5 23.5L12 16M27.5 23.5L20 16" stroke="#17110d" strokeWidth="1.2" opacity=".5" />
    </svg>
  ),
};

/** A ruled index card used for the small hero facts */
export function IndexCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[3px] bg-[#fffdf8] px-3.5 py-3 ${className}`}
      style={{ boxShadow: "var(--shadow-paper)" }}
    >
      <span className="absolute inset-y-0 left-[26px] w-px bg-[var(--brick)]/25" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent 0 21px, rgb(169 200 232 / .35) 21px 22px)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
