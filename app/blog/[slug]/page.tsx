import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostPage } from '@/components/blog/BlogPostPage';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — NEZOR Blog`,
    description: post.description,
    robots: { index: true, follow: true },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://nezor.hu/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'NEZOR Webfejlesztés' },
    publisher: { '@type': 'Organization', name: 'NEZOR Webfejlesztés' },
    mainEntityOfPage: `https://nezor.hu/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostPage post={post} />
    </>
  );
}
