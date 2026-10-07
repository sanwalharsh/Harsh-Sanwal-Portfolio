"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal, EASE } from "./bits";
import { Keycap, MaskedLine, PhotoCorner, PushPin, Stamp, Tab, TornEdge } from "./paper";
import { about, cooking, other, profile, projects, toolkit } from "@/lib/data";

/* ── shared section furniture ─────────────────────────────── */

function SectionHead({
  index,
  tab,
  title,
  tint = "var(--sun)",
}: {
  index: string;
  tab: string;
  title: string;
  tint?: string;
}) {
  return (
    <div className="mb-12">
      <Reveal className="flex items-end gap-3">
        <Tab color={tint}>{tab}</Tab>
        <span className="mb-1 text-[10px] tracking-[0.2em] text-muted">{index}</span>
        <span className="mb-2 h-px flex-1 bg-[repeating-linear-gradient(90deg,var(--line)_0_5px,transparent_5px_10px)]" />
      </Reveal>
      <h2 className="mt-5 font-serif text-[clamp(1.9rem,1.2rem+1.7vw,2.9rem)] leading-[1.15] tracking-[-0.01em]">
        <MaskedLine>{title}</MaskedLine>
      </h2>
    </div>
  );
}

const Wrap = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={`relative mx-auto max-w-[860px] px-6 py-24 md:py-32 ${className}`}
  >
    {children}
  </section>
);

/** Paper sheet used by every card below */
const sheet = {
  background: "linear-gradient(160deg,#fffefb 0%,#fffdf8 60%,#f8f2e7 100%)",
  boxShadow:
    "0 1px 1px rgb(23 17 13 / .045), 0 22px 34px -20px rgb(23 17 13 / .32)",
} as const;

/* ── currently cooking ────────────────────────────────────── */

export function Cooking() {
  const reduced = useReducedMotion();
  return (
    <Wrap id="cooking">
      <div className="grid gap-12 md:grid-cols-[1fr_270px] md:gap-10">
        <div>
          <Reveal className="flex items-center gap-3">
            <span className="hand text-[30px] text-[var(--brick)]">
              {cooking.kicker}
            </span>
            {!reduced && (
              <span className="flex items-end gap-[3px]">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="block h-1 w-1 rounded-full bg-[var(--brick)]/50"
                    animate={{ y: [0, -7, 0], opacity: [0.2, 0.8, 0.2] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.35,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </span>
            )}
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-5 text-[15px] leading-[1.85]">
              {cooking.lead}{" "}
              <span className="underline-mark font-medium">{cooking.title}</span>.
            </p>
            <p className="mt-5 max-w-[520px] text-[13px] leading-[1.95] text-muted">
              {cooking.body}
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-7 flex flex-wrap items-center gap-2">
            <Stamp href={profile.draft}>research draft</Stamp>
            <Stamp color="var(--moss)">10 agents</Stamp>
            <Stamp color="var(--sky)">human in the loop</Stamp>
          </Reveal>
        </div>

        {/* the pinned note */}
        <Reveal delay={0.16} className="justify-self-start md:justify-self-end">
          <motion.div
            data-sfx="paper"
            className="relative w-[248px] px-5 pb-5 pt-8"
            style={{ ...sheet, rotate: 2.4, borderRadius: 3, willChange: "transform" }}
            whileHover={{ rotate: 0, y: -5 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2">
              <PushPin />
            </span>
            <div
              className="absolute inset-x-0 bottom-0 top-8 opacity-70"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent 0 23px, rgb(169 200 232 / .32) 23px 24px)",
              }}
            />
            <p className="relative text-[12.5px] leading-[24px]">
              {cooking.footnote}
            </p>
            <p className="hand relative mt-3 text-[19px] text-[var(--brick)]">
              — starting soon
            </p>
          </motion.div>
        </Reveal>
      </div>
    </Wrap>
  );
}

/* ── recently made ────────────────────────────────────────── */

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const tilt = [-0.7, 0.5, -0.4, 0.6][index % 4];

  return (
    <Reveal as="li" delay={index * 0.06}>
      <motion.div
        className="relative"
        style={{ rotate: reduced ? 0 : tilt, willChange: "transform" }}
        whileHover={reduced ? undefined : { rotate: 0, y: -4 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {/* folder tab */}
        <span
          className="absolute -top-[19px] left-7 z-0 px-4 pb-3 pt-1.5 text-[10px] tracking-[0.14em] text-[#2b241c]"
          style={{
            background: `color-mix(in srgb, ${project.tint} 46%, #fffdf8)`,
            clipPath: "polygon(0 0, 88% 0, 100% 100%, 0 100%)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <button
          type="button"
          data-sfx="paper"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="group relative z-10 block w-full rounded-[4px] px-6 py-6 text-left"
          style={sheet}
        >
          <span className="flex items-start gap-5">
            <span
              className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-[10px] text-[17px] text-[#fffdf8] transition-transform duration-300 group-hover:-rotate-6"
              style={{
                background: project.tint,
                boxShadow: "0 6px 14px -6px rgb(23 17 13 / .5)",
              }}
              aria-hidden
            >
              {project.glyph}
            </span>

            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[15px] font-medium tracking-[-0.01em]">
                  {project.name}
                </span>
                <span className="text-[10px] tracking-[0.12em] text-muted">
                  {project.year}
                </span>
              </span>
              <span className="mt-1.5 block text-[12.5px] leading-relaxed text-muted">
                {project.blurb}
              </span>
            </span>

            <span
              className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-[11px] text-muted transition-all duration-300 group-hover:border-[var(--brick)]/40 group-hover:text-ink"
              style={{ transform: open ? "rotate(45deg)" : "none" }}
              aria-hidden
            >
              +
            </span>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={
                reduced
                  ? { opacity: 1 }
                  : { height: "auto", opacity: 1, transition: { height: { duration: 0.42, ease: EASE }, opacity: { duration: 0.3, delay: 0.08 } } }
              }
              exit={
                reduced
                  ? { opacity: 0 }
                  : { height: 0, opacity: 0, transition: { height: { duration: 0.32, ease: EASE }, opacity: { duration: 0.16 } } }
              }
              className="relative z-0 overflow-hidden"
            >
              <div
                className="mx-3 -mt-2 rounded-b-[4px] px-6 pb-6 pt-7"
                style={{
                  background: "#fbf5ea",
                  boxShadow: "inset 0 8px 12px -10px rgb(23 17 13 / .3)",
                }}
              >
                <ul className="space-y-2.5 border-l border-dashed border-[var(--line)] pl-5">
                  {project.points.map((p, i) => (
                    <motion.li
                      key={p}
                      initial={reduced ? false : { opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.05, duration: 0.4, ease: EASE }}
                      className="relative text-[12.5px] leading-[1.85] text-ink/75 before:absolute before:-left-[21px] before:top-[10px] before:h-[4px] before:w-[4px] before:rounded-full before:bg-[var(--brick)]"
                    >
                      {p}
                    </motion.li>
                  ))}
                </ul>

                {project.link && (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-sfx="tick"
                    className="mt-5 inline-block text-[11.5px] underline-mark transition-opacity hover:opacity-70"
                  >
                    {project.link.label} ↗
                  </a>
                )}

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <Keycap key={s}>{s}</Keycap>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Reveal>
  );
}

export function Work() {
  return (
    <Wrap id="work">
      <SectionHead
        index="01"
        tab="work"
        title="Four things I built, and what they moved."
        tint="var(--sky)"
      />
      <ul className="space-y-9">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </ul>
      <Reveal delay={0.1}>
        <p className="mt-9 text-[10.5px] text-muted">
          (open a card — the numbers live underneath)
        </p>
      </Reveal>
    </Wrap>
  );
}

/* ── the desk: education, certs, the human bits ───────────── */

const pinColors = ["var(--brick)", "var(--sky)", "var(--sun)", "var(--moss)", "var(--brick)"];

export function Desk() {
  const reduced = useReducedMotion();
  return (
    <Wrap id="desk">
      <SectionHead
        index="02"
        tab="desk"
        title="Everything else on the corkboard."
        tint="var(--moss)"
      />
      <div className="grid gap-7 sm:grid-cols-2">
        {other.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.06}>
            <motion.article
              data-sfx="paper"
              className="relative h-full rounded-[3px] px-6 pb-6 pt-9"
              style={{
                ...sheet,
                rotate: reduced ? 0 : card.rotate,
                willChange: "transform",
              }}
              whileHover={reduced ? undefined : { rotate: 0, y: -6 }}
              transition={{ duration: 0.42, ease: EASE }}
            >
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <PushPin color={pinColors[i % pinColors.length]} />
              </span>
              <PhotoCorner position="bl" />
              <PhotoCorner position="br" />

              <h3 className="text-[13.5px] font-medium">{card.title}</h3>
              <p className="mt-1.5 text-[10px] tracking-[0.1em] text-muted">
                {card.meta}
              </p>
              <p className="mt-3.5 text-[12px] leading-[1.85] text-ink/75">
                {card.body}
              </p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Wrap>
  );
}

/* ── toolkit ──────────────────────────────────────────────── */

export function Toolkit() {
  return (
    <Wrap id="toolkit">
      <SectionHead
        index="03"
        tab="tools"
        title="What I reach for, most days."
        tint="var(--sun)"
      />
      <dl className="space-y-8">
        {toolkit.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.05}>
            <div className="grid gap-3 sm:grid-cols-[148px_1fr] sm:gap-6">
              <dt>
                <Tab color="var(--line)">{group.label}</Tab>
              </dt>
              <dd className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Keycap key={item}>{item}</Keycap>
                ))}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Wrap>
  );
}

/* ── about ────────────────────────────────────────────────── */

export function About() {
  const reduced = useReducedMotion();
  return (
    <Wrap id="about">
      <SectionHead index="04" tab="about" title="Who's holding the pen." tint="var(--brick)" />

      <div className="grid gap-12 md:grid-cols-[1fr_250px] md:gap-12">
        <div className="space-y-5">
          {about.map((p, i) => (
            <Reveal key={p} delay={i * 0.05}>
              <p
                className={`max-w-[600px] text-[13px] leading-[2] ${
                  i === about.length - 1 ? "text-ink" : "text-ink/75"
                }`}
              >
                {p}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <p className="script mt-8 text-[38px] leading-none">{profile.name}</p>
          </Reveal>

          <Reveal
            delay={0.3}
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11.5px]"
          >
            <a
              className="underline-mark transition-opacity hover:opacity-70"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <span aria-hidden className="text-muted">
              |
            </span>
            <a
              className="underline-mark transition-opacity hover:opacity-70"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span aria-hidden className="text-muted">
              |
            </span>
            <a
              className="underline-mark transition-opacity hover:opacity-70"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
          </Reveal>
        </div>

        {/* conference-badge card */}
        <Reveal delay={0.18} className="justify-self-start md:justify-self-end">
          <motion.div
            data-sfx="paper"
            className="relative w-[236px] overflow-hidden rounded-[6px] pb-5"
            style={{ ...sheet, rotate: -2.6, willChange: "transform" }}
            whileHover={reduced ? undefined : { rotate: 0, y: -5 }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            <div className="flex items-center justify-between bg-[var(--ink)] px-4 py-2.5 text-[9px] uppercase tracking-[0.18em] text-paper">
              <span>desk pass</span>
              <span>2026</span>
            </div>
            <div className="px-5 pt-5">
              <p className="label">Name</p>
              <p className="script mt-1 text-[30px] leading-none">{profile.name}</p>
              <p className="mt-4 label">Doing</p>
              <p className="mt-1 text-[11.5px] leading-snug">
                {profile.role}
                <br />
                <span className="text-muted">{profile.roleSub}</span>
              </p>
              <p className="mt-4 label">Based</p>
              <p className="mt-1 text-[11.5px]">{profile.location}</p>

              {/* barcode */}
              <div className="mt-5 flex h-9 items-end gap-[2px]">
                {[3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 2, 4, 1, 1, 2, 3, 1, 2, 1, 4, 2, 1].map(
                  (w, i) => (
                    <span
                      key={i}
                      className="block h-full bg-[var(--ink)]"
                      style={{ width: w, opacity: i % 3 === 0 ? 0.85 : 0.65 }}
                    />
                  )
                )}
              </div>
              <p className="mt-1.5 text-center text-[8px] tracking-[0.3em] text-muted">
                HS · 2026
              </p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </Wrap>
  );
}

/* ── footer ───────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#f8f1e6] pb-10 pt-2">
      <TornEdge />
      <div className="mx-auto flex max-w-[860px] flex-wrap items-end justify-between gap-8 px-6 pt-10">
        <div>
          <p className="label">Say hello</p>
          <a
            href={`mailto:${profile.email}`}
            data-sfx="pop"
            className="script mt-2 block text-[clamp(1.9rem,1rem+2.4vw,2.8rem)] leading-none transition-colors hover:text-[var(--brick)]"
          >
            {profile.email}
          </a>
          <p className="mt-4 text-[10.5px] text-muted">
            {profile.phone} · {profile.location}
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <span
            className="grid h-[68px] w-[68px] -rotate-12 place-items-center rounded-full text-center text-[7.5px] uppercase leading-[1.5] tracking-[0.14em]"
            style={{
              color: "var(--brick)",
              border: "2px solid var(--brick)",
              opacity: 0.55,
            }}
            aria-hidden
          >
            open
            <br />
            to work
            <br />
            2026
          </span>
        </div>
      </div>

      <p
        className="script pointer-events-none mt-8 select-none text-center text-[clamp(4rem,15vw,12rem)] leading-[1.1] text-ink/[0.06]"
        aria-hidden
      >
        {profile.name}
      </p>
    </footer>
  );
}
