import type { Metadata } from 'next'
import { CategoryPage } from '../../components/catalog-shell'

export const metadata: Metadata = {
  title: 'Jeux d’anniversaire & animations à louer en Île-de-France | Jump’In Paris',
  description:
    'Louez des jeux d’anniversaire, bowling arcade, piscine à balles et animations pour mariage, kermesse et événements en Île-de-France.',
  alternates: {
    canonical: '/jeux',
  },
  keywords: [
    'jeux d’anniversaire location Île-de-France',
    'animation fête enfant Paris',
    'location bowling arcade',
    'jeux de fête en location',
  ],
}

export default function Page() {
  return <CategoryPage slug="jeux" />
}
