import React from "react";

export default function TechBackground3D() {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-[#FAFAFA] select-none pointer-events-none">
      {/* Refined subtle ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(91,92,246,0.06),transparent_40%),#FAFAFA]" />

      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
    </div>
  );
}

