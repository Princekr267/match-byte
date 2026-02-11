// ── Sound Effects (Web Audio API — retro chiptune) ───────

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let ctx = null;

function ensure() { if (!ctx) ctx = new AudioCtx(); }

function tone(freq, type, dur, vol = 0.08) {
  ensure();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + dur);
}

export const sfx = {
  select: () => tone(880, 'sine', 0.06, 0.06),
  yeah:   () => { tone(523,'square',0.1,0.1); setTimeout(()=>tone(659,'square',0.1,0.1),80); setTimeout(()=>tone(784,'square',0.18,0.08),160); },
  nah:    () => { tone(330,'sawtooth',0.12,0.06); setTimeout(()=>tone(220,'sawtooth',0.2,0.05),100); },
  start:  () => { tone(440,'square',0.08,0.08); setTimeout(()=>tone(660,'square',0.08,0.08),100); setTimeout(()=>tone(880,'square',0.12,0.08),200); },
  result: () => { [523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,'square',0.1,0.06),i*100)); },
};
