import { HOUSE_IDS } from '@/constants/houses'
import type { CharacterSummary, HouseId } from '@/types/character'

export interface CharacterStats {
  total: number
  alive: number
  /** Quantidade de atores e atrizes distintos no elenco. */
  actors: number
  byHouse: Record<HouseId, number>
}

export function getCharacterStats(characters: CharacterSummary[]): CharacterStats {
  const byHouse = Object.fromEntries(HOUSE_IDS.map((id) => [id, 0])) as Record<HouseId, number>
  const actors = new Set<string>()
  let alive = 0

  for (const character of characters) {
    if (character.alive) alive += 1
    if (character.actor) actors.add(character.actor)
    if (character.house) byHouse[character.house] += 1
  }

  return { total: characters.length, alive, actors: actors.size, byHouse }
}
