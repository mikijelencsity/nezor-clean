// Horizont szekcióváltó: sima ív, mögötte rétegzett kék-cián ragyogás, üvegperem.
// Álló kép (nem mozog), letisztult: csak ragyogás és perem, pöttyök, vonalak és világos csík nélkül. `flip`: világos -> sötét irányhoz 180 fokkal elforgatva,
// `plain`: ragyogás nélküli, egyszerű ív (világos/színes háttérhez).

type Props = { from: string; to: string; flip?: boolean; plain?: boolean };

function Frame({ from, vbH, flip, children }: { from: string; vbH: number; flip?: boolean; children: React.ReactNode }) {
  return (
    <div
      aria-hidden
      className="relative z-10 -my-px overflow-hidden"
      style={{ aspectRatio: `1440 / ${vbH}`, minHeight: vbH > 200 ? "8rem" : "4rem", background: from, transform: flip ? "rotate(180deg)" : undefined }}
    >
      <svg viewBox={`0 0 1440 ${vbH}`} preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
        {children}
      </svg>
    </div>
  );
}

export function HorizonDivider({ from, to, flip = false, plain = false }: Props) {
  // A felső szín mindig a fenti szekció, az alsó a lenti. Fordított (világos -> sötét) váltásnál 180 fokkal elforgatjuk.
  const [top, bottom] = flip ? [to, from] : [from, to];
  if (plain) {
    return (
      <Frame from={top} vbH={120} flip={flip}>
        <path d="M-20 112 Q 720 66 1460 112 V 121 H -20 Z" fill={bottom} />
      </Frame>
    );
  }
  const H = 280;
  const arc = "M-20 252 Q 720 158 1460 252";
  return (
    <Frame from={top} vbH={H} flip={flip}>
      <defs>
        <radialGradient id="c2-g0" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#0a3fd6" stopOpacity="0.62" />
          <stop offset="0.2" stopColor="#0a3cc8" stopOpacity="0.5" />
          <stop offset="0.4" stopColor="#0a35b8" stopOpacity="0.32" />
          <stop offset="0.6" stopColor="#0a2fb0" stopOpacity="0.16" />
          <stop offset="0.8" stopColor="#0a2fb0" stopOpacity="0.05" />
          <stop offset="1" stopColor="#0a2fb0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="c2-g1" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#22c4ff" stopOpacity="0.5" />
          <stop offset="0.25" stopColor="#1aa0ff" stopOpacity="0.34" />
          <stop offset="0.5" stopColor="#0f7dff" stopOpacity="0.18" />
          <stop offset="0.75" stopColor="#0866ff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#0866ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="c2-g2" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e6f2ff" stopOpacity="0.9" />
          <stop offset="0.2" stopColor="#bcdcff" stopOpacity="0.62" />
          <stop offset="0.45" stopColor="#8bbcff" stopOpacity="0.3" />
          <stop offset="0.75" stopColor="#6ca8ff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#6ca8ff" stopOpacity="0" />
        </radialGradient>
        <filter id="c2-soft" filterUnits="userSpaceOnUse" x="-120" y="-60" width="1680" height="460"><feGaussianBlur stdDeviation="1.8" /></filter>
        <filter id="c2-b10" filterUnits="userSpaceOnUse" x="-120" y="-60" width="1680" height="460"><feGaussianBlur stdDeviation="10" /></filter>
        <filter id="c2-b4" filterUnits="userSpaceOnUse" x="-120" y="-60" width="1680" height="460"><feGaussianBlur stdDeviation="4" /></filter>
        <filter id="c2-b2" filterUnits="userSpaceOnUse" x="-120" y="-60" width="1680" height="460"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>

      <ellipse cx="720" cy="228" rx="1000" ry="210" fill="url(#c2-g0)" />
      <ellipse cx="720" cy="218" rx="560" ry="120" fill="url(#c2-g1)" style={{ mixBlendMode: "screen" }} />
      <ellipse cx="720" cy="212" rx="300" ry="56" fill="url(#c2-g2)" style={{ mixBlendMode: "screen" }} />

      <path d={arc} fill="none" stroke="#6ca8ff" strokeOpacity="0.55" strokeWidth="18" filter="url(#c2-b10)" />
      <path d={arc} fill="none" stroke="#cfe4ff" strokeOpacity="0.45" strokeWidth="6" filter="url(#c2-b4)" />

      <path d={`${arc} V ${H + 80} H -20 Z`} fill={bottom} filter="url(#c2-soft)" />
    </Frame>
  );
}
