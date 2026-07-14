import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  content: string;
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const [, frontmatter, body] = match;
  const data: Record<string, string> = {};
  for (const line of frontmatter.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: body.trim() };
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '');
}

function loadAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { data, body } = parseFrontmatter(raw);
    return {
      slug: slugFromFilename(file),
      title: data.title ?? slugFromFilename(file),
      description: data.description ?? '',
      date: data.date ?? '2026-01-01',
      keywords: data.keywords ? data.keywords.split(',').map((k) => k.trim()) : [],
      content: body,
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPosts(): BlogPost[] {
  return loadAllPosts();
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return loadAllPosts().find((p) => p.slug === slug);
}

/**
 * Minimal markdown → HTML. Supports headings (##/###), bold, links,
 * unordered lists and paragraphs — enough for blog post bodies without
 * pulling in a markdown dependency.
 */
export function renderMarkdown(md: string): string {
  const inline = (text: string) =>
    text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

  const lines = md.split('\n');
  const html: string[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length) {
      html.push(`<ul>${listBuffer.map((item) => `<li>${inline(item)}</li>`).join('')}</ul>`);
      listBuffer = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }
    if (trimmed.startsWith('### ')) {
      flushList();
      html.push(`<h3>${inline(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith('## ')) {
      flushList();
      html.push(`<h2>${inline(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith('- ')) {
      listBuffer.push(trimmed.slice(2));
    } else {
      flushList();
      html.push(`<p>${inline(trimmed)}</p>`);
    }
  }
  flushList();
  return html.join('\n');
}

export function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
