"use client";

import { useEffect } from "react";

const ALT_TITLE = "(1) Új üzenet";
const INTERVAL_MS = 1500;

// A favicon "N" betűje jobb felső sarkában piros értesítő ponttal.
const ALERT_ICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<path d="M3 61V3h14.5L46 40V3h15v58H46.5L18 24v37z" fill="#0866ff" transform="translate(0 12) scale(0.82)"/>' +
      '<circle cx="52" cy="13" r="10" fill="#ef2b2b" stroke="#ffffff" stroke-width="3"/>' +
      "</svg>",
  );

// Ha a látogató másik fülre vált, a fül címe váltakozik az eredeti és az ALT_TITLE között,
// a favicon pedig piros értesítő pontot kap. Visszatéréskor minden visszaáll.
export function TabTitleBlink() {
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    let original = "";
    let savedIcons: { link: HTMLLinkElement; href: string | null }[] = [];

    const setAlertIcon = () => {
      let links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]'));
      if (links.length === 0) {
        const link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
        links = [link];
      }
      savedIcons = links.map((link) => ({ link, href: link.getAttribute("href") }));
      links.forEach((link) => {
        link.setAttribute("href", ALERT_ICON);
        link.setAttribute("type", "image/svg+xml");
      });
    };

    const restoreIcon = () => {
      savedIcons.forEach(({ link, href }) => {
        if (href) link.setAttribute("href", href);
        else link.remove();
      });
      savedIcons = [];
    };

    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
      if (original) document.title = original;
      restoreIcon();
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (timer) return;
        original = document.title;
        let alt = true;
        document.title = ALT_TITLE;
        setAlertIcon();
        timer = setInterval(() => {
          alt = !alt;
          document.title = alt ? ALT_TITLE : original;
        }, INTERVAL_MS);
      } else {
        stop();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, []);

  return null;
}
