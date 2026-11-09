"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Roll } from "./Roll";

const services = [
  { label: "Facebook hirdetés", href: "/" },
  { label: "Weboldal és webáruház", href: "/weboldalak" },
  { label: "Automatizmus", href: "/" },
  { label: "Google Cégem profil", href: "/" },
  { label: "AI optimalizálás", href: "/" },
];

const company = [
  { label: "Kisokos", href: "/miert-mi" },
  { label: "Esettanulmányok", href: "/esettanulmanyok" },
  { label: "Weboldalak és webáruházak", href: "/weboldalak" },
  { label: "Városok", href: "/varosok" },
  { label: "Árak", href: "/arak" },
  { label: "Kapcsolat", href: "/kapcsolat" },
  { label: "Árajánlat kérése", href: "/kapcsolat" },
];

function LinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="mb-2.5 text-xs font-semibold tracking-widest text-accent-soft">{title}</p>
      <ul className="flex flex-col text-sm text-white/65 lg:gap-1.5">
        {links.map((l) => (
          <li key={l.label} className="w-fit">
            {/* telefonon nagyobb érintési felület */}
            <Link href={l.href} className="block py-1.5 transition-colors hover:text-white lg:py-0">
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
        {/* felső rész: a NEZOR-felirat külön sávban, nem lóg a menü alá */}
        <div
          aria-hidden
          className="pointer-events-none relative flex select-none items-center justify-center overflow-hidden pt-10 lg:min-h-0 lg:flex-1"
        >
          <p className="font-display text-[min(22vw,40vh)] leading-[0.9] text-white/[0.06]">NEZOR</p>
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
              <div className="flex flex-col text-sm text-[#e5ecff] lg:gap-1.5">
                <a href="tel:+36302036721" className="w-fit py-1.5 transition-colors hover:text-accent-soft lg:py-0">
                  +36 30 203 6721
                </a>
                <a href="mailto:info@nezor.hu" className="w-fit py-1.5 transition-colors hover:text-accent-soft lg:py-0">
                  info@nezor.hu
                </a>
              </div>
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
