import type { HouseId } from '@/types/character'

export interface House {
  id: HouseId
  /** Nome como aparece na API. */
  apiName: string
  /** Nome na tradução brasileira. */
  name: string
  founder: string
  animal: string
  element: string
  traits: string[]
}

export const HOUSE_IDS = ['gryffindor', 'slytherin', 'hufflepuff', 'ravenclaw'] as const

export const HOUSES: Record<HouseId, House> = {
  gryffindor: {
    id: 'gryffindor',
    apiName: 'Gryffindor',
    name: 'Grifinória',
    founder: 'Godric Gryffindor',
    animal: 'Leão',
    element: 'Fogo',
    traits: ['Coragem', 'Ousadia', 'Determinação'],
  },
  slytherin: {
    id: 'slytherin',
    apiName: 'Slytherin',
    name: 'Sonserina',
    founder: 'Salazar Slytherin',
    animal: 'Serpente',
    element: 'Água',
    traits: ['Ambição', 'Astúcia', 'Liderança'],
  },
  hufflepuff: {
    id: 'hufflepuff',
    apiName: 'Hufflepuff',
    name: 'Lufa-Lufa',
    founder: 'Helga Hufflepuff',
    animal: 'Texugo',
    element: 'Terra',
    traits: ['Lealdade', 'Paciência', 'Dedicação'],
  },
  ravenclaw: {
    id: 'ravenclaw',
    apiName: 'Ravenclaw',
    name: 'Corvinal',
    founder: 'Rowena Ravenclaw',
    animal: 'Águia',
    element: 'Ar',
    traits: ['Inteligência', 'Sabedoria', 'Criatividade'],
  },
}

export function isHouseId(value: unknown): value is HouseId {
  return typeof value === 'string' && (HOUSE_IDS as readonly string[]).includes(value)
}

/** Converte o nome da casa vindo da API ("Gryffindor") para o id interno. */
export function houseIdFromApiName(apiName: string): HouseId | null {
  const id = apiName.trim().toLowerCase()
  return isHouseId(id) ? id : null
}
