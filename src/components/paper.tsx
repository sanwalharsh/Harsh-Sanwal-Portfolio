"use client";

/* Shared paper furniture for the sections below the hero: pins, tape, torn
   edges, stamps and tab labels. Same drawing rules as the desk props. */

import { motion } from "framer-motion";
import { EASE } from "./bits";

export function PushPin({ color = "var(--brick)" }: { color?: string }) {
  return (
    <svg width="26" height="30" viewBox="0 0 26 30" fill="none" aria-hidden>
      <ellipse cx="13" cy="27" rx="4" ry="1.6" fill="#17110d" opacity=".18" />
      <path d="M12.4 14h1.2l.7 13h-2.6l.7-13z" fill="#9aa0a6" />
      <circle cx="13" cy="9" r="9" fill={color} />
      <circle cx="13" cy="9" r="9" fill="url(#pinShine)" />
      <defs>
        <radialGradient id="pinShine" cx="0.34" cy="0.28" r="0.75">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/** Photo-album corner, for the cards that hold a "document" */
export function PhotoCorner({
  position = "tl",
}: {
  position?: "tl" | "tr" | "bl" | "br";
}) {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[position];
  const pos = {
    tl: { left: -1, top: -1 },
    tr: { right: -1, top: -1 },
    br: { right: -1, bottom: -1 },
    bl: { left: -1, bottom: -1 },
  }[position];
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="absolute"
      style={{ ...pos, transform: `rotate(${rot}deg)` }}
      aria-hidden
    >
      <path d="M0 0h24L0 24V0z" fill="#3a3128" opacity=".72" />
      <path d="M3 3h13L3 16V3z" fill="#fffaf5" opacity=".35" />
    </svg>
  );
}

/** Torn paper edge — the seam between two sections */
export function TornEdge({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="pointer-events-none relative h-6 w-full select-none"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 24"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="none"
      >
        <path
          d="M0 12c40-7 62 5 104 2s58-11 96-8 54 12 92 10 62-13 100-11 60 12 98 11 58-12 96-13 62 11 100 12 60-12 98-13 60 12 98 12 60-11 98-11 62 10 100 9 62-11 100-11 58 9 96 9 62-9 64-9v24H0V12z"
          fill="var(--paper)"
        />
        <path
          d="M0 12c40-7 62 5 104 2s58-11 96-8 54 12 92 10 62-13 100-11 60 12 98 11 58-12 96-13 62 11 100 12 60-12 98-13 60 12 98 12 60-11 98-11 62 10 100 9 62-11 100-11 58 9 96 9 62-9 64-9"
          stroke="rgb(23 17 13 / .07)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

/** Rubber-stamp label. Pass `href` and it becomes a link that presses on hover. */
export function Stamp({
  children,
  color = "var(--brick)",
  className = "",
  href,
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
  href?: string;
}) {
  const style: React.CSSProperties = {
    color,
    border: `1.5px solid ${color}`,
    opacity: 0.72,
    boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${color} 22%, transparent)`,
  };
  const base = `inline-block rounded-[3px] px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] ${className}`;

  if (!href) {
    return (
      <span className={base} style={style}>
        {children}
      </span>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-sfx="pop"
      className={`${base} transition-all duration-200 hover:-translate-y-px hover:opacity-100`}
      style={{ ...style, backgroundColor: `color-mix(in srgb, ${color} 8%, transparent)` }}
    >
      {children} <span aria-hidden>↗</span>
    </a>
  );
}

/** A keycap-style chip — the toolkit's unit */
export function Keycap({ children }: { children: React.ReactNode }) {
  return (
    <span
      data-sfx="tick"
      className="inline-block cursor-default rounded-[6px] border border-line bg-[#fffdf8] px-2.5 py-[5px] text-[10px] text-ink/85 transition-all duration-200 hover:-translate-y-[2px] hover:border-[var(--brick)]/35 hover:text-ink"
      style={{ boxShadow: "0 2px 0 var(--line)" }}
    >
      {children}
    </span>
  );
}

/** File-folder index tab, used as the section marker */
export function Tab({
  children,
  color = "var(--sun)",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      className="relative inline-block px-4 pb-1.5 pt-2 text-[11px] tracking-[0.02em]"
      style={{
        background: `color-mix(in srgb, ${color} 34%, #fffdf8)`,
        clipPath: "polygon(0 0, 92% 0, 100% 100%, 0 100%)",
        boxShadow: "0 1px 1px rgb(23 17 13 / .05)",
      }}
    >
      {children}
    </span>
  );
}

/** Heading that wipes in from behind a mask — the house section entrance */
export function MaskedLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden py-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.85, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}
