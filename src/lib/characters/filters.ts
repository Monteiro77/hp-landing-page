import { isHouseId } from '@/constants/houses'
import { normalizeForSearch } from '@/lib/utils/text'
import type { CharacterSummary, HouseId } from '@/types/character'

export type HouseFilter = 'all' | 'none' | HouseId
export type StatusFilter = 'all' | 'alive' | 'deceased'
export type SortOrder = 'relevance' | 'name-asc' | 'name-desc'

export interface CharacterFilters {
  query: string
  house: HouseFilter
  status: StatusFilter
  sort: SortOrder
  onlyWithImage: boolean
}

export const DEFAULT_FILTERS: CharacterFilters = {
  query: '',
  house: 'all',
  status: 'all',
  sort: 'relevance',
  onlyWithImage: false,
}

const STATUS_VALUES: readonly StatusFilter[] = ['all', 'alive', 'deceased']
const SORT_VALUES: readonly SortOrder[] = ['relevance', 'name-asc', 'name-desc']
const MAX_QUERY_LENGTH = 80

/** Nomes dos parâmetros na URL (ex.: `/?q=harry&house=gryffindor&status=alive`). */
const PARAM = {
  query: 'q',
  house: 'house',
  status: 'status',
  sort: 'sort',
  onlyWithImage: 'photo',
} as const

type SearchParamsInput = URLSearchParams | Record<string, string | string[] | undefined>

function readParam(params: SearchParamsInput, key: string): string | undefined {
  if (params instanceof URLSearchParams) return params.get(key) ?? undefined

  const value = params[key]
  return Array.isArray(value) ? value[0] : value
}

function oneOf<T extends string>(value: string | undefined, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback
}

/** Lê os filtros da URL, ignorando valores inválidos. */
export function parseFilters(params: SearchParamsInput): CharacterFilters {
  const house = readParam(params, PARAM.house)

  return {
    query: (readParam(params, PARAM.query) ?? '').slice(0, MAX_QUERY_LENGTH),
    house: house === 'none' || isHouseId(house) ? house : DEFAULT_FILTERS.house,
    status: oneOf(readParam(params, PARAM.status), STATUS_VALUES, DEFAULT_FILTERS.status),
    sort: oneOf(readParam(params, PARAM.sort), SORT_VALUES, DEFAULT_FILTERS.sort),
    onlyWithImage: readParam(params, PARAM.onlyWithImage) === '1',
  }
}

/** Gera a query string dos filtros, omitindo os valores padrão para manter a URL limpa. */
export function filtersToSearchParams(filters: CharacterFilters): URLSearchParams {
  const params = new URLSearchParams()
  const query = filters.query.trim()

  if (query) params.set(PARAM.query, query)
  if (filters.house !== DEFAULT_FILTERS.house) params.set(PARAM.house, filters.house)
  if (filters.status !== DEFAULT_FILTERS.status) params.set(PARAM.status, filters.status)
  if (filters.sort !== DEFAULT_FILTERS.sort) params.set(PARAM.sort, filters.sort)
  if (filters.onlyWithImage) params.set(PARAM.onlyWithImage, '1')

  return params
}

export function hasActiveFilters(filters: CharacterFilters): boolean {
  return filtersToSearchParams(filters).toString() !== ''
}

function matchesHouse(character: CharacterSummary, house: HouseFilter): boolean {
  if (house === 'all') return true
  if (house === 'none') return character.house === null
  return character.house === house
}

function matchesStatus(character: CharacterSummary, status: StatusFilter): boolean {
  if (status === 'all') return true
  return status === 'alive' ? character.alive : !character.alive
}

/** A busca considera o nome do personagem e do ator, sem diferenciar acentos. */
function matchesQuery(character: CharacterSummary, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true

  return [character.name, character.actor].some(
    (value) => value !== null && normalizeForSearch(value).includes(normalizedQuery),
  )
}

const nameCollator = new Intl.Collator('pt-BR', { sensitivity: 'base' })

function sortCharacters(characters: CharacterSummary[], sort: SortOrder): CharacterSummary[] {
  // "Relevância" mantém a ordem da API, que já traz os protagonistas primeiro.
  if (sort === 'relevance') return characters

  const direction = sort === 'name-asc' ? 1 : -1
  return [...characters].sort((a, b) => nameCollator.compare(a.name, b.name) * direction)
}

export function filterCharacters(
  characters: CharacterSummary[],
  filters: CharacterFilters,
): CharacterSummary[] {
  const normalizedQuery = normalizeForSearch(filters.query)

  const filtered = characters.filter(
    (character) =>
      matchesHouse(character, filters.house) &&
      matchesStatus(character, filters.status) &&
      (!filters.onlyWithImage || character.image !== null) &&
      matchesQuery(character, normalizedQuery),
  )

  return sortCharacters(filtered, filters.sort)
}
