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
    title: `Webshop készítés ${city.name} — NEZOR`,
    description: `Professzionális webshop készítés ${city.inCity}. Online áruház fizetési rendszerrel, rendeléskezelővel és automatikus számlázással. Ingyenes ajánlat!`,
    openGraph: {
      title: `Webshop készítés ${city.name} — NEZOR`,
      description: `Professzionális webshop készítés ${city.inCity}. Ingyenes ajánlat!`,
      url: `https://nezor.hu/webshop-keszites/${city.slug}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ varos: string }> }) {
  const { varos } = await params;
  const city = getCityBySlug(varos);
  if (!city) notFound();
  return <CityServicePage city={city} service="webshop" />;
}
