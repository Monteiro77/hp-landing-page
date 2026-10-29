/** Formato bruto retornado por `GET /api/characters` da HP-API. */
export interface ApiCharacter {
  id: string
  name: string
  alternate_names: string[]
  species: string
  gender: string
  house: string
  /** Formato `DD-MM-YYYY` ou `null`. */
  dateOfBirth: string | null
  yearOfBirth: number | null
  wizard: boolean
  ancestry: string
  eyeColour: string
  hairColour: string
  wand: {
    wood: string
    core: string
    length: number | null
  }
  patronus: string
  hogwartsStudent: boolean
  hogwartsStaff: boolean
  actor: string
  alternate_actors: string[]
  alive: boolean
  image: string
}
