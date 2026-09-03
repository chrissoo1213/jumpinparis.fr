import type { Metadata } from 'next'
import { CategoryPage } from '../../components/catalog-shell'

export const metadata: Metadata = {
  title: 'Location aire de jeux en Île-de-France | Jump’In Paris',
  description:
    'Louez une aire de jeux ou mini parc pour anniversaire, kermesse et fête familiale en Île-de-France avec installation incluse.',
  alternates: {
    canonical: '/aires-de-jeux',
  },
  keywords: [
    'aire de jeux location Île-de-France',
    'mini parc pour anniversaire',
    'location aire de jeux Paris',
    'aire de jeux événement',
  ],
}

export default function Page() {
  return <CategoryPage slug="aires-de-jeux" />
}
