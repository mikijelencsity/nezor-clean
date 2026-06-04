import styles from './GridBg.module.css';

export function GridBg({ light }: { light?: boolean }) {
  return <div className={`${styles.gridBg} ${light ? styles.light : ''}`} />;
}
