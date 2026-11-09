"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// A hero mozgása:
// - belépő: a főcím szavai maszkból úsznak fel, utána sorban jön a többi elem (a preloader után indul),
// - görgetés: a tartalom felfelé úszik és halványodik, a háttér sötétedik (scrub).
// A kezdőállapotot a globals.css adja (prefers-reduced-motion esetén nincs semmi).
export function HeroMotion({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = root.querySelectorAll("[data-hero-w]");
    const items = root.querySelectorAll("[data-hero-in]");
    const section = root.parentElement;
    const dim = section?.querySelector("[data-hero-dim]");

    let started = false;
    let start = () => {};
    const ctx = gsap.context(() => {
      const play = () => {
        // a rejtést a CSS `translate` tulajdonsága adja; a GSAP a `transform`-ot animálja, így nem ütköznek
        words.forEach((el) => ((el as HTMLElement).style.translate = "none"));
        items.forEach((el) => ((el as HTMLElement).style.translate = "none"));
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo(
          words,
          { yPercent: 115 },
          { yPercent: 0, duration: 1.1, stagger: 0.09 }
        ).fromTo(
          items,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          "-=0.6"
        );
      };
      start = () => {
        if (started) return;
        started = true;
        play();
      };

      if (document.documentElement.dataset.preloader === "done") start();
      else {
        window.addEventListener("preloader-done", start, { once: true });
        // ha a preloader valamiért nem jelezne (a preloader legfeljebb 12 mp-ig vár), ne maradjon üresen a hero
        gsap.delayedCall(15, start);
      }

      if (section) {
        const mm = gsap.matchMedia();
        mm.add({ wide: "(min-width: 768px)", narrow: "(max-width: 767px)" }, (c) => {
          const wide = c.conditions?.wide;
          const scrub = {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          };
          gsap.to(root, { y: wide ? -110 : -50, opacity: 0, ease: "none", scrollTrigger: scrub });
          if (dim) gsap.to(dim, { opacity: 0.75, ease: "none", scrollTrigger: scrub });
        });
      }
    }, root);

    return () => {
      window.removeEventListener("preloader-done", start);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} data-hero className={className}>
      {children}
    </div>
  );
}
