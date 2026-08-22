"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sticker, EASE, useInteractive } from "./bits";
import {
  BlueTube,
  ClippedStrip,
  CoffeeRing,
  DeskLamp,
  FilmCanister,
  FolderTile,
  GridSheet,
  IconTile,
  Lighter,
  NewsClip,
  NowPlaying,
  Pen,
  PixelCursor,
  PixelToolbar,
  ShareSheet,
  StickyNote,
  TileArt,
} from "./props";
import { profile } from "@/lib/data";
import { useDeskScale, useMediaQuery, useMounted } from "@/hooks/use-media";

const links = [
  { href: profile.github, label: "GitHub", art: TileArt.github },
  { href: profile.linkedin, label: "LinkedIn", art: TileArt.linkedin },
  { href: `mailto:${profile.email}`, label: "Email", art: TileArt.mail },
];

export function Hero() {
  const reduced = useReducedMotion();
  const interactive = useInteractive();
  // only one desk is ever mounted — the other used to sit in the DOM animating
  // behind display:none
  const mounted = useMounted();
  const wide = useMediaQuery("(min-width: 1280px)");
  const deskScale = useDeskScale();

  return (
    <section className="relative min-h-[100svh] overflow-hidden pb-20 pt-24">
      {/* ── the desk ───────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {/* the full composition, stepped down on smaller desktops */}
        {mounted && wide && (
          /* Positions are read straight off the reference composition and
             expressed as % of the hero box, so the whole desk keeps its
             proportions at any width. */
          <div
            className="pointer-events-auto h-full w-full"
            style={{ "--desk-scale": deskScale } as React.CSSProperties}
          >
            {/* ── left: strip, lamp, clipping, the page, the small stuff ── */}
            <Sticker style={{ left: "1.5%", top: "4%", zIndex: 1 }} rotate={-3} delay={0.06}>
              <ClippedStrip />
            </Sticker>

            <Sticker style={{ left: "4%", top: "1%", zIndex: 3 }} rotate={-1} float={4} delay={0.02}>
              <DeskLamp />
            </Sticker>

            <Sticker style={{ left: "12.5%", top: "21%", zIndex: 8 }} rotate={-6} delay={0.18}>
              <NewsClip />
            </Sticker>

            <Sticker style={{ left: "3.5%", top: "27%", zIndex: 2 }} rotate={-20} delay={0.1}>
              <GridSheet w={620} h={790} />
            </Sticker>

            <Sticker style={{ left: "19%", top: "40%", zIndex: 6 }} rotate={22} delay={0.3}>
              <Pen />
            </Sticker>

            <Sticker style={{ left: "0.5%", top: "43%", zIndex: 4 }} rotate={0} delay={0.34}>
              <CoffeeRing />
            </Sticker>

            <Sticker style={{ left: "16%", top: "50%", zIndex: 7 }} rotate={4} delay={0.32}>
              <Lighter />
            </Sticker>

            <Sticker style={{ left: "2.6%", top: "59%", zIndex: 7 }} rotate={-6} delay={0.26}>
              <FilmCanister />
            </Sticker>

            <Sticker style={{ left: "14.8%", top: "67%", zIndex: 7 }} rotate={3} delay={0.38}>
              <BlueTube />
            </Sticker>

            {/* the one piece the reference doesn't have — kept clear of the rest */}
            <Sticker style={{ left: "1%", top: "82%", zIndex: 9 }} rotate={-6} float={5} delay={0.44}>
              <StickyNote className="w-[150px]">
                <p className="hand text-[24px] text-[#3a2f14]">p &lt; 0.05</p>
                <p className="mt-1 text-[10px] text-[#3a2f14]/75">…but check the CI</p>
              </StickyNote>
            </Sticker>

            {/* ── right: player, cursor, folder, AirDrop, tool palette ── */}
            <Sticker style={{ right: "1%", top: "4.7%", zIndex: 5 }} rotate={1} float={5} delay={0.08}>
              <NowPlaying scale={1.1} />
            </Sticker>

            <Sticker style={{ right: "17.7%", top: "9.7%", zIndex: 7 }} rotate={-12} delay={0.4}>
              <PixelCursor scale={1.15} />
            </Sticker>

            <Sticker style={{ right: "11.2%", top: "39.7%", zIndex: 4 }} rotate={-6} delay={0.22}>
              <FolderTile label="futurescape_final_final" />
            </Sticker>

            <Sticker style={{ right: "9.9%", top: "57%", zIndex: 5 }} rotate={1} delay={0.3}>
              <ShareSheet />
            </Sticker>

            <Sticker style={{ right: "0.8%", top: "44.6%", zIndex: 6 }} rotate={0} delay={0.46}>
              <PixelToolbar scale={1.15} />
            </Sticker>

            <Sticker style={{ right: "26%", top: "80%", zIndex: 9 }} rotate={7} float={4} delay={0.5}>
              <StickyNote className="w-[142px]" color="var(--sky)">
                <p className="hand text-[23px] text-[#152431]">MTTR ↓ 40%</p>
                <p className="mt-1 text-[10px] text-[#152431]/75">ops dashboard</p>
              </StickyNote>
            </Sticker>
          </div>
        )}

        {/* compact desk for phones and tablets */}
        {mounted && !wide && (
        <div className="pointer-events-auto">
          <Sticker style={{ left: "3%", top: "5%" }} rotate={-4} delay={0.06}>
            <ClippedStrip scale={0.5} />
          </Sticker>

          <Sticker style={{ right: "9%", top: "6%" }} rotate={-6} float={4} delay={0.16}>
            <StickyNote className="w-[118px] px-3.5 py-3">
              <p className="hand text-[19px] text-[#3a2f14]">p &lt; 0.05</p>
              <p className="mt-0.5 text-[9px] text-[#3a2f14]/75">check the CI</p>
            </StickyNote>
          </Sticker>

          <Sticker style={{ right: "6%", top: "62%" }} rotate={-10} delay={0.3}>
            <PixelCursor scale={0.8} />
          </Sticker>

          <Sticker
            className="hidden md:block"
            style={{ left: "0%", top: "11%" }}
            rotate={-7}
            delay={0.28}
          >
            <NewsClip scale={0.82} />
          </Sticker>

          <Sticker
            className="hidden md:block"
            style={{ right: "4%", top: "76%" }}
            rotate={3}
            float={4}
            delay={0.36}
          >
            <ShareSheet scale={0.82} />
          </Sticker>

          <Sticker style={{ left: "-10%", top: "70%" }} rotate={-16} delay={0.24}>
            <GridSheet w={210} h={270} />
          </Sticker>

          <Sticker style={{ left: "6%", top: "88%" }} rotate={-8} delay={0.34}>
            <FilmCanister scale={0.5} />
          </Sticker>

          <Sticker
            className="md:hidden"
            style={{ right: "9%", top: "82%" }}
            rotate={5}
            float={4}
            delay={0.4}
          >
            <StickyNote className="w-[118px] px-3.5 py-3" color="var(--sky)">
              <p className="hand text-[19px] text-[#152431]">MTTR ↓ 40%</p>
              <p className="mt-0.5 text-[9px] text-[#152431]/75">ops dashboard</p>
            </StickyNote>
          </Sticker>
        </div>
        )}
      </div>

      {/* ── the message ───────────────────────────────────── */}
      {/* the reference sits the name high and drops the tiles near the floor,
          leaving a deliberate hole in the middle of the page */}
      <div className="relative z-20 mx-auto flex min-h-[calc(100svh-11rem)] max-w-[640px] flex-col items-center px-6 text-center">
        <div className="mt-[17.5vh] flex flex-col items-center">
          <h1 className="w-max max-w-[94vw] shrink-0 overflow-hidden px-[0.1em]">
            <motion.span
              className="script block whitespace-nowrap pr-[0.12em] text-[clamp(3.2rem,1.2rem+5.4vw,8rem)] leading-[1.45]"
              initial={{ y: reduced ? 0 : "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE }}
            >
              {profile.name}
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            className="mt-1"
          >
            <p className="text-[15px] tracking-[0.02em]">Data Analysis</p>
            <p className="font-serif text-[15px] italic text-ink/80">Signal &amp; Story</p>
          </motion.div>

          <motion.p
            className="mt-8 max-w-[600px] text-[13.5px] leading-[1.75] text-ink/85"
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.46, ease: EASE }}
          >
            {profile.tagline}
          </motion.p>
        </div>

        <motion.div
          className="mb-[7vh] mt-auto flex items-center gap-6 pt-16"
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.58, ease: EASE }}
        >
          {links.map((l) => (
            <IconTile key={l.label} href={l.href} label={l.label}>
              {l.art}
            </IconTile>
          ))}
        </motion.div>

        {interactive && (
          <motion.p
            className="absolute bottom-[2.5vh] text-[10px] text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            (everything on the desk can be picked up)
          </motion.p>
        )}
      </div>

      <motion.a
        href="#cooking"
        aria-label="Scroll to what I'm working on"
        className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-[15px] text-muted"
        animate={reduced ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        ⌄
      </motion.a>
    </section>
  );
}
