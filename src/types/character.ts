export type HouseId = 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw'

export interface Wand {
  wood: string | null
  core: string | null
  /** Comprimento em polegadas. */
  length: number | null
}

/** Personagem já normalizado para uso na aplicação (campos vazios da API viram `null`). */
export interface Character {
  id: string
  name: string
  alternateNames: string[]
  image: string | null
  house: HouseId | null
  /** Data no formato ISO `YYYY-MM-DD`. */
  birthDate: string | null
  birthYear: number | null
  patronus: string | null
  actor: string | null
  alternateActors: string[]
  alive: boolean
  species: string | null
  gender: string | null
  ancestry: string | null
  wand: Wand | null
  isWizard: boolean
  isStudent: boolean
  isStaff: boolean
}

/** Versão enxuta enviada ao navegador na listagem, para reduzir o payload. */
export type CharacterSummary = Pick<
  Character,
  | 'id'
  | 'name'
  | 'image'
  | 'house'
  | 'birthDate'
  | 'birthYear'
  | 'patronus'
  | 'actor'
  | 'alive'
  | 'gender'
  | 'wand'
>
