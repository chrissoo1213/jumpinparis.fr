import { notFound } from 'next/navigation'
import { CategoryPage, catalogBySlug, type CategorySlug } from '../../components/catalog-shell'

export function generateStaticParams() {
  return Object.keys(catalogBySlug).map((slug) => ({ category: slug }))
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const validCategory = category as CategorySlug

  if (!(validCategory in catalogBySlug)) {
    notFound()
  }

  return <CategoryPage slug={validCategory} />
}
