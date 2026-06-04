import styles from './FloatingCTA.module.css';

export function FloatingCTA({ href, label }: { href: string; label: string }) {
  return <a href={href} className={styles.cta}>{label}</a>;
}
