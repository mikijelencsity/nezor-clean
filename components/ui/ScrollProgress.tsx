'use client';
import { useEffect, useState } from 'react';
import styles from './ScrollProgress.module.css';

export function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handler = () => {
      const h = document.documentElement;
      setWidth((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return <div className={styles.bar} style={{ width: `${width}%` }} />;
}
