import styles from './SectionTitle.module.css';

export function SectionTitle({ children, white }: { children: React.ReactNode; white?: boolean }) {
  return (
    <h2 className={`${styles.title} ${white ? styles.white : ''}`}>
      {children}
    </h2>
  );
}

export { styles as sectionTitleStyles };
