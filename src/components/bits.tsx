"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const EASE = [0.165, 0.84, 0.44, 1] as const;

/** true only on precise pointers that also allow motion — gates drag & cursor effects */
export function useInteractive() {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine && !reduced;
}

/** Scroll-entrance wrapper — the single house entrance for the whole site. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "p" | "h2";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.62, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/**
 * A collage object you can pick up and throw around.
 * Falls back to a plain positioned element on touch / reduced motion.
 */
export function Sticker({
  children,
  className = "",
  style,
  rotate = 0,
  float = 0,
  delay = 0,
  label,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  rotate?: number;
  float?: number;
  delay?: number;
  label?: string;
}) {
  const interactive = useInteractive();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0 });

  return (
    <motion.div
      ref={ref}
      className={`absolute drag-none ${interactive ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
      style={{
        rotate,
        willChange: "transform",
        backfaceVisibility: "hidden",
        ...style,
      }}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      initial={{ opacity: 0, scale: reduced ? 1 : 0.94, y: reduced ? 0 : 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      drag={interactive}
      dragMomentum
      dragElastic={0.16}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 26 }}
      whileHover={interactive ? { scale: 1.02, rotate: rotate + 1 } : undefined}
      whileDrag={{ scale: 1.06, zIndex: 60, cursor: "grabbing" }}
    >
      <div
        data-scaler
        style={{
          transform: "scale(var(--desk-scale, 1))",
          // shrink toward whichever edge the prop is anchored to, so the
          // composition keeps its distance from the page edges
          transformOrigin: style && "right" in style ? "top right" : "top left",
        }}
      >
      {float && !reduced ? (
        <motion.div
          style={{ willChange: "transform" }}
          animate={inView ? { y: [0, -float, 0] } : { y: 0 }}
          transition={{
            duration: 7 + float,
            repeat: inView ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
      </div>
    </motion.div>
  );
}
