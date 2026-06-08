import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/nezor-utmutato', '/landing'],
      },
      // AI-asszisztensek (ChatGPT, Claude, Perplexity stb.) crawlerei számára
      // engedjük a /landing és /nezor-utmutato olvasását is — a search engine
      // indexelést tiltjuk (lásd fent), de az AI-knak hasznos idézhető tartalom
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://nezor.hu/sitemap.xml',
  };
}
