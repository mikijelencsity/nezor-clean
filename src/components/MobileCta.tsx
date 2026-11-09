"use client";

import { useEffect, useState } from "react";
import { CONSULTATION_ID } from "./HomeConsultation";

// Mobilon alul végig látszó gomb a főoldalon. Nem látszik a nyitó képernyőn (ott van a név-mező),
// sem akkor, ha az űrlap vagy a lábléc már a képen van, mert akkor csak takarná őket.
export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById(CONSULTATION_ID);
    const footer = document.querySelector("footer");
    const targets = [form, footer].filter((el): el is HTMLElement => el !== null);
    const inView = new Set<Element>();
    let raf = 0;

    const update = () => {
      raf = 0;
      setVisible(window.scrollY > window.innerHeight * 0.8 && inView.size === 0);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      }
      schedule();
    });
    targets.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", schedule, { passive: true });
    schedule();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-[translate,opacity] duration-300 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <a
        href={`#${CONSULTATION_ID}`}
        tabIndex={visible ? undefined : -1}
        aria-hidden={!visible}
        className={`font-display block rounded-2xl bg-accent px-4 py-4 text-center text-xl uppercase leading-none tracking-wide text-white shadow-[0_18px_40px_-12px_rgba(8,102,255,0.8)] ${
          visible ? "pointer-events-auto" : ""
        }`}
      >
        Ingyenes konzultáció <span aria-hidden>→</span>
      </a>
    </div>
  );
}
