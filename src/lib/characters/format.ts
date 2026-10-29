import { HOUSES } from '@/constants/houses'
import { capitalize } from '@/lib/utils/text'
import type { HouseId } from '@/types/character'

// `timeZone: 'UTC'` garante o mesmo texto no servidor e no navegador (sem erro de hidratação).
const birthDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

/** "1980-07-31" -> "31 de julho de 1980". Sem data completa, usa apenas o ano. */
export function formatBirthDate(birthDate: string | null, birthYear: number | null): string | null {
  if (birthDate) {
    const [year, month, day] = birthDate.split('-').map(Number)
    return birthDateFormatter.format(new Date(Date.UTC(year, month - 1, day)))
  }

  return birthYear ? String(birthYear) : null
}

export function formatHouse(house: HouseId | null): string {
  return house ? HOUSES[house].name : 'Sem casa'
}

/** Traduz um valor da API usando o dicionário informado. */
export function translate(value: string | null, dictionary: Record<string, string>): string | null {
  if (!value) return null
  return dictionary[value.toLowerCase()] ?? capitalize(value)
}

export function formatWandLength(length: number): string {
  return `${length.toLocaleString('pt-BR')} polegadas`
}
