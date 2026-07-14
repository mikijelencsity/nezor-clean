import { MetadataRoute } from 'next';
import { cities } from '@/lib/cities';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nezor.hu';
  const services = ['weboldal-keszites', 'webshop-keszites', 'facebook-hirdetes', 'google-hirdetes'];

  const cityUrls: MetadataRoute.Sitemap = services.flatMap((service) =>
    cities.map((city) => ({
      url: `${base}/${service}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/varosok`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/adatkezeles`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...cityUrls,
  ];
}
