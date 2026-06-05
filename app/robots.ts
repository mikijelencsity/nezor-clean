import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/nezor-utmutato'],
      },
    ],
    sitemap: 'https://nezor.hu/sitemap.xml',
  };
}
