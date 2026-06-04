import { CSSProperties } from 'react';
import styles from './Squiggle.module.css';

type Props = {
  d: string;
  viewBox: string;
  style?: CSSProperties;
};

export function Squiggle({ d, viewBox, style }: Props) {
  return (
    <svg className={styles.squiggle} style={style} viewBox={viewBox}>
      <defs>
        <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="#ffe600" />
        </linearGradient>
      </defs>
      <path d={d} />
    </svg>
  );
}
