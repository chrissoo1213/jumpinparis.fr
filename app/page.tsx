import type { Metadata } from 'next'
import { HomeCatalogPage } from '../components/catalog-shell'

export const metadata: Metadata = {
  title: 'Location de château gonflable en Île-de-France | Jump’In Paris',
  description:
    'Jump’In Paris loue des châteaux gonflables, aires de jeux et jeux d’anniversaire pour anniversaires, fêtes scolaires et événements en Île-de-France.',
  alternates: {
    canonical: '/',
  },
  keywords: [
    'château gonflable Île-de-France',
    'location château gonflable Paris',
    'aire de jeux location',
    'anniversaire enfant Île-de-France',
    'location jeux gonflables',
  ],
  openGraph: {
    title: 'Location de château gonflable en Île-de-France | Jump’In Paris',
    description:
      'Des châteaux gonflables, aires de jeux et animations pour fêtes, kermesses et anniversaires en Île-de-France.',
    url: 'https://jumpinparis.fr/',
    siteName: 'Jump’In Paris',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function Page() {
  return <HomeCatalogPage />
}
