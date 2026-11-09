"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Hajszálgyűrűs számláló a hero háttere felett. A főoldalon a fátyol átlátszó: a hero valódi háttere
// látszik végig, nem változik semmi, csak a gyűrű + felirat menekül ki balra (forogva, fade-elve),
// és közben a hero szövegei animálva megjelennek. Más oldalon a fátyol a hero-hoz illő sötét-kék háttér.
const MIN_S = 2.3; // a számláló legkisebb ideje
const MAX_S = 12; // ennyi után akkor is indulunk, ha a load esemény nem jön
const HOLD_MS = 380; // 100% után ennyit áll
const EXIT_MS = 1100; // a kimenet ideje
const GHOSTS = 3;

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const CURVE: [number, number][] = [[0, 0], [0.1, 4], [0.28, 34], [0.42, 38], [0.66, 82], [0.8, 86], [1, 100]];
const curve = (t: number) => {
  for (let i = 1; i < CURVE.length; i++) {
    if (t <= CURVE[i][0]) {
      const [t0, v0] = CURVE[i - 1];
      const [t1, v1] = CURVE[i];
      return Math.round(v0 + ((v1 - v0) * (t - t0)) / (t1 - t0));
    }
  }
  return 100;
};

// Jelzés a többi komponensnek (hero belépő, Meta-animáció): a preloader lefutott.
function signalDone() {
  document.documentElement.dataset.preloader = "done";
  window.dispatchEvent(new Event("preloader-done"));
}

// A fejléc ekkor lesz látható (lásd globals.css: header, [data-header-logo]).
function signalLanded() {
  document.documentElement.dataset.logoLanded = "true";
}

function RingSvg({ svgRef, arcRef, track = "rgba(255,255,255,.2)" }: {
  svgRef?: React.Ref<SVGSVGElement>;
  arcRef?: React.Ref<SVGCircleElement>;
  track?: string;
}) {
  return (
    <svg ref={svgRef} viewBox="0 0 100 100" className="nz-pl-svg">
      <circle cx="50" cy="50" r="49.4" fill="none" stroke={track} strokeWidth=".35" />
      {arcRef && (
        <circle
          ref={arcRef}
          cx="50"
          cy="50"
          r="49.4"
          fill="none"
          stroke="#f8f9fa"
          strokeWidth=".55"
          pathLength={1}
          style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          transform="rotate(-90 50 50)"
        />
      )}
      {/* jelölőpont: ettől látszik, hogy a gyűrű gurul */}
      <circle cx="50" cy="0.8" r="1.5" fill="#8fb8ff" />
    </svg>
  );
}

export function Preloader() {
  const home = usePathname() === "/";
  const [hidden, setHidden] = useState(false);
  const veilRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const ghostRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      signalDone();
      signalLanded();
      const t = setTimeout(() => setHidden(true), 0);
      return () => clearTimeout(t);
    }
    const veil = veilRef.current;
    const ring = ringRef.current;
    const svg = svgRef.current;
    const arc = arcRef.current;
    const num = numRef.current;
    const cap = capRef.current;
    if (!veil || !ring || !svg || !arc || !num || !cap) return;

    // Töltés közben nem görgethető az oldal. Nem `overflow:hidden`-nel, mert az eltünteti a görgetősávot,
    // és a preloader végén visszatérve az egész oldal arrébb ugrana (villanás).
    const stop = (e: Event) => e.preventDefault();
    const stopKey = (e: KeyboardEvent) => {
      if ([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) e.preventDefault();
    };
    const lock = () => {
      window.addEventListener("wheel", stop, { passive: false });
      window.addEventListener("touchmove", stop, { passive: false });
      window.addEventListener("keydown", stopKey);
    };
    const unlock = () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
      window.removeEventListener("keydown", stopKey);
    };
    lock();
    // biztos, ami biztos: ha a böngésző mégis visszaállítaná a görgetést, a preloader alatt visszaugrunk a tetejére
    window.scrollTo(0, 0);

    let loaded = document.readyState === "complete";
    const onLoad = () => {
      loaded = true;
    };
    if (!loaded) window.addEventListener("load", onLoad);

    const t0 = performance.now();
    let raf = 0;
    let exitAt = 0;
    let exitStart = 0;
    let travel = 0;
    let R = 1;
    let signalled = false;

    // a gyűrű útja: kis előrelendülés, aztán gyorsulva kigurul balra
    const distAt = (u: number) => travel * Math.pow(clamp01((u - 0.1) / 0.9), 2.2);
    const anticAt = (u: number) => (u < 0.2 ? Math.sin(clamp01(u / 0.2) * Math.PI) * 0.012 * window.innerWidth : 0);
    const deg = (px: number) => (px / R) * (180 / Math.PI);

    let lastD = 0;
    let lastT = 0;
    const tick = (now: number) => {
      if (!exitStart) {
        if (window.scrollY !== 0) window.scrollTo(0, 0);
        const t = (now - t0) / 1000;
        const ready = (t >= MIN_S && loaded) || t > MAX_S;
        let p = curve(clamp01(t / MIN_S));
        if (!loaded) p = Math.min(p, 92);
        if (ready) p = 100;
        num.textContent = `${p}%`;
        arc.style.strokeDashoffset = String(1 - p / 100);
        if (p >= 45) cap.dataset.s2 = "1";
        if (ready && !exitAt) exitAt = now + HOLD_MS;
        if (exitAt && now >= exitAt) {
          exitStart = now;
          lastT = now;
          R = ring.getBoundingClientRect().width / 2;
          travel = cap.getBoundingClientRect().right + 40;
        }
      } else {
        const u = clamp01((now - exitStart) / EXIT_MS);
        const d = distAt(u);
        const a = anticAt(u);
        const fade = 1 - clamp01((u - 0.12) / 0.7);
        const v = (d - lastD) / Math.max(1, now - lastT);
        lastD = d;
        lastT = now;
        const s = clamp01(v / (window.innerWidth / 500));
        ring.style.transform = `translate3d(${a - d}px,0,0) scale(${1 + 0.3 * s},${1 - 0.1 * s})`;
        ring.style.opacity = String(fade);
        cap.style.transform = `translate3d(${a - d}px,0,0)`;
        cap.style.opacity = String(fade);
        if (svgRef.current) svgRef.current.style.transform = `rotate(${-deg(d - a)}deg)`;
        ghostRefs.current.forEach((g, k) => {
          if (!g) return;
          const dk = distAt(Math.max(0, u - 0.04 * (k + 1)));
          g.style.transform = `translate3d(${a - dk}px,0,0) rotate(${-deg(dk - a)}deg)`;
          g.style.opacity = String((s * 0.5 * fade) / (k + 1));
        });
        if (!home) veil.style.opacity = String(1 - clamp01((u - 0.25) / 0.6));
        if (!signalled && u >= 0.22) {
          signalled = true;
          signalLanded();
          signalDone();
        }
        if (u >= 1) {
          if (!signalled) {
            signalLanded();
            signalDone();
          }
          unlock();
          setHidden(true);
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      unlock();
    };
  }, [home]);

  if (hidden) return null;

  return (
    <div aria-hidden="true" data-home={home ? "1" : undefined} className="nz-pl pointer-events-none fixed inset-0 z-[200]">
      <div ref={veilRef} className="nz-pl-veil">
        {Array.from({ length: GHOSTS }).map((_, k) => (
          <div
            key={k}
            ref={(el) => {
              ghostRefs.current[k] = el;
            }}
            className="nz-pl-ring nz-pl-ghost"
          >
            <RingSvg track="rgba(143,184,255,.7)" />
          </div>
        ))}
        <div ref={ringRef} className="nz-pl-ring">
          <RingSvg svgRef={svgRef} arcRef={arcRef} />
          <span ref={numRef} className="nz-pl-num">
            0%
          </span>
        </div>
        <div ref={capRef} className="nz-pl-cap">
          <span>Egy pillanat.</span>
          <br />
          <span className="nz-pl-l2">
            A jó dolgokra várni kell...
          </span>
        </div>
      </div>
    </div>
  );
}
