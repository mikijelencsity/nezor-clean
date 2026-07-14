import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cities, getCityBySlug } from '@/lib/cities';
import { CityServicePage } from '@/components/city/CityServicePage';

export async function generateStaticParams() {
  return cities.map((city) => ({ varos: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ varos: string }> }): Promise<Metadata> {
  const { varos } = await params;
  const city = getCityBySlug(varos);
  if (!city) return {};
  return {
    title: `Weboldal készítés ${city.name} — NEZOR`,
    description: `Professzionális weboldal készítés ${city.inCity}. Gyors, mobilbarát, SEO-optimalizált weboldalak kis- és középvállalkozásoknak. Ingyenes ajánlat!`,
    openGraph: {
      title: `Weboldal készítés ${city.name} — NEZOR`,
      description: `Professzionális weboldal készítés ${city.inCity}. Ingyenes ajánlat!`,
      url: `https://nezor.hu/weboldal-keszites/${city.slug}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ varos: string }> }) {
  const { varos } = await params;
  const city = getCityBySlug(varos);
  if (!city) notFound();
  return <CityServicePage city={city} service="weboldal" />;
}
