"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Roll } from "./Roll";
import { OpenWizardButton } from "./OpenWizardButton";

const services = [
  { label: "Facebook hirdetés", href: "/" },
  { label: "Weboldal", href: "/" },
  { label: "Webáruház", href: "/" },
  { label: "Automatizmus", href: "/" },
  { label: "Google Cégem profil", href: "/" },
  { label: "AI optimalizálás", href: "/" },
];

const company = [
  { label: "Esettanulmányok", href: "/esettanulmanyok" },
  { label: "Weboldal referenciák", href: "/weboldalak" },
  { label: "Városok", href: "/varosok" },
  { label: "Kapcsolat", href: "/kapcsolat" },
  { label: "Árajánlat kérése", href: "/kapcsolat" },
];

const fade = "linear-gradient(to bottom, #000 78%, transparent)";

function Person({ src, alt, className, scale = 1 }: { src: string; alt: string; className: string; scale?: number }) {
  return (
    <div className={`relative self-end lg:h-full ${className}`}>
      <div className="pointer-events-none absolute left-1/2 top-[18%] h-[70%] w-[95%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,111,224,0.4),transparent_68%)] blur-2xl" />
      <div
        style={{ WebkitMaskImage: fade, maskImage: fade, transform: `scale(${scale})`, transformOrigin: "50% 100%" }}
        className="relative flex h-full items-end"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="nz-foot-fig block h-auto w-full select-none drop-shadow-[0_26px_30px_rgba(0,0,0,0.35)] lg:h-full lg:w-auto lg:max-w-full lg:object-contain lg:object-bottom"
        />
      </div>
    </div>
  );
}

function LinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="mb-2.5 text-xs font-semibold tracking-widest text-accent-soft">{title}</p>
      <ul className="flex flex-col gap-1.5 text-sm text-white/65">
        {links.map((l) => (
          <li key={l.label} className="w-fit">
            <Link href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const footRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [subEmail, setSubEmail] = useState("");
  const [subState, setSubState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    setSubState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subEmail }),
      });
      setSubState(res.ok ? "ok" : "error");
    } catch {
      setSubState("error");
    }
  }

  // Függöny-felfedés: ahogy az oldal alja elhúzódik, a lábléc tartalma lassan előlép és kivilágosodik.
  useEffect(() => {
    const foot = footRef.current;
    const inner = innerRef.current;
    const main = foot?.previousElementSibling;
    if (!foot || !inner || !main) return;
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 760px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!mq.matches || reduce) {
        inner.style.transform = "";
        inner.style.filter = "";
        return;
      }
      const m = main.getBoundingClientRect().bottom;
      const p = Math.max(0, Math.min(1, (window.innerHeight - m) / Math.max(1, foot.offsetHeight)));
      inner.style.transform = `translate3d(0,${((1 - p) * 7).toFixed(2)}vh,0) scale(${(0.94 + 0.06 * p).toFixed(4)})`;
      inner.style.filter = `brightness(${(0.55 + 0.45 * p).toFixed(3)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <footer ref={footRef} className="nz-footer overflow-hidden text-[#f4f7ff]">
      <div ref={innerRef} className="nz-foot-inner relative flex flex-col">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_100%,#1747a6,#0a1f4d_70%)]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[3%] select-none text-center">
          <p className="font-display text-[22vw] leading-none text-white/[0.06]">NEZOR</p>
        </div>

        {/* felső rész: két arc a szöveg két oldalán, egymás felé mutatnak */}
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-1 px-4 pt-16 sm:px-6 lg:min-h-0 lg:flex-1 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-x-4 lg:pt-24">
          <div className="col-span-2 pb-8 text-center lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:self-center lg:pb-10">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <OpenWizardButton
                hover="Mehet!"
                className="rounded-full bg-accent px-10 py-5 text-lg font-bold text-white shadow-[0_14px_44px_rgba(8,102,255,0.65)] sm:px-14 sm:py-6 sm:text-2xl"
              >
                Ingyenes konzultáció
              </OpenWizardButton>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="rounded-full border border-white/35 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:text-base"
              >
                ↑ Vissza az elejére
              </button>
            </div>
          </div>
          <Person
            src="/images/csapat/ferfi-bal.webp"
            alt="A NEZOR egyik tagja"
            className="col-start-1 row-start-2 lg:row-start-1"
          />
          <Person
            src="/images/csapat/ferfi-jobb.webp"
            alt="A NEZOR másik tagja"
            className="col-start-2 row-start-2 lg:col-start-3 lg:row-start-1"
            scale={1.12}
          />
        </div>

        {/* alsó sáv: menü, elérhetőségek */}
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-4 pt-6 sm:px-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-6 lg:grid-cols-[1.25fr_1fr_1fr_1.35fr]">
            <div className="col-span-2 lg:col-span-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/meta3d/nezor-logo.webp" alt="NEZOR" className="h-10 w-auto select-none" />
              <p className="mt-3 max-w-[15rem] text-sm text-white/60">
                Online rendszer, ami vevőt hoz: Facebook hirdetés, weboldal, automatizmus, 0–24-ben.
              </p>
            </div>
            <LinkList title="SZOLGÁLTATÁSOK" links={services} />
            <LinkList title="MENÜ" links={company} />
            <div className="col-span-2 lg:col-span-1">
              <p className="mb-2.5 text-xs font-semibold tracking-widest text-accent-soft">ELÉRHETŐSÉG</p>
              <div className="flex flex-col gap-1.5 text-sm text-[#e5ecff]">
                <a href="tel:+36704554703" className="w-fit transition-colors hover:text-accent-soft">
                  +36 70 455 4703
                </a>
                <a href="mailto:info@nezor.hu" className="w-fit transition-colors hover:text-accent-soft">
                  info@nezor.hu
                </a>
              </div>
              <p className="mb-2 mt-4 text-xs text-white/55">Heti hirdetési tippek, se spam, se boost-gomb-reklám:</p>
              {subState === "ok" ? (
                <p className="max-w-xs rounded-full bg-white/10 px-4 py-2.5 text-sm text-white">Köszi, feliratkoztál!</p>
              ) : (
                <form onSubmit={subscribe} className="flex max-w-xs overflow-hidden rounded-full bg-white p-1">
                  <input
                    type="email"
                    required
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    placeholder="Add meg az emailed"
                    className="w-full min-w-0 flex-1 bg-transparent px-3.5 py-2 text-sm text-ink outline-none placeholder:text-ink/45"
                  />
                  <button
                    disabled={subState === "sending"}
                    className="btn-roll roll-dark shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    <Roll label="Irány" hover="Hajrá" />
                  </button>
                </form>
              )}
              {subState === "error" && <p className="mt-2 text-xs text-red-300">Nem sikerült, próbáld újra.</p>}
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center gap-1 border-t border-white/10 pt-3 text-xs text-white/45 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} NEZOR. Minden jog fenntartva.</p>
            <p>NEZOR Webfejlesztés</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
