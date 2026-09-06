export type BuilderFloorPattern = {
  id: string
  label: string
  background: string
  previewImage: string
  tilePalette: string[]
  rows: number
  columns: number
}

export type BuilderItem = {
  id: string
  name: string
  image: string
  width: number
  height: number
  category: 'jeu' | 'structure' | 'obstacle'
}

export const FLOOR_TILE_PALETTES = {
  colorful: ['#ffd95a', '#ff7bb5', '#4ec2ff', '#7fe3a5', '#ff6f61', '#ffbd59', '#76c9ff', '#9ae6aa'],
  light: ['#f9fbff', '#dfeaf3'],
} as const

export const floorPatterns: BuilderFloorPattern[] = [
  {
    id: 'colorful-checker',
    label: 'Motif coloré',
    background:
      'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%), linear-gradient(90deg, #ffb3c7 0 50%, #ffd166 50% 100%), linear-gradient(90deg, #8ecae6 0 50%, #90be6d 50% 100%)',
    previewImage: '/images/aire-builder/floor-colorful-checker.svg',
    tilePalette: FLOOR_TILE_PALETTES.colorful,
    rows: 6,
    columns: 10,
  },
  {
    id: 'light-checker',
    label: 'Blanc / gris',
    background:
      'linear-gradient(90deg, #f8fafc 0%, #edf2f7 100%), repeating-linear-gradient(90deg, #e2e8f0 0, #e2e8f0 24px, #f8fafc 24px, #f8fafc 48px), repeating-linear-gradient(0deg, #e2e8f0 0, #e2e8f0 24px, #f8fafc 24px, #f8fafc 48px)',
    previewImage: '/images/aire-builder/floor-light-checker.svg',
    tilePalette: FLOOR_TILE_PALETTES.light,
    rows: 6,
    columns: 10,
  },
]

export const builderItems: BuilderItem[] = [
  {
    id: 'piscine-a-balles',
    name: 'Piscine à balles',
    image: '/images/aire-builder/piscine-a-balles-toboggan.png',
    width: 200,
    height: 200,
    category: 'jeu',
  },
  {
    id: 'toboggan',
    name: 'Toboggan',
    image: '/images/aire-builder/piscine-a-balles-toboggan.png',
    width: 180,
    height: 150,
    category: 'structure',
  },
  {
    id: 'chateau-gonflable',
    name: 'Château gonflable',
    image: '/images/aire-builder/chateau-gonflable.png',
    width: 220,
    height: 160,
    category: 'structure',
  },
  {
    id: 'dinos',
    name: 'Dinos',
    image: '/images/aire-builder/dinos.png',
    width: 160,
    height: 160,
    category: 'obstacle',
  },
  {
    id: 'green-see-saw',
    name: 'Green see-saw',
    image: '/images/aire-builder/green-see-saw.png',
    width: 170,
    height: 170,
    category: 'jeu',
  },
]
