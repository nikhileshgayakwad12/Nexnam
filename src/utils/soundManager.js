let audioCtx = null;
let isMuted = localStorage.getItem('nexnam_mute') === 'true';

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const setMuted = (muted) => {
  isMuted = muted;
  localStorage.setItem('nexnam_mute', String(muted));
};

export const getMuted = () => {
  return isMuted;
};

// Play a short synth sweep for button hover (high-tech chime beep)
export const playHover = () => {
  if (isMuted) return;
  try {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
    
    gain.gain.setValueAtTime(0.03, now); // Quiet, non-annoying
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    
    osc.start(now);
    osc.stop(now + 0.06);
  } catch (e) {
    // Console log suppressed to avoid spamming on dev environment
  }
};

// Play a clean tech click sound
export const playClick = () => {
  if (isMuted) return;
  try {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
    
    gain.gain.setValueAtTime(0.08, now); // Low level
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    
    osc.start(now);
    osc.stop(now + 0.11);
  } catch (e) {
    // Suppressed
  }
};

// Play a low frequency sweeps for page transitions
export const playTransition = () => {
  if (isMuted) return;
  try {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'triangle';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.25);
    
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    
    osc.start(now);
    osc.stop(now + 0.26);
  } catch (e) {
    // Suppressed
  }
};

// Play a premium synth chime major triad (for login success or form submit success)
export const playSuccess = () => {
  if (isMuted) return;
  try {
    const ctx = initAudio();
    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      const playTime = now + (idx * 0.06);
      
      osc.frequency.setValueAtTime(freq, playTime);
      
      gain.gain.setValueAtTime(0.04, playTime);
      gain.gain.exponentialRampToValueAtTime(0.001, playTime + 0.25);
      
      osc.start(playTime);
      osc.stop(playTime + 0.27);
    });
  } catch (e) {
    // Suppressed
  }
};
