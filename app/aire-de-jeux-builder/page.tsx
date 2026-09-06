'use client'

import Image from 'next/image'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { useMemo, useRef, useState } from 'react'
import { builderItems, floorPatterns, type BuilderItem } from '../../lib/aire-builder-data'

type PlacedItem = BuilderItem & {
  instanceId: string
  x: number
  y: number
}

const CANVAS_WIDTH = 880
const CANVAS_HEIGHT = 560
const FLOOR_COLS = 10
const FLOOR_ROWS = 6
const FLOOR_TILE_SIZE = 62
// Gentle tilt, large perspective distance = minimal taper (closer to your reference photo)
const FLOOR_TILT_X = 50
const FLOOR_PERSPECTIVE = 2400
// Purely visual squish applied to each item so it "sits" on the tilted floor.
// This does NOT affect position/pointer math — transform never moves the box, only how it's drawn.
const ITEM_VISUAL_SQUASH = 0.86

const getFloorTileColor = (patternId: string, row: number, col: number) => {
  const pattern = floorPatterns.find((item) => item.id === patternId) ?? floorPatterns[0]

  if (pattern.id === 'light-checker') {
    return (row + col) % 2 === 0 ? '#f9fbff' : '#dfeaf3'
  }

  const palette = pattern.tilePalette
  const hash = Math.sin((row + 1) * 12.9898 + (col + 1) * 78.233) * 43758.5453
  const index = Math.abs(Math.floor(hash)) % palette.length

  return palette[index]
}

const getFloorTiles = (patternId: string) =>
  Array.from({ length: FLOOR_ROWS * FLOOR_COLS }, (_, index) => {
    const row = Math.floor(index / FLOOR_COLS)
    const col = index % FLOOR_COLS

    return {
      id: `${patternId}-${row}-${col}`,
      color: getFloorTileColor(patternId, row, col),
    }
  })

export default function AireDeJeuxBuilderPage() {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const [selectedPatternId, setSelectedPatternId] = useState(floorPatterns[0].id)
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([])
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const activePattern = useMemo(
    () => floorPatterns.find((pattern) => pattern.id === selectedPatternId) ?? floorPatterns[0],
    [selectedPatternId],
  )

  const floorTiles = useMemo(() => getFloorTiles(activePattern.id), [activePattern.id])

  // One of each item only
  const placedIds = useMemo(() => new Set(placedItems.map((item) => item.id)), [placedItems])

  const addItemToCanvas = (item: BuilderItem) => {
    if (placedIds.has(item.id)) return // already on the canvas — ignore click

    setPlacedItems((current) => [
      ...current,
      {
        ...item,
        instanceId: `${item.id}-${Date.now()}`,
        x: 90 + (current.length % 4) * 40,
        y: 90 + (current.length % 3) * 40,
      },
    ])
  }

  const removeItemFromCanvas = (instanceId: string) => {
    setPlacedItems((current) => current.filter((item) => item.instanceId !== instanceId))
    setDraggingId(null)
  }

  // Flat, 1:1 mapping — canvas rect to pointer, no divisors, no transform correction needed
  const getPointerInCanvas = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return { x: 0, y: 0 }
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>, item: PlacedItem) => {
    const pointer = getPointerInCanvas(event)
    setDraggingId(item.instanceId)
    setDragOffset({ x: pointer.x - item.x, y: pointer.y - item.y })
    ;(event.target as HTMLElement).setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingId) return
    const pointer = getPointerInCanvas(event)

    setPlacedItems((current) =>
      current.map((item) => {
        if (item.instanceId !== draggingId) return item
        const nextX = Math.min(Math.max(pointer.x - dragOffset.x, 0), CANVAS_WIDTH - item.width)
        const nextY = Math.min(Math.max(pointer.y - dragOffset.y, 0), CANVAS_HEIGHT - item.height)
        return { ...item, x: nextX, y: nextY }
      }),
    )
  }

  const handlePointerUp = () => setDraggingId(null)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <header className="mb-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-accent">Outil de conception</p>
          <h1 className="font-heading text-4xl font-black text-primary sm:text-5xl">
            Aire de jeux personnalisée en Île-de-France
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            Concevez votre espace de jeux en choisissant un sol, puis en déposant vos modules et structures sur la zone de travail.
          </p>
        </header>

        <div className="grid gap-8 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="space-y-6 rounded-[2rem] border border-border bg-card p-5 shadow-sm">
            <div>
              <h2 className="font-heading text-2xl font-black text-primary">Motif du sol</h2>
              <div className="mt-4 space-y-3">
                {floorPatterns.map((pattern) => {
                  const isSelected = pattern.id === selectedPatternId
                  return (
                    <button
                      key={pattern.id}
                      type="button"
                      onClick={() => setSelectedPatternId(pattern.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-2 text-left transition ${
                        isSelected ? 'border-primary bg-primary/5 shadow-sm' : 'border-border bg-background hover:border-primary/40'
                      }`}
                    >
                      <div className="relative size-16 overflow-hidden rounded-xl border border-border bg-white">
                        <Image src={pattern.previewImage} alt={pattern.label} fill className="object-cover" sizes="64px" />
                      </div>
                      <span className="text-sm font-bold text-primary">{pattern.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-black text-primary">Palette d'éléments</h2>
              <div className="mt-4 space-y-3">
                {builderItems.map((item) => {
                  const isPlaced = placedIds.has(item.id)
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => addItemToCanvas(item)}
                      disabled={isPlaced}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-2 text-left transition ${
                        isPlaced
                          ? 'cursor-not-allowed border-border bg-muted/40 opacity-50'
                          : 'border-border bg-background hover:border-primary/50 hover:bg-muted/30'
                      }`}
                    >
                      <div className="relative size-16 overflow-hidden rounded-xl border border-border bg-white">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" sizes="64px" />
                      </div>
                      <span className="text-sm font-bold text-primary">
                        {item.name}
                        {isPlaced && ' ✓'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-border bg-card p-4 shadow-sm lg:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Plan de travail</p>
                <h2 className="mt-1 font-heading text-2xl font-black text-primary">Zone de création</h2>
              </div>
              <button
                type="button"
                onClick={() => setPlacedItems([])}
                className="rounded-full border border-border bg-background px-3 py-2 text-sm font-bold text-primary"
              >
                Réinitialiser
              </button>
            </div>

            <div
              ref={canvasRef}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="relative overflow-hidden rounded-[1.75rem] border border-border"
              style={{
                width: '100%',
                height: CANVAS_HEIGHT,
                background: 'radial-gradient(circle at top, rgba(255,255,255,0.9), rgba(237,242,247,1) 55%)',
              }}
            >
              {/* Decorative floor — no pointer events, so it never interferes with dragging */}
              <div
                className="absolute left-1/2 top-1/2"
                style={{
                  width: FLOOR_COLS * FLOOR_TILE_SIZE,
                  height: FLOOR_ROWS * FLOOR_TILE_SIZE,
                  transform: `translate(-50%, -50%) perspective(${FLOOR_PERSPECTIVE}px) rotateX(${FLOOR_TILT_X}deg)`,
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 42px 60px rgba(15, 23, 42, 0.18)',
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${FLOOR_COLS}, minmax(0, 1fr))`,
                    width: '100%',
                    height: '100%',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    border: '2px solid rgba(255,255,255,0.6)',
                    background: '#f9fafb',
                  }}
                >
                  {floorTiles.map((tile) => (
                    <div
                      key={tile.id}
                      style={{
                        background: tile.color,
                        border: '1px solid rgba(255,255,255,0.35)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Flat, untransformed items layer — pointer coordinates match 1:1, no jank */}
              {placedItems.map((item) => (
                <div
                  key={item.instanceId}
                  onPointerDown={(event) => handlePointerDown(event, item)}
                  onDoubleClick={() => removeItemFromCanvas(item.instanceId)}
                  style={{
                    position: 'absolute',
                    left: item.x,
                    top: item.y,
                    width: item.width,
                    height: item.height,
                    cursor: draggingId === item.instanceId ? 'grabbing' : 'grab',
                    touchAction: 'none',
                  } as CSSProperties}
                  className="select-none"
                >
                  <div
                    className="relative h-full w-full"
                    style={{
                      transform: `scaleY(${ITEM_VISUAL_SQUASH})`,
                      filter: 'drop-shadow(0 14px 14px rgba(15, 23, 42, 0.25))',
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-contain"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}

              {placedItems.length === 0 && (
                <div className="absolute inset-0 grid place-items-center text-center text-muted-foreground">
                  <div>
                    <p className="text-lg font-bold text-primary">Commencez votre composition</p>
                    <p className="mt-2 text-sm">Sélectionnez un motif puis ajoutez des éléments au canevas.</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}