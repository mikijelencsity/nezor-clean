// Körbefutó fénygyűrű + villogó csillagok egy gomb körül (a gomb marad sima szín). A stílus a globals.css-ben (.halo, .twinkle).
// onBlue: kék háttéren a kék csillagok eltűnnének, ezért ott fehér/pink/lila készletet kap.
const light = ["#ff7ac8", "#a77bff", "#0866ff", "#4fb0ff"];
const onBlueSet = ["#ffffff", "#ff9ad5", "#d2b4ff", "#ffffff"];

const spots = [
  { pos: "-left-6 -top-6", size: 30, delay: 0 },
  { pos: "-right-5 -top-7", size: 22, delay: 0.9 },
  { pos: "-right-8 -bottom-5", size: 28, delay: 1.7 },
  { pos: "-left-9 bottom-1", size: 16, delay: 2.3 },
];

export function Halo({
  children,
  className = "",
  small = false,
  onBlue = false,
}: {
  children: React.ReactNode;
  className?: string;
  // kisebb gombokhoz kisebb csillagok
  small?: boolean;
  onBlue?: boolean;
}) {
  const colors = onBlue ? onBlueSet : light;
  return (
    <div className={`halo ${className}`}>
      {spots.map((s, i) => {
        const size = small ? Math.round(s.size * 0.7) : s.size;
        return (
          <svg
            key={i}
            aria-hidden
            viewBox="0 0 24 24"
            className={`twinkle pointer-events-none absolute z-10 ${s.pos}`}
            style={{ width: size, height: size, color: colors[i], animationDelay: `${s.delay}s` }}
          >
            <path fill="currentColor" d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
          </svg>
        );
      })}
      {children}
    </div>
  );
}
