"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function RouteProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPathname = useRef(pathname);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.target === "_blank"
      ) {
        return;
      }
      if (href === window.location.pathname) return;

      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      setVisible(true);
      setWidth(0);
      requestAnimationFrame(() => requestAnimationFrame(() => setWidth(72)));
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    setWidth(100);
    hideTimeout.current = setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 300);
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[150] h-[2px]"
    >
      <div
        className="h-full bg-accent shadow-[0_0_8px_rgba(8,102,255,0.6)] transition-[width,opacity] duration-300 ease-out"
        style={{ width: `${width}%`, opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}
