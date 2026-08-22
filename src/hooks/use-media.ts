"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Media query as React state, without a resize listener storm.
 * Returns false during SSR, which is why the desk waits for `useMounted`.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

const emptySubscribe = () => () => {};

/** true only after hydration — lets us mount one desk instead of both. */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * How much to shrink the desk. The composition is authored against a
 * 1920×1100 stage; on anything smaller every prop scales by the same factor so
 * the arrangement stays identical instead of collapsing on itself.
 */
export function useDeskScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    // reading innerWidth/innerHeight costs nothing and forces no layout, so
    // this runs straight off the resize event (rAF stalls in background tabs)
    const measure = () => {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1100, 1);
      setScale(Math.max(0.6, Number(s.toFixed(3))));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  return scale;
}
