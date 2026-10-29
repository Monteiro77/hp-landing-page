import { houseIdFromApiName } from '@/constants/houses'
import { emptyToNull } from '@/lib/utils/text'
import type { Character, CharacterSummary, Wand } from '@/types/character'
import type { ApiCharacter } from './types'

/** Converte `DD-MM-YYYY` em `YYYY-MM-DD`. Retorna `null` para valores ausentes ou inválidos. */
export function parseApiDate(value: string | null): string | null {
  const match = value?.trim().match(/^(\d{2})-(\d{2})-(\d{4})$/)
  if (!match) return null

  const [, day, month, year] = match
  return `${year}-${month}-${day}`
}

function mapWand(wand: ApiCharacter['wand'] | undefined): Wand | null {
  if (!wand) return null

  const mapped: Wand = {
    wood: emptyToNull(wand.wood),
    core: emptyToNull(wand.core),
    length: typeof wand.length === 'number' ? wand.length : null,
  }

  return mapped.wood || mapped.core || mapped.length ? mapped : null
}

export function mapApiCharacter(api: ApiCharacter): Character {
  return {
    id: api.id,
    name: api.name.trim(),
    alternateNames: (api.alternate_names ?? []).map((name) => name.trim()).filter(Boolean),
    image: emptyToNull(api.image),
    house: houseIdFromApiName(api.house ?? ''),
    birthDate: parseApiDate(api.dateOfBirth),
    birthYear: api.yearOfBirth ?? null,
    patronus: emptyToNull(api.patronus),
    actor: emptyToNull(api.actor),
    alternateActors: (api.alternate_actors ?? []).map((actor) => actor.trim()).filter(Boolean),
    alive: Boolean(api.alive),
    species: emptyToNull(api.species),
    gender: emptyToNull(api.gender),
    ancestry: emptyToNull(api.ancestry),
    wand: mapWand(api.wand),
    isWizard: Boolean(api.wizard),
    isStudent: Boolean(api.hogwartsStudent),
    isStaff: Boolean(api.hogwartsStaff),
  }
}

export function toCharacterSummary(character: Character): CharacterSummary {
  const { id, name, image, house, birthDate, birthYear, patronus, actor, alive } = character
  return { id, name, image, house, birthDate, birthYear, patronus, actor, alive }
}
