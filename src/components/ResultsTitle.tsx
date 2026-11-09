// Középre zárt, kétsoros fekete cím. Bal oldalt céltábla nyíllal, jobb oldalt "ellenőrzött" jelvény:
// felfújt, fényes 3D-s Meta-stílusú SVG-k (kék test, cián és magenta perem, fehér csillanás).

const SKIN = "drop-shadow-[0_18px_20px_rgba(8,102,255,0.32)]";

function Defs({ p }: { p: string }) {
  return (
    <defs>
      <radialGradient id={`${p}-blue`} cx="0.32" cy="0.25" r="0.9">
        <stop offset="0" stopColor="#6fb0ff" />
        <stop offset="0.45" stopColor="#0866ff" />
        <stop offset="1" stopColor="#0a2fb0" />
      </radialGradient>
      <radialGradient id={`${p}-white`} cx="0.32" cy="0.25" r="0.95">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#c9dcff" />
      </radialGradient>
      <linearGradient id={`${p}-rim`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#22d3ff" />
        <stop offset="0.5" stopColor="#0866ff" stopOpacity="0" />
        <stop offset="1" stopColor="#ff5ad6" />
      </linearGradient>
      <linearGradient id={`${p}-shine`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

function Bullseye() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={`animate-float-a h-16 w-auto shrink-0 sm:h-40 ${SKIN}`}>
      <Defs p="bz" />
      <circle cx="52" cy="68" r="46" fill="url(#bz-blue)" />
      <circle cx="52" cy="68" r="46" fill="none" stroke="url(#bz-rim)" strokeWidth="3" />
      <circle cx="52" cy="68" r="34" fill="url(#bz-white)" />
      <circle cx="52" cy="68" r="23" fill="url(#bz-blue)" />
      <circle cx="52" cy="68" r="12" fill="url(#bz-white)" />
      <circle cx="52" cy="68" r="5" fill="url(#bz-blue)" />
      <path d="M18 50 A38 38 0 0 1 48 28" fill="none" stroke="url(#bz-shine)" strokeWidth="6" strokeLinecap="round" />
      {/* nyíl */}
      <g transform="rotate(-42 52 68)">
        <rect x="52" y="65" width="62" height="6" rx="3" fill="url(#bz-blue)" />
        <rect x="52" y="65" width="62" height="2.2" rx="1.1" fill="#fff" opacity="0.6" />
        <path d="M100 68 L114 54 L122 54 L112 68 L122 82 L114 82 Z" fill="#22d3ff" />
        <path d="M100 68 L114 54 L122 54 L116 61 Z" fill="#fff" opacity="0.45" />
      </g>
    </svg>
  );
}

// Hullámos szélű kör: r = base + amp * cos(lobes * θ)
function scallop(cx: number, cy: number, base: number, amp: number, lobes: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const a = (i / 240) * Math.PI * 2;
    const r = base + amp * Math.cos(lobes * a);
    pts.push(`${i === 0 ? "M" : "L"}${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ") + "Z";
}

function VerifiedBadge() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={`animate-float-b h-16 w-auto shrink-0 sm:h-40 ${SKIN}`}>
      <Defs p="vb" />
      <path d={scallop(60, 62, 44, 4.5, 10)} fill="url(#vb-blue)" />
      <path d={scallop(60, 62, 44, 4.5, 10)} fill="none" stroke="url(#vb-rim)" strokeWidth="3" />
      <path d="M26 44 A40 40 0 0 1 62 20" fill="none" stroke="url(#vb-shine)" strokeWidth="7" strokeLinecap="round" />
      <path d="M38 64 L54 80 L84 46" fill="none" stroke="#0a2fb0" strokeOpacity="0.35" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 3)" />
      <path d="M38 64 L54 80 L84 46" fill="none" stroke="url(#vb-white)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ResultsTitle({ lines }: { lines: [string, string] }) {
  return (
    <div className="mb-12 flex items-center justify-center gap-3 sm:mb-16 sm:gap-10">
      <Bullseye />
      <h2 className="font-display whitespace-nowrap text-center text-3xl leading-[0.92] text-black sm:text-7xl md:text-8xl">
        {lines[0]}
        <br />
        {lines[1]}
      </h2>
      <VerifiedBadge />
    </div>
  );
}
