import { cacheLife, cacheTag } from 'next/cache'
import type { Character } from '@/types/character'
import { mapApiCharacter } from './mappers'
import type { ApiCharacter } from './types'

const API_BASE_URL = 'https://hp-api.onrender.com/api'

/** A API roda no plano gratuito do Render e pode demorar a "acordar". */
const REQUEST_TIMEOUT_MS = 30_000

/**
 * Busca e normaliza todos os personagens.
 *
 * O resultado fica em cache por um dia (`cacheLife('days')`): a página é pré-renderizada no
 * build e revalidada em segundo plano, então o usuário nunca espera pela API.
 */
export async function getCharacters(): Promise<Character[]> {
  'use cache'
  cacheLife('days')
  cacheTag('characters')

  const response = await fetch(`${API_BASE_URL}/characters`, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })

  if (!response.ok) {
    throw new Error(`Falha ao buscar personagens na HP-API (HTTP ${response.status}).`)
  }

  const data = (await response.json()) as ApiCharacter[]
  return data.map(mapApiCharacter)
}

/**
 * Reaproveita a lista em cache em vez de chamar `/api/character/:id`: assim o build das
 * 400+ páginas de detalhe faz uma única requisição à API.
 */
export async function getCharacterById(id: string): Promise<Character | null> {
  const characters = await getCharacters()
  return characters.find((character) => character.id === id) ?? null
}
