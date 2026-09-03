import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-body' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })

export const metadata: Metadata = {
  metadataBase: new URL('https://jumpinparis.fr'),
  title: {
    default: 'Jump’In Paris | Location de château gonflable en Île-de-France',
    template: '%s | Jump’In Paris',
  },
  description:
    'Jump’In Paris loue des châteaux gonflables, aires de jeux et animations pour anniversaires, fêtes de quartier et événements en Île-de-France.',
  generator: 'Jump’In Paris',
  keywords: [
    'location château gonflable Île-de-France',
    'château gonflable Paris',
    'location aire de jeux',
    'anniversaire enfant Île-de-France',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#17356e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className={`${geist.variable} ${plusJakarta.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
