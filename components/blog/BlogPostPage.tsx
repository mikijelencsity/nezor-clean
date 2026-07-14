import Link from 'next/link';
import { GridBg } from '@/components/ui/GridBg';
import type { BlogPost } from '@/lib/blog';
import { estimateReadingTime, renderMarkdown } from '@/lib/blog';
import styles from './BlogPostPage.module.css';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const readingTime = estimateReadingTime(post.content);
  const html = renderMarkdown(post.content);

  return (
    <section className={styles.page}>
      <GridBg />
      <div className={styles.container}>
        <Link href="/blog" className={styles.back}>← Vissza a bloghoz</Link>
        <span className={styles.date}>{formatDate(post.date)}</span>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.meta}>{readingTime} perc olvasás</p>

        <div className={styles.body} dangerouslySetInnerHTML={{ __html: html }} />

        <div className={styles.ctaBox}>
          <h3>Szeretnél te is több érdeklődőt online?</h3>
          <p>Nézd meg, hogyan tud a NEZOR segíteni a vállalkozásodnak.</p>
          <Link href="/#kapcsolat" className={styles.ctaBtn}>Kérek egy ajánlatot →</Link>
        </div>
      </div>
    </section>
  );
}
