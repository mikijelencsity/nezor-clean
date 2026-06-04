import styles from './SideContact.module.css';

export function SideContact({ href }: { href: string }) {
  return <a href={href} className={styles.btn}>Kapcsolatfelvétel</a>;
}
