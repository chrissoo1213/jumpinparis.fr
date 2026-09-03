import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CategoryPage, catalogBySlug, type CategorySlug } from '../../components/catalog-shell'

const categoryMeta: Record<CategorySlug, { title: string; description: string }> = {
  chateaux: {
    title: 'Château gonflable à louer en Île-de-France | Jump’In Paris',
    description:
      'Découvrez nos châteaux gonflables à louer pour anniversaire, événement privé et fête en Île-de-France.',
  },
  'aires-de-jeux': {
    title: 'Aire de jeux à louer en Île-de-France | Jump’In Paris',
    description:
      'Louez une aire de jeux ou un mini parc pour fête, kermesse ou événement familial dans toute l’Île-de-France.',
  },
  jeux: {
    title: 'Jeux d’anniversaire à louer en Île-de-France | Jump’In Paris',
    description:
      'Location de jeux d’anniversaire, bowling arcade et animations pour fêtes, mariages et événements en Île-de-France.',
  },
}

export function generateStaticParams() {
  return Object.keys(catalogBySlug).map((slug) => ({ category: slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const validCategory = category as CategorySlug

  if (!(validCategory in catalogBySlug)) {
    return {}
  }

  const meta = categoryMeta[validCategory]

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${validCategory}`,
    },
    keywords: [
      `${validCategory} location Île-de-France`,
      `location ${validCategory} Paris`,
      `château gonflable ${validCategory}`,
    ],
  }
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const validCategory = category as CategorySlug

  if (!(validCategory in catalogBySlug)) {
    notFound()
  }

  return <CategoryPage slug={validCategory} />
}
