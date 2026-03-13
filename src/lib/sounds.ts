// Lightweight UI sound effects using Web Audio API — no external files needed

const SOUND_KEY = "laudovoz-sounds-enabled";

export function isSoundEnabled(): boolean {
  return localStorage.getItem(SOUND_KEY) !== "false";
}

export function setSoundEnabled(enabled: boolean) {
  localStorage.setItem(SOUND_KEY, String(enabled));
}

const audioCtx = () => {
  if (!(window as any).__audioCtx) {
    (window as any).__audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return (window as any).__audioCtx as AudioContext;
};

function playTone(freq: number, duration: number, type: OscillatorType = "sine", volume = 0.12) {
  if (!isSoundEnabled()) return;
  try {
    const ctx = audioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // silently fail if audio not available
  }
}

/** Positive confirmation — ascending double beep */
export function playSuccess() {
  playTone(600, 0.12, "sine", 0.1);
  setTimeout(() => playTone(900, 0.15, "sine", 0.1), 100);
}

/** Start recording — low pulse */
export function playRecordStart() {
  playTone(440, 0.2, "sine", 0.08);
}

/** Stop recording — descending beep */
export function playRecordStop() {
  playTone(660, 0.1, "sine", 0.08);
  setTimeout(() => playTone(440, 0.15, "sine", 0.08), 80);
}

/** Generate / sparkle — rising chime */
export function playGenerate() {
  playTone(523, 0.1, "sine", 0.1);
  setTimeout(() => playTone(659, 0.1, "sine", 0.1), 80);
  setTimeout(() => playTone(784, 0.15, "sine", 0.1), 160);
}

/** Copy — quick tick */
export function playCopy() {
  playTone(1200, 0.06, "square", 0.05);
}

/** Delete / discard — low thud */
export function playDiscard() {
  playTone(200, 0.15, "triangle", 0.1);
}

/** Generic tap */
export function playTap() {
  playTone(800, 0.05, "sine", 0.06);
}
