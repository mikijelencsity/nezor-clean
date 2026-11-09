"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { OpenWizardButton } from "./OpenWizardButton";

const navItems = [
  { n: "01", label: "Kisokos", href: "/miert-mi" },
  { n: "02", label: "Esettanulmányok", href: "/esettanulmanyok" },
  { n: "03", label: "Weboldal, webshop", href: "/weboldalak" },
  { n: "04", label: "Árak", href: "/arak" },
  { n: "05", label: "Kapcsolat", href: "/kapcsolat" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (open || y < 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-[100] px-3 pt-3 text-[#f8f9fa] transition-transform duration-500 ease-out sm:px-4 sm:pt-4 ${
          hidden ? "-translate-y-[160%]" : "translate-y-0"
        }`}
      >
        <div className="pointer-events-auto relative mx-auto flex w-full max-w-[82rem] items-center justify-between rounded-[28px] border border-white/80 bg-gradient-to-b from-white/90 to-white/70 py-3 pl-3 pr-3 shadow-[0_12px_40px_-12px_rgba(8,102,255,0.35),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-white/40 backdrop-blur-2xl backdrop-saturate-[1.8] sm:py-4 sm:pl-4">
          <OpenWizardButton
            hover="Mehet!"
            className="shrink-0 whitespace-nowrap rounded-full bg-accent px-3 py-2.5 text-xs font-semibold text-white min-[360px]:px-3.5 sm:px-6 sm:text-sm"
          >
            <span className="sm:hidden">Konzultáció</span>
            <span className="hidden sm:inline">Ingyenes konzultáció</span>
          </OpenWizardButton>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="NEZOR"
            className="mx-2 flex min-w-0 justify-center transition-transform duration-300 hover:scale-105 sm:absolute sm:left-1/2 sm:mx-0 sm:-translate-x-1/2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/meta3d/nezor-logo.webp"
              alt="NEZOR"
              data-header-logo
              className="h-auto max-h-9 w-auto max-w-full select-none object-contain drop-shadow-[0_6px_10px_rgba(8,102,255,0.4)] min-[420px]:max-h-11 sm:h-11 sm:max-h-none md:h-16"
            />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
            className="group flex items-center"
          >
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-accent transition-transform duration-500 ease-out group-hover:scale-105">
              {/* két vonal: nyugalmi helyzetben "=", hoverre ellentétesen elcsúsznak és közelebb kerülnek, nyitva X */}
              <span
                className={`absolute block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ease-out ${
                  open
                    ? "translate-x-0 translate-y-0 rotate-45"
                    : "-translate-y-[4px] group-hover:-translate-y-[2px] group-hover:translate-x-[3px]"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ease-out ${
                  open
                    ? "translate-x-0 translate-y-0 -rotate-45"
                    : "translate-y-[4px] group-hover:translate-y-[2px] group-hover:-translate-x-[3px]"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Kinyíló menü: pasztell aurora, a tetején a 3D NEZOR logó */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[90] overflow-hidden bg-[#eef3ff] text-ink transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
          open ? "[clip-path:circle(150%_at_92%_6%)]" : "[clip-path:circle(0%_at_92%_6%)] pointer-events-none"
        }`}
      >
        <div className="aurora-a pointer-events-none absolute -left-24 -top-28 h-[28rem] w-[28rem] rounded-full bg-[#ffd9c2] blur-[90px]" />
        <div className="aurora-b pointer-events-none absolute -right-20 top-10 h-[26rem] w-[26rem] rounded-full bg-[#d9ccff] blur-[90px]" />
        <div className="aurora-a pointer-events-none absolute -bottom-32 left-1/3 h-[24rem] w-[30rem] rounded-full bg-[#c6f3e1] blur-[100px]" />

        <div className="relative flex h-full flex-col items-center px-6 pb-8 pt-28 sm:px-16 sm:pt-36">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/meta3d/nezor-logo.webp"
            alt="NEZOR"
            className={`animate-float-a w-48 select-none drop-shadow-[0_22px_28px_rgba(8,102,255,0.35)] transition-all duration-700 sm:w-96 ${
              open ? "translate-y-0 opacity-100 delay-300" : "-translate-y-6 opacity-0"
            }`}
          />

          <div className="flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-10 lg:flex-row lg:items-center lg:justify-between">
            <nav className="flex flex-col gap-1 sm:gap-3">
              {navItems.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4"
                >
                  <span className="text-sm font-semibold text-accent">{item.n}</span>
                  <span className="overflow-hidden">
                    <span
                      className={`font-display block whitespace-nowrap text-[clamp(1.45rem,7.3vw,3rem)] uppercase leading-none transition-[transform,color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-accent sm:text-[clamp(3rem,7.6vw,4.5rem)] lg:text-[clamp(3.25rem,5vw,4.5rem)] ${
                        open ? "translate-y-0" : "translate-y-[115%]"
                      }`}
                      style={{ transitionDelay: open ? `${450 + i * 100}ms` : "0ms" }}
                    >
                      {item.label}
                    </span>
                  </span>
                </Link>
              ))}
            </nav>

            <div
              className={`flex flex-col items-center gap-4 text-center transition-all duration-700 lg:items-end lg:text-right ${
                open ? "translate-y-0 opacity-100 delay-[800ms]" : "translate-y-6 opacity-0"
              }`}
            >
              <OpenWizardButton
                hover="Mehet!"
                className="rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-[0_14px_36px_-12px_rgba(8,102,255,0.8)]"
              >
                Ingyenes konzultáció →
              </OpenWizardButton>
              <div className="flex flex-col gap-1 text-sm text-ink/60">
                <a href="tel:+36302036721" className="py-1.5 transition-colors hover:text-accent">
                  +36 30 203 6721
                </a>
                <a href="mailto:info@nezor.hu" className="py-1.5 transition-colors hover:text-accent">
                  info@nezor.hu
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
