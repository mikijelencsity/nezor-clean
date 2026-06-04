import styles from './SectionLabel.module.css';

export function SectionLabel({ children, white }: { children: React.ReactNode; white?: boolean }) {
  return (
    <div className={`${styles.label} ${white ? styles.white : ''}`}>
      {children}
    </div>
  );
}
