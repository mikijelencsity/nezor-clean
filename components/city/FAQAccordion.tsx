'use client';

import { useState } from 'react';
import styles from './FAQAccordion.module.css';

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={i} className={styles.item}>
            <button
              type="button"
              className={styles.question}
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              aria-controls={`faq-answer-${i}`}
            >
              <span>{item.question}</span>
              <span aria-hidden="true" className={`${styles.icon} ${open ? styles.iconOpen : ''}`}>+</span>
            </button>
            {open && <p id={`faq-answer-${i}`} className={styles.answer}>{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
