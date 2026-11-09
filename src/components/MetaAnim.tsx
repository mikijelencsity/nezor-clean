"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const ANIM = "/images/meta-anim.webp";
const STILL = "/images/meta-anim-vege.webp";

// A preloader jelzése (lásd Preloader.tsx): kész-e már.
function subscribePreloader(cb: () => void) {
  window.addEventListener("preloader-done", cb);
  return () => window.removeEventListener("preloader-done", cb);
}
const preloaderDone = () => document.documentElement.dataset.preloader === "done";

// A Meta logó animációja (egyszer lejátszódó animált WebP):
// - csak a preloader lefutása után indul,
// - ha a hero kikerül a képből, majd visszatér, újra lejátszódik (az <img> újra létrejön, így az elejéről indul).
export function MetaAnim({ className = "" }: { className?: string }) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const ready = useSyncExternalStore(subscribePreloader, preloaderDone, () => false);
  const [inView, setInView] = useState(false);

  // a fájl előre letöltődik, hogy az indításkor ne késsen
  useEffect(() => {
    const pre = new Image();
    pre.src = ANIM;
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = ready && inView;

  return (
    <span ref={boxRef} className={`relative inline-block aspect-[600/187] ${className}`}>
      <picture>
        <source media="(prefers-reduced-motion: reduce)" srcSet={STILL} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {playing && <img src={ANIM} alt="Meta" className="absolute inset-0 h-full w-full select-none" />}
      </picture>
    </span>
  );
}
