"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { profile } from "@/lib/data";
import { SoundToggle } from "./sound";

const items = [
  { href: "#work", label: "work" },
  { href: "#desk", label: "desk" },
  { href: "#about", label: "about" },
];

export function Nav() {
  const [stuck, setStuck] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{
        backgroundColor: stuck ? "rgb(255 250 245 / 0.94)" : "rgb(255 250 245 / 0)",
        borderColor: stuck ? "rgb(227 216 202 / 1)" : "rgb(227 216 202 / 0)",
      }}
      transition={{ duration: 0.35, ease: [0.165, 0.84, 0.44, 1] }}
      style={{ borderBottomWidth: 1, willChange: "background-color" }}
    >
      <nav className="mx-auto flex h-14 max-w-[1080px] items-center justify-between px-6">
        <a href="#top" data-sfx="tick" className="hand text-[26px] leading-none">
          Harsh
        </a>
        <div className="flex items-center gap-5 text-[11px] text-muted">
          {items.map((i) => (
            <a
              key={i.href}
              href={i.href}
              data-sfx="tick"
              className="relative hidden py-1 transition-colors hover:text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-[var(--brick)] after:transition-transform after:duration-300 hover:after:scale-x-100 sm:block"
            >
              {i.label}
            </a>
          ))}
          <SoundToggle />
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            data-sfx="pop"
            className="rounded-full border border-line bg-[#fffdf8] px-3 py-1 text-ink transition-all duration-300 hover:-translate-y-px hover:bg-cream"
          >
            résumé ↗
          </a>
        </div>
      </nav>

      {/* how far down the desk you are */}
      <motion.div
        className="h-px origin-left bg-[var(--brick)]/45"
        style={{ scaleX: progress }}
        aria-hidden
      />
    </motion.header>
  );
}
