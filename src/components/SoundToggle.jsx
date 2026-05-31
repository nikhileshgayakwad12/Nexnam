import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getMuted, setMuted, playClick, playHover } from "../utils/soundManager";

export default function SoundToggle() {
  const [muted, setMutedState] = useState(getMuted());

  const handleToggle = () => {
    const nextState = !muted;
    setMuted(nextState);
    setMutedState(nextState);
    
    // Play a feedback click sound if unmuting
    if (!nextState) {
      setTimeout(() => {
        playClick();
      }, 50);
    }
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={playHover}
      className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full glass-card border border-white/10 text-white/70 hover:text-brand-cyan hover:border-brand-cyan/40 hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all duration-300 pointer-events-auto flex items-center justify-center cursor-pointer group"
      aria-label={muted ? "Unmute sounds" : "Mute sounds"}
    >
      {muted ? (
        <VolumeX className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
      ) : (
        <Volume2 className="w-5 h-5 text-brand-cyan transition-transform duration-300 group-hover:scale-110" />
      )}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-xs pl-0 group-hover:pl-2 font-mono text-brand-cyan font-bold">
        {muted ? "MUTED" : "AUDIO ON"}
      </span>
    </button>
  );
}
