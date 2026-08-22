"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useInteractive } from "./bits";

/**
 * A small ink dot that trails the real cursor and swells over grabbable
 * collage pieces. The native cursor is never hidden — this only shadows it.
 */
export function Cursor() {
  const interactive = useInteractive();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 420, damping: 34, mass: 0.35 });
  const [big, setBig] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    if (!interactive) return;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        const t = e.target as HTMLElement;
        setBig(!!t.closest?.("a,button,[data-grab]"));
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf.current);
    };
  }, [interactive, x, y]);

  if (!interactive) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ x: sx, y: sy, willChange: "transform" }}
    >
      {/* fixed box, scaled — never animates width/height, so no layout work */}
      <motion.span
        className="block h-[30px] w-[30px] -translate-x-[15px] -translate-y-[15px] rounded-full"
        style={{ background: "var(--brick)", willChange: "transform, opacity" }}
        animate={{ scale: big ? 1 : 0.27, opacity: big ? 0.16 : 0.5 }}
        transition={{ duration: 0.22, ease: [0.165, 0.84, 0.44, 1] }}
      />
    </motion.div>
  );
}
