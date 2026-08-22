# Harsh Sanwal — portfolio

A scrapbook-desk portfolio: a warm paper canvas, a collage of objects you can pick
up and throw around, and the résumé content underneath it as quiet monospace type.
Styled after the editorial-collage school of personal sites (jackiehu.design), with
its own palette, props and copy.

## Run

```bash
npm install
npm run dev     # http://localhost:3210
npm run build   # production build
```

## How it's put together

| Path | What lives there |
| --- | --- |
| `src/lib/data.ts` | Every piece of résumé content — projects, education, toolkit, bio. Edit here first. |
| `src/app/globals.css` | Design tokens (paper, ink, brick, sky, sun, moss), paper primitives, type roles. |
| `src/components/props.tsx` | The desk objects — lamp, clipped fabric strip, grid sheet, pen, film canister, blue tube, lighter, news clipping, coffee ring, sticky notes, record player, folder, AirDrop sheet, pixel cursor and tool palette. All SVG/CSS, no images. |
| `src/components/bits.tsx` | `Reveal` (the one house scroll entrance) and `Sticker` (the draggable wrapper). |
| `src/components/hero.tsx` | Collage layout + the signature headline. |
| `src/components/sections.tsx` | Cooking / Work / Desk / Toolkit / About / Footer. |
| `src/components/paper.tsx` | Section furniture — push pins, photo corners, torn edges, stamps, keycaps, folder tabs, masked headings. |
| `src/lib/sound.ts` | The desk sounds. Five synthesised voices (tick, paper, pop, thunk, chime) — no audio files. |
| `src/components/sound.tsx` | One delegated listener that maps hovers/clicks to voices, plus the nav toggle. |

Stack: Next.js 16 (App Router) · TypeScript · Tailwind v4 · Framer Motion · Lenis.
Fonts: JetBrains Mono (body), Sacramento (the signature), Caveat (notes), Instrument Serif (the clipping).

## The record player

The card in the hero is a real audio player, wired to `nowPlaying` in
`src/lib/data.ts` — currently *Jazz et thé vert* by Souleance, living at
`public/audio/jazz-et-the-vert.m4a` (AAC 128k, 3.6MB, 3:33).

**Hovering the card starts the track** (fading in over ~0.4s) and moving away
fades it out and pauses, keeping the position. Press the waveform button and it
switches to manual: it then keeps playing after the cursor leaves, until you
press it again. Touch devices skip the hover path and use the button.

The disc spins only while audio plays, the bar shows real progress, and you can
click or arrow-key along it to seek. `preload="metadata"` means only the file
header is fetched on load — the audio itself downloads when you press play. The
nav's mute button pauses the music too. With the file missing the card falls
back to a silent decorative record, so the page never looks broken.

To swap the track: drop a new file in `public/audio/` and update
`nowPlaying.src`. Transcode big WAVs first —

```bash
afconvert -f m4af -d aac -b 128000 -q 127 -s 3 input.wav public/audio/track.m4a
```

The track is a commercial release; check licensing before deploying publicly.

## Sound

Hovering anything interactive plays a synthesised voice: card stock `tick` for
links and chips, a `paper` shuffle for cards and desk objects, `pop` on open,
`thunk` when you pick a prop up. Elements opt in with `data-sfx="paper"`; the
rest fall back to a tick.

- Browsers only allow audio after a gesture, so the AudioContext is created on
  the first pointerdown — the page is silent until then, by design.
- The nav speaker button toggles everything and remembers the choice in
  `localStorage` under `desk-sound`.
- Touch pointers never trigger hover sounds.
- `window.__sound.play("paper")` and `window.__lenis` are exposed for debugging.

## Conventions worth keeping

- Colours come from the tokens in `globals.css`; nothing hardcodes a hex in a section.
- One entrance animation (`Reveal`) for the whole page — don't invent per-section ones.
- Drag, the custom cursor and floating loops are gated behind `useInteractive()`, so
  touch devices and `prefers-reduced-motion` users get a still, fully readable page.
- The CV lives at `public/harsh-sanwal-cv.pdf`; replace the file to update the
  résumé link (nav + hero share sheet).
