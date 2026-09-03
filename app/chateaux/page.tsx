import type { Metadata } from 'next'
import { CategoryPage } from '../../components/catalog-shell'

export const metadata: Metadata = {
  title: 'Location château gonflable à louer en Île-de-France | Jump’In Paris',
  description:
    'Louez un château gonflable sur mesure pour anniversaire, fête de quartier, kermesse ou événement en Île-de-France.',
  alternates: {
    canonical: '/chateaux',
  },
  keywords: [
    'location château gonflable Île-de-France',
    'château gonflable pour anniversaire',
    'location château gonflable Paris',
    'fête enfant Île-de-France',
  ],
}

export default function Page() {
  return <CategoryPage slug="chateaux" />
}
