import Link from 'next/link';
import { GridBg } from '@/components/ui/GridBg';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionTitle } from '@/components/ui/SectionTitle';
import type { BlogPost } from '@/lib/blog';
import styles from './BlogListPage.module.css';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function BlogListPage({ posts }: { posts: BlogPost[] }) {
  return (
    <section className={styles.page}>
      <GridBg />
      <div className={styles.container}>
        <div className={styles.head}>
          <SectionLabel white>NEZOR BLOG</SectionLabel>
          <SectionTitle white>Weboldal, webshop és hirdetés — a gyakorlatban</SectionTitle>
          <p className={styles.lead}>
            Cikkek magyar kis- és középvállalkozásoknak arról, hogyan lehet online ügyfeleket
            szerezni: weboldal, Google és Facebook hirdetés, helyi SEO.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className={styles.empty}>Hamarosan érkeznek az első cikkek.</p>
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
                <span className={styles.cardDate}>{formatDate(post.date)}</span>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardDesc}>{post.description}</p>
                <span className={styles.cardCta}>Elolvasom →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
