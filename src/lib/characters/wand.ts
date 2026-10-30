import { WAND_WOOD_LABELS } from '@/constants/labels'
import { capitalize } from '@/lib/utils/text'
import type { Wand } from '@/types/character'

export type WandCore = 'phoenix' | 'dragon' | 'unicorn'

export const WAND_CORES: Record<WandCore, { label: string; glow: string }> = {
  phoenix: { label: 'Pena de fênix', glow: '#ff8a3d' },
  dragon: { label: 'Fibra de coração de dragão', glow: '#ff4d6d' },
  unicorn: { label: 'Pelo de unicórnio', glow: '#cfe3ff' },
}

/** A API escreve o mesmo núcleo de formas diferentes ("unicorn hair", "unicorn tail hair"...). */
export function getWandCore(core: string | null): WandCore | null {
  const value = core?.toLowerCase() ?? ''
  if (value.includes('phoenix')) return 'phoenix'
  if (value.includes('dragon')) return 'dragon'
  if (value.includes('unicorn')) return 'unicorn'
  return null
}

export interface WoodTone {
  light: string
  base: string
  dark: string
}

// Tons aproximados de cada madeira (do claro ao escuro) usados no desenho da varinha.
const WOOD_TONES: Record<string, WoodTone> = {
  alder: { light: '#d9925e', base: '#b86a3c', dark: '#7a4120' },
  ash: { light: '#efe3c8', base: '#d6c29a', dark: '#9c875f' },
  birch: { light: '#f8f2e4', base: '#e6dbc2', dark: '#a99d82' },
  cedar: { light: '#d98a52', base: '#b5652f', dark: '#743d17' },
  cherry: { light: '#b8574a', base: '#8e3b2e', dark: '#561f16' },
  chestnut: { light: '#a65d38', base: '#7b3f22', dark: '#4a2412' },
  cypress: { light: '#cf9a62', base: '#a8743f', dark: '#6b4522' },
  elm: { light: '#c08c60', base: '#9b6b43', dark: '#5f3f25' },
  fir: { light: '#dcaa72', base: '#b9844f', dark: '#7a5330' },
  hawthorn: { light: '#c3855a', base: '#a0663d', dark: '#653b1f' },
  hazel: { light: '#c08e5c', base: '#9a6a3a', dark: '#5f3f1f' },
  holly: { light: '#f6eedc', base: '#e3d5b8', dark: '#a8977a' },
  hornbeam: { light: '#e6d8b8', base: '#cdbb94', dark: '#8f7e5c' },
  larch: { light: '#e3ad72', base: '#c58b4e', dark: '#85582c' },
  mahogany: { light: '#94452f', base: '#6a2c1d', dark: '#3d160c' },
  oak: { light: '#b3804d', base: '#8a5a2b', dark: '#563615' },
  vine: { light: '#93704d', base: '#6b4a2b', dark: '#3f2a15' },
  walnut: { light: '#73503b', base: '#4b2e1e', dark: '#28170d' },
  willow: { light: '#e3c58e', base: '#c9a46a', dark: '#8c6d3e' },
  yew: { light: '#84513a', base: '#5a2f1c', dark: '#30170b' },
}

const DEFAULT_TONE: WoodTone = { light: '#b3804d', base: '#8a5a2b', dark: '#563615' }

export function getWoodTone(wood: string | null): WoodTone {
  return (wood && WOOD_TONES[wood.toLowerCase()]) || DEFAULT_TONE
}

export type HandleStyle = 'rings' | 'spiral' | 'knots'
const HANDLE_STYLES: readonly HandleStyle[] = ['rings', 'spiral', 'knots']

/** Estilo do cabo derivado do nome da madeira: cada varinha fica sempre igual entre renderizações. */
export function getHandleStyle(wood: string | null): HandleStyle {
  const seed = [...(wood ?? '')].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return HANDLE_STYLES[seed % HANDLE_STYLES.length]
}

export function formatWandWood(wood: string | null): string | null {
  if (!wood) return null
  return WAND_WOOD_LABELS[wood.toLowerCase()] ?? capitalize(wood)
}

export function formatWandCore(core: string | null): string | null {
  const kind = getWandCore(core)
  if (kind) return WAND_CORES[kind].label
  return core ? capitalize(core) : null
}

const inchesFormatter = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 })

/** 10.75 -> "10,75 pol." (compacto) ou "10,75 polegadas". */
export function formatWandLength(length: number, compact = false): string {
  return `${inchesFormatter.format(length)} ${compact ? 'pol.' : 'polegadas'}`
}

/** "Azevinho, pena de fênix, 11 polegadas" (ignora as partes desconhecidas). */
export function describeWand(wand: Wand, compact = false): string {
  const core = formatWandCore(wand.core)
  const parts = [
    formatWandWood(wand.wood),
    compact ? null : core && core.charAt(0).toLowerCase() + core.slice(1),
    wand.length !== null ? formatWandLength(wand.length, compact) : null,
  ].filter(Boolean)

  return parts.join(compact ? ' · ' : ', ')
}
