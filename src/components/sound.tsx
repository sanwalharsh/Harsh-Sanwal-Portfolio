"use client";

import { useEffect, useState } from "react";
import { sound, type Voice } from "@/lib/sound";

/**
 * One delegated listener for the whole page instead of handlers on every card.
 * Elements opt into a specific voice with data-sfx="paper" | "pop" | …;
 * anything else clickable falls back to a quiet tick.
 */
export function SoundLayer() {
  useEffect(() => {
    let lastTarget: Element | null = null;

    const unlock = () => sound.unlock();
    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("keydown", unlock, { passive: true });

    const over = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const el = (e.target as HTMLElement)?.closest?.(
        "[data-sfx], a, button, [data-grab]"
      );
      if (!el || el === lastTarget) return;
      lastTarget = el;
      const voice = (el.getAttribute("data-sfx") as Voice | null) ?? "tick";
      sound.play(voice);
    };

    const out = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        "[data-sfx], a, button, [data-grab]"
      );
      if (el && el === lastTarget) lastTarget = null;
    };

    const down = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        "[data-grab], [data-sfx], a, button"
      );
      if (!el) return;
      sound.play(el.hasAttribute("data-grab") ? "thunk" : "pop");
    };

    const up = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-grab]");
      if (el) sound.play("paper");
    };

    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerout", out, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerout", out);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return null;
}

/** Nav control — the only chrome the sound layer gets. */
export function SoundToggle() {
  const [on, setOn] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOn(sound.enabled);
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? "Turn desk sounds off" : "Turn desk sounds on"}
      title={on ? "Desk sounds on" : "Desk sounds off"}
      onClick={() => {
        const next = !on;
        setOn(next);
        sound.setEnabled(next);
        if (next) sound.play("chime");
      }}
      className="grid h-7 w-7 place-items-center rounded-full border border-line bg-[#fffdf8] transition-colors hover:bg-cream"
    >
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M3 6h2.5L9 3v10L5.5 10H3V6z"
          fill="var(--ink)"
          stroke="var(--ink)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {on ? (
          <>
            <path d="M11 6.2c.8.8.8 3 0 3.8" stroke="var(--ink)" strokeWidth="1.2" />
            <path d="M12.8 4.4c1.6 1.7 1.6 5.6 0 7.3" stroke="var(--ink)" strokeWidth="1.2" opacity=".55" />
          </>
        ) : (
          <path d="M11 5.5l4 5M15 5.5l-4 5" stroke="var(--brick)" strokeWidth="1.3" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
}
