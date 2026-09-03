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
  { id: 'fee', name: 'Château Fée', price: 60, dimensions: '2,4 × 2,1 × 2 m', image: '/images/chateau-fee.webp' },
  { id: 'fort', name: 'Château Fort', price: 70, dimensions: '2,8 × 2,6 × 2,1 m', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chateau-fort-QWNaYbO8E2jJl893eQm2ZAEWaD3CQZ.webp' },
  { id: 'licorne', name: 'Château Licorne', price: 70, dimensions: '3,4 × 3,8 × 2,5 m', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chateau-licorne-29WAebFGtVA2l3VZyhE2LV6sGXRX26.webp' },
  { id: 'splash', name: 'Château Splash', price: 80, dimensions: '3,9 × 3 × 2 m', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chateau-splash-BWeML8a60pnAHRk77TYkzPFFbypvoU.webp' },
  { id: 'palais', name: 'Palais Blanc', price: 80, dimensions: '2,4 × 2,5 × 2,4 m', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palais-blanc-HiqWTA7whUxtltBKmiPhsMlkmHTr2z.webp' },
  { id: 'ninja', name: 'Ninja Parc', price: 80, dimensions: '4,9 × 2,4 × 1,9 m', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ninja-parc-rX8HLbniLrEK9tWeKYqwrj1jmmZMNc.webp' },
  { id: 'papou', name: 'Papou Pompier', price: 80, dimensions: '2,7 × 5,6 × 2,1 m', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/papou-pompier-WeQPQBqXUVnBrpdoDKgMrI6u8kaV73.webp' },
  { id: 'mega', name: 'Mega Parc', price: 90, dimensions: '3,4 × 4 × 2,6 m', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mega-parc-Y7ilAb6C2XNle4QDFOFReftkc5e4Nu.webp' },
  { id: 'bubble', name: 'Bubble House XL', price: 120, dimensions: '4,8 × 3 × 2,2 m', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bubble-house-mpdkAFeRflnrgBeGM2ob0Jx65NU4hi.webp', tag: 'Nouveau' },
]

const parks: Product[] = [
  { id: 'mini', name: 'Mini Kids Park', price: 349, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mini-kids-park-6RoaIiIYQZc6Vo3uAvLb8uwbOUAIYB.webp', tag: 'Dès 349 €' },
  { id: 'maxi', name: 'Maxi Kids Park', price: 399, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maxi-kids-park-ljpUXbA42akT4DdmnetvmaMssbCsJJ.webp', tag: 'Dès 399 €' },
  { id: 'royal', name: 'Royal Kids Park', price: 449, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/royal-kids-park-P5QWMDziwoSo3OqvPxxEcCbCPumxdT.webp', tag: 'Dès 449 €' },
]

const games: Product[] = [
  { id: 'tetris', name: 'Tetris Tumble', price: 45, image: '/images/tetris-tumble.webp' },
  { id: 'babyfoot', name: 'Baby-foot', price: 45, image: '/images/baby-foot.webp' },
  { id: 'pool', name: 'Piscine à balles', price: 55, image: '/images/piscine-balles.webp' },
  { id: 'cible', name: 'Cible foot géante', price: 45, image: '/images/cible-foot.webp' },
  { id: 'tir', name: 'Cible de tir', price: 45, image: '/images/cible-tir.webp' },
  { id: 'bowling', name: 'Bowling arcade', price: 45, image: '/images/bowling.webp' },
  { id: 'puissance', name: 'Puissance 4 géant', price: 35, image: '/images/puissance-4.webp' },
  { id: 'haches', name: 'Lancer de haches', price: 45, image: '/images/lancer-haches.webp' },
  { id: 'basket', name: 'Basket-ball arcade', price: 45, image: '/images/basket.webp' },
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
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }))

  const change = (id: string, amount: number) =>
    setCart((current) => ({ ...current, [id]: Math.max(0, (current[id] ?? 0) + amount) }))

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-primary px-5 py-2 text-center text-xs font-black uppercase tracking-[0.2em] text-primary-foreground">
        Livraison, installation et retrait en Île-de-France
      </div>

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.webp" alt="Jump’In Paris" width={64} height={64} className="-my-2 object-contain" />
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
              Louez le <span className="text-accent">waouh.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Châteaux gonflables, aires de jeux et animations pour des anniversaires qui restent en mémoire.
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
              alt="Royal Kids Park"
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
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }))

  const change = (id: string, amount: number) =>
    setCart((current) => ({ ...current, [id]: Math.max(0, (current[id] ?? 0) + amount) }))

  return (
    <main className="min-h-screen bg-background text-foreground">
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
            <h1 className="font-heading text-4xl font-black text-primary sm:text-6xl">{category.title}</h1>
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
          alt={`${product.name} à louer en Île-de-France`}
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

  if (!open) return null

  const displayDate = selectedDate
    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : 'XX/XX/XXXX'

  const whatsappHref = selectedDate
    ? `https://wa.me/33698702341?text=${encodeURIComponent(`Bonjour Jump’In Paris ! Je souhaite réserver :\n${items.map((product) => `• ${product.name} x${cart[product.id]} — ${product.price * (cart[product.id] ?? 0)} €`).join('\n')}\n\nTotal estimatif : ${total} €\nPour le ${displayDate}\nPouvez-vous me confirmer les disponibilités ?`)}`
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
                <div key={product.id} className="flex gap-3 rounded-2xl border border-border bg-muted/30 p-3">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-background">
                    <Image src={product.image!} alt={product.name} fill className="object-contain" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-primary">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.price} €</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => onChange(product.id, -1)} className="grid size-7 place-items-center rounded-full border border-border">
                        <Minus size={13} />
                      </button>
                      <span className="w-4 text-center text-sm font-bold">{cart[product.id]}</span>
                      <button onClick={() => onChange(product.id, 1)} className="grid size-7 place-items-center rounded-full border border-border">
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border pt-5">
            <div className="mb-4 flex items-center justify-between font-heading text-xl font-black text-primary">
              <span>Total estimatif</span>
              <span>{total} €</span>
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
                if (!selectedDate) {
                  event.preventDefault()
                }
              }}
              target={selectedDate ? '_blank' : undefined}
              rel={selectedDate ? 'noreferrer' : undefined}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-black transition ${selectedDate ? 'bg-primary text-primary-foreground' : 'cursor-not-allowed bg-muted text-muted-foreground'}`}
              aria-disabled={!selectedDate}
            >
              Réserver par WhatsApp <ArrowRight size={17} />
            </a>
          </div>
        )}
      </aside>
    </div>
  )
}
