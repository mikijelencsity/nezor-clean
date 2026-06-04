import { CSSProperties } from 'react';
import styles from './GlowBlob.module.css';

type Props = {
  color: 'blue' | 'yellow';
  style?: CSSProperties;
};

export function GlowBlob({ color, style }: Props) {
  return (
    <div
      className={`${styles.blob} ${color === 'blue' ? styles.blue : styles.yellow}`}
      style={style}
    />
  );
}
