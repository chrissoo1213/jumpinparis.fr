'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useMemo, useState } from 'react'

export type Product = {
  id: string
  name: string
  price: number
  image?: string
  dimensions?: string
  tag?: string
  description: string
  ageRange: string
  indoorOutdoor: string
  eventTypes: string[]
}

export type CategorySlug = 'chateaux' | 'aires-de-jeux' | 'jeux'

type CategoryConfig = {
  slug: CategorySlug
  title: string
  eyebrow: string
  description: string
  products: Product[]
}

const castles: Product[] = [
  {
    id: 'fee',
    name: 'Château Fée',
    price: 60,
    dimensions: '2,4 × 2,1 × 2 m',
    image: '/images/chateau-fee.webp',
    description: 'Le château gonflable Fée est idéal pour les anniversaires, baby-showers et fêtes en jardin avec des enfants de 3 à 10 ans.',
    ageRange: '3 à 10 ans',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['anniversaire', 'baby shower', 'fête privée', 'kermesse'],
  },
  {
    id: 'fort',
    name: 'Château Fort',
    price: 70,
    dimensions: '2,8 × 2,6 × 2,1 m',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chateau-fort-QWNaYbO8E2jJl893eQm2ZAEWaD3CQZ.webp',
    description: 'Le Château Fort est parfait pour un anniversaire sur mesure ou une animation en plein air, avec un espace généreux pour jouer en famille.',
    ageRange: '4 à 12 ans',
    indoorOutdoor: 'Usage extérieur privilégié',
    eventTypes: ['anniversaire', 'fête de quartier', 'kermesse', 'événement extérieur'],
  },
  {
    id: 'licorne',
    name: 'Château Licorne',
    price: 70,
    dimensions: '3,4 × 3,8 × 2,5 m',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chateau-licorne-29WAebFGtVA2l3VZyhE2LV6sGXRX26.webp',
    description: 'Un château gonflable coloré et accueillant pour des fêtes enfantines, des rendez-vous scolaires ou des événements familiaux en Île-de-France.',
    ageRange: '3 à 10 ans',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['anniversaire', 'fête scolaire', 'mariage enfant', 'événement familial'],
  },
  {
    id: 'splash',
    name: 'Château Splash',
    price: 80,
    dimensions: '3,9 × 3 × 2 m',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chateau-splash-BWeML8a60pnAHRk77TYkzPFFbypvoU.webp',
    description: 'Le Château Splash apporte une touche ludique à tous types d’événements extérieurs, des fêtes d’enfants aux animations de village.',
    ageRange: '5 à 12 ans',
    indoorOutdoor: 'Usage extérieur recommandé',
    eventTypes: ['anniversaire', 'collectivité', 'kermesse', 'fête de quartier'],
  },
  {
    id: 'palais',
    name: 'Palais Blanc',
    price: 80,
    dimensions: '2,4 × 2,5 × 2,4 m',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palais-blanc-HiqWTA7whUxtltBKmiPhsMlkmHTr2z.webp',
    description: 'Le Palais Blanc donne un effet premium pour les anniversaires, mariages et soirées thématiques, avec un cadre élégant et rassurant.',
    ageRange: '4 à 12 ans',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['anniversaire', 'mariage', 'soirée privée', 'fête commune'],
  },
  {
    id: 'ninja',
    name: 'Ninja Parc',
    price: 80,
    dimensions: '4,9 × 2,4 × 1,9 m',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ninja-parc-rX8HLbniLrEK9tWeKYqwrj1jmmZMNc.webp',
    description: 'Le Ninja Parc convient aux événements sportifs et aux fêtes dynamiques, avec un format idéal pour les enfants actifs et les groupes.',
    ageRange: '5 à 12 ans',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['anniversaire', 'team building', 'fête d’école', 'animation événementielle'],
  },
  {
    id: 'papou',
    name: 'Papou Pompier',
    price: 80,
    dimensions: '2,7 × 5,6 × 2,1 m',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/papou-pompier-WeQPQBqXUVnBrpdoDKgMrI6u8kaV73.webp',
    description: 'Le Papou Pompier apporte un univers festif et coloré pour les anniversaires, fêtes de quartier et animations municipales.',
    ageRange: '3 à 12 ans',
    indoorOutdoor: 'Usage extérieur idéal',
    eventTypes: ['anniversaire', 'fête de quartier', 'kermesse', 'animation collective'],
  },
  {
    id: 'mega',
    name: 'Mega Parc',
    price: 90,
    dimensions: '3,4 × 4 × 2,6 m',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mega-parc-Y7ilAb6C2XNle4QDFOFReftkc5e4Nu.webp',
    description: 'Le Mega Parc est excellent pour les grands groupes, avec un espace suffisant pour des animations de fête, de kermesse ou de village.',
    ageRange: '5 à 12 ans',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['anniversaire', 'kermesse', 'fête de ville', 'événement de groupe'],
  },
  {
    id: 'bubble',
    name: 'Bubble House XL',
    price: 120,
    dimensions: '4,8 × 3 × 2,2 m',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bubble-house-mpdkAFeRflnrgBeGM2ob0Jx65NU4hi.webp',
    tag: 'Nouveau',
    description: 'Le Bubble House XL offre un format généreux pour les anniversaires, fêtes d’entreprise et événements familiaux qui veulent un espace ludique et mémorable.',
    ageRange: '4 à 12 ans',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['anniversaire', 'fête d’entreprise', 'mariage', 'événement festif'],
  },
]

const parks: Product[] = [
  {
    id: 'mini',
    name: 'Mini Kids Park',
    price: 349,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mini-kids-park-6RoaIiIYQZc6Vo3uAvLb8uwbOUAIYB.webp',
    tag: 'Dès 349 €',
    description: 'L’aire de jeux Mini Kids Park est idéale pour des anniversaires ou des événements familiaux avec un espace compact mais très dynamique.',
    ageRange: '3 à 8 ans',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['anniversaire', 'fête de quartier', 'événement privé', 'kermesse'],
  },
  {
    id: 'maxi',
    name: 'Maxi Kids Park',
    price: 399,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maxi-kids-park-ljpUXbA42akT4DdmnetvmaMssbCsJJ.webp',
    tag: 'Dès 399 €',
    description: 'Le Maxi Kids Park est parfait pour les fêtes plus grandes, avec un environnement ludique adapté aux anniversaires et aux animations de jardin.',
    ageRange: '4 à 10 ans',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['anniversaire', 'jardin d’enfants', 'fête familiale', 'animation extérieure'],
  },
  {
    id: 'royal',
    name: 'Royal Kids Park',
    price: 449,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/royal-kids-park-P5QWMDziwoSo3OqvPxxEcCbCPumxdT.webp',
    tag: 'Dès 449 €',
    description: 'Le Royal Kids Park est une aire de jeux premium pour des événements qui veulent un cadre grandiose et un accueil festif garanti.',
    ageRange: '4 à 12 ans',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['anniversaire', 'mariage', 'fête d’entreprise', 'événement haut de gamme'],
  },
]

const games: Product[] = [
  {
    id: 'tetris',
    name: 'Tetris Tumble',
    price: 45,
    image: '/images/tetris-tumble.webp',
    description: 'Le Tetris Tumble est parfait pour des animations de fête, des concours ludiques et des événements familiaux en intérieur comme en extérieur.',
    ageRange: '3 à 12 ans',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['anniversaire', 'kermesse', 'fête scolaire', 'animation de jardin'],
  },
  {
    id: 'babyfoot',
    name: 'Baby-foot',
    price: 45,
    image: '/images/baby-foot.webp',
    description: 'Une animation simple et universelle pour les mariages, fêtes de quartier et soirées conviviales avec petits et grands.',
    ageRange: 'Tous âges',
    indoorOutdoor: 'Usage intérieur',
    eventTypes: ['mariage', 'soirée', 'fête citoyenne', 'événement privé'],
  },
  {
    id: 'pool',
    name: 'Piscine à balles',
    price: 55,
    image: '/images/piscine-balles.webp',
    description: 'La piscine à balles est une animation très appréciée lors des anniversaires, fêtes de village et événements animés pour enfants.',
    ageRange: '3 à 10 ans',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['anniversaire', 'kermesse', 'fête scolaire', 'animation familiale'],
  },
  {
    id: 'cible',
    name: 'Cible foot géante',
    price: 45,
    image: '/images/cible-foot.webp',
    description: 'Une animation sportive pour les fêtes d’école, anniversaires et événements familiaux qui veulent un moment fun et actif.',
    ageRange: '5 à 12 ans',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['anniversaire', 'fête scolaire', 'animation sportive', 'événement extérieur'],
  },
  {
    id: 'tir',
    name: 'Cible de tir',
    price: 45,
    image: '/images/cible-tir.webp',
    description: 'La cible de tir est idéale pour des animations ludiques et des fêtes de quartier avec un fort potentiel de participation.',
    ageRange: '6 ans et +',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['fête de quartier', 'animation sportive', 'événement public', 'anniversaire'],
  },
  {
    id: 'bowling',
    name: 'Bowling arcade',
    price: 45,
    image: '/images/bowling.webp',
    description: 'Le bowling arcade apporte un univers festif pour les anniversaires, soirées privées et animations d’équipe en Île-de-France.',
    ageRange: '4 ans et +',
    indoorOutdoor: 'Usage intérieur',
    eventTypes: ['anniversaire', 'team building', 'soirée', 'fête privée'],
  },
  {
    id: 'puissance',
    name: 'Puissance 4 géant',
    price: 35,
    image: '/images/puissance-4.webp',
    description: 'Le Puissance 4 géant est parfait pour des soirées conviviales, kermesses et événements familiaux à fort engagement.',
    ageRange: 'Tous âges',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['kermesse', 'fête familiale', 'soirée', 'événement public'],
  },
  {
    id: 'haches',
    name: 'Lancer de haches',
    price: 45,
    image: '/images/lancer-haches.webp',
    description: 'Le lancer de haches est une animation dynamique très appréciée pour les fêtes de quartier, soirées et événements extérieurs.',
    ageRange: '8 ans et +',
    indoorOutdoor: 'Usage extérieur',
    eventTypes: ['fête de quartier', 'soiree', 'événement extérieur', 'animation sportive'],
  },
  {
    id: 'basket',
    name: 'Basket-ball arcade',
    price: 45,
    image: '/images/basket.webp',
    description: 'Le basket-ball arcade est ideal pour les fêtes de quartier, les anniversaires et les animations sportives en plein air.',
    ageRange: '5 ans et +',
    indoorOutdoor: 'Usage intérieur et extérieur',
    eventTypes: ['anniversaire', 'animation sportive', 'fête de quartier', 'événement privé'],
  },
]

export const categoryOrder: CategorySlug[] = ['chateaux', 'aires-de-jeux', 'jeux']

export const catalogBySlug: Record<CategorySlug, CategoryConfig> = {
  chateaux: {
    slug: 'chateaux',
    title: 'Châteaux gonflables',
    eyebrow: 'Le catalogue',
    description: 'Des formats colorés, sécurisés et faciles à installer pour une fête qui marque les esprits.',
    products: castles,
  },
  'aires-de-jeux': {
    slug: 'aires-de-jeux',
    title: 'Aires de jeux',
    eyebrow: 'Les grands formats',
    description: 'Pour les anniversaires, kermesses et événements qui voient grand et veulent de la vraie énergie.',
    products: parks,
  },
  jeux: {
    slug: 'jeux',
    title: 'Jeux intérieurs & extérieurs',
    eyebrow: 'Pour tous les âges',
    description: 'Des animations ludiques qui complètent une fête, un espace événementiel ou un jardin bien rempli.',
    products: games,
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Jump’In Paris',
  description: 'Location de château gonflable, aire de jeux et jeux d’anniversaire en Île-de-France.',
  areaServed: 'Île-de-France',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Île-de-France',
    addressCountry: 'FR',
  },
  priceRange: '€€',
  url: 'https://jumpinparis.fr/',
  telephone: '+33698702341',
}

function ProductJsonLd({ products }: { products: Product[] }) {
  const items = products.map((product) => ({
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    category: product.eventTypes.join(', '),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  }))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': items }),
      }}
    />
  )
}

export function HomeCatalogPage() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [openCart, setOpenCart] = useState(false)

  const allProducts = categoryOrder.flatMap((slug) => catalogBySlug[slug].products)
  const items = allProducts.filter((product) => cart[product.id])
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const total = useMemo(
    () => items.reduce((sum, product) => sum + product.price * (cart[product.id] ?? 0), 0),
    [items, cart],
  )

  const add = (id: string) =>
    setCart((current) => ({ ...current, [id]: 1 }))

  const change = (id: string, amount: number) => {
    if (amount < 0) {
      setCart((current) => {
        const next = { ...current }
        delete next[id]
        return next
      })
      return
    }

    setCart((current) => ({ ...current, [id]: 1 }))
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-primary px-5 py-2 text-center text-xs font-black uppercase tracking-[0.2em] text-primary-foreground">
        Livraison, installation et retrait en Île-de-France
      </div>

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.webp" alt="Jump’In Paris - location de château gonflable en Île-de-France" width={64} height={64} className="-my-2 object-contain" />
            <span className="hidden font-heading text-lg font-black text-primary sm:block">JUMP’IN PARIS</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-bold lg:flex">
            {categoryOrder.map((slug) => (
              <Link key={slug} href={`/${slug}`} className="text-primary transition-opacity hover:opacity-80">
                {catalogBySlug[slug].title}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setOpenCart(true)}
            className="relative flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-black text-accent-foreground shadow-sm"
          >
            <ShoppingBag size={17} />
            <span className="hidden sm:inline">Panier</span>
            {count > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-background text-xs text-primary">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-12 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-5 inline-flex items-center rounded-full bg-secondary/35 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-primary">
              La fête commence ici
            </p>
            <h1 className="font-heading text-5xl font-black leading-[0.98] tracking-tight text-primary sm:text-7xl">
              Châteaux gonflables, aires de jeux et jeux d’anniversaire en Île-de-France
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Location de château gonflable, aire de jeux et animations pour anniversaires, fêtes scolaires, kermesses et événements en Île-de-France.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/chateaux" className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-sm font-black text-secondary-foreground shadow-lg">
                Voir les structures <ArrowRight size={17} />
              </Link>
              <a href="#catalogue" className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-6 py-3.5 text-sm font-bold text-primary">
                Explorer les catégories
              </a>
            </div>
          </div>

          <div className="relative min-h-[340px] lg:min-h-[500px]">
            <div className="absolute inset-8 rounded-[3rem] bg-secondary/25 rotate-3" />
            <Image
              src={parks[2].image!}
              alt="Aire de jeux Royal Kids Park à louer pour anniversaire en Île-de-France"
              fill
              priority
              className="relative object-contain drop-shadow-2xl"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <span className="absolute bottom-3 right-3 rounded-full bg-accent px-4 py-2 text-sm font-black text-accent-foreground shadow-lg">
              Des souvenirs XXL
            </span>
          </div>
        </div>
      </section>

      <div id="catalogue" className="mx-auto max-w-7xl space-y-14 px-5 pb-20 lg:px-8">
        {categoryOrder.map((slug) => (
          <CategoryStrip
            key={slug}
            category={catalogBySlug[slug]}
            onAdd={add}
            onViewMore={`/${slug}`}
          />
        ))}

        <div className="rounded-[2rem] border border-border bg-card p-5 shadow-sm lg:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Créer votre espace</p>
              <h3 className="mt-2 font-heading text-3xl font-black text-primary">Designer votre aire de jeux</h3>
            </div>
            <Link
              href="/aire-de-jeux-builder"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-black text-secondary-foreground shadow-sm"
            >
              Ouvrir l’outil <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} items={items} cart={cart} total={total} onChange={change} />
    </main>
  )
}

export function CategoryPage({ slug }: { slug: CategorySlug }) {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [openCart, setOpenCart] = useState(false)
  const category = catalogBySlug[slug]

  const allProducts = categoryOrder.flatMap((key) => catalogBySlug[key].products)
  const items = allProducts.filter((product) => cart[product.id])
  const total = useMemo(
    () => items.reduce((sum, product) => sum + product.price * (cart[product.id] ?? 0), 0),
    [items, cart],
  )

  const add = (id: string) =>
    setCart((current) => ({ ...current, [id]: 1 }))

  const change = (id: string, amount: number) => {
    if (amount < 0) {
      setCart((current) => {
        const next = { ...current }
        delete next[id]
        return next
      })
      return
    }

    setCart((current) => ({ ...current, [id]: 1 }))
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ProductJsonLd products={category.products} />
      <div className="bg-primary px-5 py-2 text-center text-xs font-black uppercase tracking-[0.2em] text-primary-foreground">
        Livraison, installation et retrait en Île-de-France
      </div>

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-bold text-primary">
              <ArrowLeft size={16} />
              Accueil
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.webp" alt="Jump’In Paris" width={54} height={54} className="object-contain" />
            </Link>
          </div>

          <button
            onClick={() => setOpenCart(true)}
            className="relative flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-black text-accent-foreground shadow-sm"
          >
            <ShoppingBag size={17} />
            <span className="hidden sm:inline">Panier</span>
            {items.length > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-background text-xs text-primary">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">{category.eyebrow}</p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-heading text-4xl font-black text-primary sm:text-6xl">
              {category.title} à louer en Île-de-France
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{category.description}</p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-black text-secondary-foreground">
            Découvrir toute la boutique <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={add} className="w-full" />
          ))}
        </div>
      </section>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} items={items} cart={cart} total={total} onChange={change} />
    </main>
  )
}

type CategoryStripProps = {
  category: CategoryConfig
  onAdd: (id: string) => void
  onViewMore: string
}

function CategoryStrip({ category, onAdd, onViewMore }: CategoryStripProps) {
  return (
    <section className="rounded-[2rem] border border-border bg-muted/30 p-5 shadow-sm lg:p-6">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">{category.eyebrow}</p>
          <h2 className="mt-2 font-heading text-3xl font-black text-primary sm:text-4xl">{category.title}</h2>
        </div>
        <Link href={onViewMore.trim()} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-2 text-sm font-bold text-primary">
          Voir la collection <ArrowRight size={16} />
        </Link>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-2">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} className="min-w-[260px] max-w-[300px] flex-1" />
        ))}
      </div>
    </section>
  )
}

function ProductCard({
  product,
  onAdd,
  className = '',
}: {
  product: Product
  onAdd: (id: string) => void
  className?: string
}) {
  return (
    <article className={`group overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${className}`}>
      <div className="relative aspect-[1.15] bg-muted/50">
        <Image
          src={product.image!}
          alt={`${product.name} à louer pour ${product.eventTypes[0]} en Île-de-France`}
          fill
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 80vw, 25vw"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-black text-secondary-foreground">
            {product.tag}
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-black text-primary">{product.name}</h3>
            {product.dimensions && <p className="mt-1 text-xs text-muted-foreground">{product.dimensions}</p>}
          </div>
          <p className="whitespace-nowrap font-heading text-2xl font-black text-primary">{product.price} €</p>
        </div>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.1em] text-primary">{product.ageRange}</p>

        <button
          onClick={() => onAdd(product.id)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-accent"
        >
          Ajouter au panier <Plus size={16} />
        </button>
      </div>
    </article>
  )
}

function CartDrawer({
  open,
  onClose,
  items,
  cart,
  total,
  onChange,
}: {
  open: boolean
  onClose: () => void
  items: Product[]
  cart: Record<string, number>
  total: number
  onChange: (id: string, amount: number) => void
}) {
  const [selectedDate, setSelectedDate] = useState('')
  const [deliveryOption, setDeliveryOption] = useState('')

  if (!open) return null

  const displayDate = selectedDate
    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : 'XX/XX/XXXX'

  const whatsappHref = selectedDate && deliveryOption
    ? `https://wa.me/33698702341?text=${encodeURIComponent(`Bonjour Jump’In Paris ! Je souhaite réserver :\n${items.map((product) => `• ${product.name} — ${product.price} €`).join('\n')}\n\nTotal estimatif : ${total} €\nHors frais de livraison + installation\nOption : ${deliveryOption}\nPour le ${displayDate}\nPouvez-vous me confirmer les disponibilités ?`)} `
    : '#'

  return (
    <div className="fixed inset-0 z-50 bg-primary/40" onClick={onClose}>
      <aside onClick={(event) => event.stopPropagation()} className="ml-auto flex h-full w-full max-w-md flex-col bg-background p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Votre sélection</p>
            <h2 className="font-heading text-2xl font-black text-primary">Mon panier</h2>
          </div>
          <button aria-label="Fermer le panier" onClick={onClose} className="rounded-full border border-border p-2">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center text-center text-muted-foreground">
              <div>
                <ShoppingBag className="mx-auto" />
                <p className="mt-3 font-bold text-primary">Votre panier est vide</p>
                <p className="mt-1 text-sm text-muted-foreground">Ajoutez une structure pour commencer.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((product) => (
                <div key={product.id} className="flex items-start gap-3 rounded-2xl border border-border bg-muted/30 p-3">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-background">
                    <Image src={product.image!} alt={`${product.name} à louer pour événement en Île-de-France`} fill className="object-contain" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-primary">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.price} €</p>
                  </div>

                  <button
                    aria-label={`Retirer ${product.name}`}
                    onClick={() => onChange(product.id, -1)}
                    className="ml-auto grid size-8 shrink-0 place-items-center rounded-full border border-border bg-background"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border pt-5">
            <div className="mb-2 flex items-center justify-between font-heading text-xl font-black text-primary">
              <span>Total estimatif</span>
              <span>{total} €</span>
            </div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Hors frais de livraison + installation
            </p>

            <div className="mb-4">
              <p className="mb-2 text-sm font-bold text-primary">Option</p>
              <div className="space-y-2">
                {[
                  'En Option Retrait depuis Carrières-sur-seine(78)',
                  'Avec Livraison + Installation',
                  'À discuter selon le prix',
                ].map((option) => (
                  <label key={option} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-muted/30 px-3 py-2 text-sm text-foreground">
                    <input
                      type="radio"
                      name="delivery-option"
                      value={option}
                      checked={deliveryOption === option}
                      onChange={(event) => setDeliveryOption(event.target.value)}
                      className="mt-0.5 h-4 w-4 accent-primary"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="mb-4 block text-sm font-bold text-primary">
              Date de réservation
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="mt-2 block w-full rounded-full border border-border bg-background px-4 py-3 text-sm text-foreground"
                required
              />
            </label>

            <a
              href={whatsappHref}
              onClick={(event) => {
                if (!selectedDate || !deliveryOption) {
                  event.preventDefault()
                }
              }}
              target={selectedDate && deliveryOption ? '_blank' : undefined}
              rel={selectedDate && deliveryOption ? 'noreferrer' : undefined}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-black transition ${selectedDate && deliveryOption ? 'bg-primary text-primary-foreground' : 'cursor-not-allowed bg-muted text-muted-foreground'}`}
              aria-disabled={!selectedDate || !deliveryOption}
            >
              Réserver par WhatsApp <ArrowRight size={17} />
            </a>
          </div>
        )}
      </aside>
    </div>
  )
}
