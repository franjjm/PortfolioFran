/* global React */
// Stylized (non-cartographic) map of Argentina with origin → CABA route.
function ArgentinaMap({ originLabel, destLabel, shown }) {
  // Simplified, stylized silhouette — evokes Argentina's tapering form.
  const path =
    "M122 6 C140 10 150 26 148 44 C146 62 156 70 168 82 C178 92 176 110 166 120 " +
    "C156 130 158 146 168 156 C180 168 178 188 164 196 C150 204 150 220 158 234 " +
    "C166 248 160 266 146 274 C150 290 144 308 132 320 C128 340 122 360 112 378 " +
    "C108 388 100 392 96 382 C92 366 96 348 92 332 C86 318 80 320 72 312 " +
    "C62 302 66 286 60 274 C52 258 56 240 50 226 C44 210 50 192 48 176 " +
    "C46 158 56 144 58 126 C60 108 52 92 58 76 C64 58 80 52 92 40 " +
    "C102 30 106 14 122 6 Z";

  // Dots (in viewBox coords)
  const origin = { x: 72, y: 150 };   // interior / west-central
  const caba = { x: 138, y: 168 };    // east coast (Buenos Aires region)

  return (
    <div className="relative w-full max-w-[360px] mx-auto">
      <svg viewBox="0 0 200 400" className="w-full h-auto" aria-hidden="true">
        <defs>
          <linearGradient id="mapFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a26" />
            <stop offset="100%" stopColor="#101019" />
          </linearGradient>
          <filter id="mapGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <path d={path} fill="url(#mapFill)" stroke="#2a2a3a" strokeWidth="1.2" />

        {/* route line */}
        <line
          x1={origin.x} y1={origin.y} x2={caba.x} y2={caba.y}
          stroke="#3b82f6" strokeWidth="1.4" strokeDasharray="4 4" opacity="0.9"
        />

        {/* origin dot */}
        <g>
          <circle cx={origin.x} cy={origin.y} r="6" fill="#3b82f6" opacity="0.18">
            <animate attributeName="r" values="6;11;6" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.18;0;0.18" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx={origin.x} cy={origin.y} r="3.2" fill="#e8e8f0" />
        </g>

        {/* CABA dot */}
        <g filter="url(#mapGlow)">
          <circle cx={caba.x} cy={caba.y} r="7" fill="#3b82f6" opacity="0.22">
            <animate attributeName="r" values="7;13;7" dur="3s" begin="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.22;0;0.22" dur="3s" begin="1s" repeatCount="indefinite" />
          </circle>
          <circle cx={caba.x} cy={caba.y} r="4" fill="#3b82f6" />
          <circle cx={caba.x} cy={caba.y} r="1.6" fill="#e8e8f0" />
        </g>
      </svg>

      {/* labels */}
      <div className="absolute left-[6%] top-[36%] -translate-y-1/2 text-right pr-2">
        <span className="font-mono text-[10px] md:text-[11px] text-[var(--ink-dim)] whitespace-nowrap">{originLabel}</span>
      </div>
      <div className="absolute right-[2%] top-[40%] -translate-y-1/2 pl-2">
        <span className="font-mono text-[10px] md:text-[11px] text-[var(--accent)] whitespace-nowrap">{destLabel}</span>
      </div>
    </div>
  );
}

Object.assign(window, { ArgentinaMap });
