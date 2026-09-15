import React from "react";
import { playHover, playClick } from "../utils/soundManager";

export default function WhatsAppWidget({ className = "" }) {
  const url = "https://wa.me/919329584097?text=Hello%20Nexnam%21%20I%27d%20like%20to%20inquire%20about%20starting%20a%20project%20with%20you.";

  return (
    <div className={`relative group inline-flex items-center ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={playClick}
        onMouseEnter={playHover}
        className="w-11 h-11 rounded-full bg-white border border-slate-900/[0.08] hover:border-emerald-300 shadow-[0_4px_16px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_24px_rgba(37,211,102,0.15)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        aria-label="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-[#25D366] transition-transform duration-200 group-hover:scale-110"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.057 5.284 5.349 0 11.859 0c3.15.001 6.113 1.23 8.344 3.463 2.23 2.233 3.458 5.196 3.458 8.351 0 6.549-5.292 11.833-11.802 11.833-2.008-.002-3.978-.517-5.719-1.498L0 24zm6.49-4.731c1.656.982 3.28 1.499 4.887 1.5 5.413 0 9.817-4.394 9.821-9.794 0-2.615-1.02-5.074-2.871-6.928C16.48 2.193 14.03 1.171 11.84 1.172c-5.417 0-9.821 4.397-9.825 9.8.001 1.95.51 3.85 1.474 5.534l-.973 3.56 3.641-.954zm11.378-5.328c-.287-.144-1.701-.84-1.967-.936-.266-.096-.46-.144-.652.144-.192.288-.744.936-.912 1.129-.168.193-.336.216-.624.072-1.359-.684-2.281-1.208-3.21-2.802-.246-.423.246-.393.704-1.306.079-.159.039-.3-.02-.444-.059-.144-.46-1.104-.63-1.512-.165-.396-.333-.342-.46-.349-.12-.007-.257-.008-.393-.008-.137 0-.36.051-.548.257-.188.206-.72.703-.72 1.714 0 1.011.736 1.986.837 2.122.101.136 1.448 2.21 3.507 3.097.49.212.873.339 1.171.433.493.156.942.134 1.297.081.395-.058 1.701-.696 1.943-1.368.242-.672.242-1.25.17-1.368-.073-.118-.266-.192-.553-.336z" />
        </svg>
      </a>

      {/* Desktop Hover Tooltip */}
      <span className="pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center whitespace-nowrap rounded-md bg-[#111318] px-2.5 py-1 text-[11px] font-medium text-white shadow-md transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-50">
        Chat on WhatsApp
      </span>
    </div>
  );
}

