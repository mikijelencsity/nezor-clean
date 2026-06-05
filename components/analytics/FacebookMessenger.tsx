'use client';
import { useEffect } from 'react';

export function FacebookMessenger() {
  useEffect(() => {
    const pageId = process.env.NEXT_PUBLIC_FB_PAGE_ID;
    if (!pageId) return;

    (window as Window & { fbAsyncInit?: () => void }).fbAsyncInit = function () {
      (window as Window & { FB?: { init: (opts: object) => void } }).FB?.init({
        xfbml: true,
        version: 'v18.0',
      });
    };

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/hu_HU/sdk/xfbml.customerchat.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    const chatbox = document.createElement('div');
    chatbox.className = 'fb-customerchat';
    chatbox.setAttribute('attribution', 'biz_inbox');
    chatbox.setAttribute('page_id', pageId);
    document.body.appendChild(chatbox);

    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
      if (document.body.contains(chatbox)) document.body.removeChild(chatbox);
    };
  }, []);

  return <div id="fb-root" />;
}
