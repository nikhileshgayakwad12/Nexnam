import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getMuted, setMuted, playClick, playHover } from "../utils/soundManager";

export default function SoundToggle({ className = "" }) {
  const [muted, setMutedState] = useState(getMuted());

  const handleToggle = () => {
    const nextState = !muted;
    setMuted(nextState);
    setMutedState(nextState);
    
    if (!nextState) {
      setTimeout(() => {
        playClick();
      }, 50);
    }
  };

  return (
    <div className={`relative group inline-flex items-center ${className}`}>
      <button
        onClick={handleToggle}
        onMouseEnter={playHover}
        className="w-11 h-11 rounded-full bg-white dark:bg-[#111318] border border-slate-900/[0.08] dark:border-white/[0.08] text-[#0B0D12] dark:text-[#F8FAFC] hover:text-[#5B5CF6] dark:hover:text-[#7C7DFF] hover:border-slate-300 dark:hover:border-white/20 shadow-[0_4px_16px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5CF6] dark:focus-visible:ring-[#7C7DFF]"
        aria-label={muted ? "Sound off. Click to turn sound on" : "Sound on. Click to turn sound off"}
      >
        {muted ? (
          <VolumeX className="w-5 h-5 text-slate-400 dark:text-slate-500 transition-colors" />
        ) : (
          <Volume2 className="w-5 h-5 text-slate-700 dark:text-slate-200 group-hover:text-[#5B5CF6] dark:group-hover:text-[#7C7DFF] transition-colors" />
        )}
      </button>

      {/* Desktop Hover Tooltip */}
      <span className="pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center whitespace-nowrap rounded-md bg-[#111318] px-2.5 py-1 text-[11px] font-medium text-white shadow-md transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-50">
        {muted ? "Sound off" : "Sound on"}
      </span>
    </div>
  );
}

