import type { Metadata } from 'next';
import { BlogListPage } from '@/components/blog/BlogListPage';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — NEZOR Webfejlesztés',
  description: 'Cikkek weboldalról, webshopról, Google és Facebook hirdetésekről magyar kis- és középvállalkozásoknak.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Blog — NEZOR Webfejlesztés',
    description: 'Cikkek weboldalról, webshopról, Google és Facebook hirdetésekről magyar kis- és középvállalkozásoknak.',
    url: 'https://nezor.hu/blog',
  },
};

export default function Page() {
  const posts = getAllPosts();
  return <BlogListPage posts={posts} />;
}
