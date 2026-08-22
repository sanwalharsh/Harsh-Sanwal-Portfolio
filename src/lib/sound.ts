/**
 * Desk sounds — every voice is synthesised with the Web Audio API, so the site
 * ships zero audio files and each trigger sounds slightly different.
 *
 * Browsers block audio until a real gesture, so the context is created lazily on
 * the first pointerdown/keydown and everything before that is silently ignored.
 */

export type Voice = "tick" | "paper" | "pop" | "thunk" | "chime";

const STORAGE_KEY = "desk-sound";
const MIN_GAP_MS = 55;

class DeskSound {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private last = 0;
  enabled = true;

  constructor() {
    if (typeof window !== "undefined") {
      this.enabled = window.localStorage.getItem(STORAGE_KEY) !== "off";
    }
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    try {
      window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
    } catch {
      /* private mode — the toggle just won't persist */
    }
    if (on) this.unlock();
    // muting the desk mutes the record too
    window.dispatchEvent(new CustomEvent("desk-sound", { detail: { on } }));
  }

  /** Called from a user gesture; safe to call repeatedly. */
  unlock() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.5;
      this.master.connect(this.ctx.destination);

      // 0.5s of white noise — the raw material for every paper sound
      const len = Math.floor(this.ctx.sampleRate * 0.5);
      this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = this.noise.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
  }

  private noiseSource(rate = 1) {
    const src = this.ctx!.createBufferSource();
    src.buffer = this.noise;
    src.playbackRate.value = rate;
    return src;
  }

  play(voice: Voice) {
    if (!this.enabled || !this.ctx || !this.master || this.ctx.state !== "running")
      return;
    const now = performance.now();
    if (now - this.last < MIN_GAP_MS) return;
    this.last = now;

    const t = this.ctx.currentTime;
    const g = this.ctx.createGain();
    g.connect(this.master);

    switch (voice) {
      /* a fingernail on card stock — the default hover */
      case "tick": {
        const src = this.noiseSource(1.6 + Math.random() * 0.5);
        const hp = this.ctx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.value = 2600;
        const bp = this.ctx.createBiquadFilter();
        bp.type = "peaking";
        bp.frequency.value = 4200 + Math.random() * 900;
        bp.gain.value = 8;
        src.connect(hp).connect(bp).connect(g);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.05, t + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
        src.start(t);
        src.stop(t + 0.08);
        break;
      }

      /* a sheet of paper shifting under your hand */
      case "paper": {
        const src = this.noiseSource(0.8 + Math.random() * 0.4);
        const bp = this.ctx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.setValueAtTime(900 + Math.random() * 400, t);
        bp.frequency.exponentialRampToValueAtTime(2600, t + 0.14);
        bp.Q.value = 0.9;
        src.connect(bp).connect(g);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.075, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.17);
        src.start(t);
        src.stop(t + 0.2);
        break;
      }

      /* opening something */
      case "pop": {
        const osc = this.ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, t);
        osc.frequency.exponentialRampToValueAtTime(180, t + 0.11);
        osc.connect(g);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.11, t + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
        osc.start(t);
        osc.stop(t + 0.18);
        break;
      }

      /* something heavy set down on the desk */
      case "thunk": {
        const osc = this.ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.exponentialRampToValueAtTime(58, t + 0.12);
        const src = this.noiseSource(0.6);
        const lp = this.ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 700;
        const ng = this.ctx.createGain();
        ng.gain.setValueAtTime(0.05, t);
        ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
        osc.connect(g);
        src.connect(lp).connect(ng).connect(this.master);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.12, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        osc.start(t);
        osc.stop(t + 0.24);
        src.start(t);
        src.stop(t + 0.12);
        break;
      }

      /* confirmation */
      case "chime": {
        [880, 1320].forEach((f, i) => {
          const osc = this.ctx!.createOscillator();
          osc.type = "sine";
          osc.frequency.value = f;
          const og = this.ctx!.createGain();
          og.gain.setValueAtTime(0.0001, t + i * 0.06);
          og.gain.exponentialRampToValueAtTime(0.06, t + i * 0.06 + 0.01);
          og.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.06 + 0.34);
          osc.connect(og).connect(this.master!);
          osc.start(t + i * 0.06);
          osc.stop(t + i * 0.06 + 0.36);
        });
        break;
      }
    }
  }
}

export const sound = new DeskSound();

if (typeof window !== "undefined") {
  // lets you drive the voices from the console: __sound.play("paper")
  (window as unknown as { __sound?: DeskSound }).__sound = sound;
}
