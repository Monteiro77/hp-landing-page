import { describe, expect, it } from 'vitest'
import type { CharacterSummary } from '@/types/character'
import {
  DEFAULT_FILTERS,
  filterCharacters,
  filtersToSearchParams,
  hasActiveFilters,
  parseFilters,
} from './filters'

function buildCharacter(overrides: Partial<CharacterSummary>): CharacterSummary {
  return {
    id: overrides.name ?? 'id',
    name: 'Sem nome',
    image: null,
    house: null,
    birthDate: null,
    birthYear: null,
    patronus: null,
    actor: null,
    alive: true,
    ...overrides,
  }
}

const characters: CharacterSummary[] = [
  buildCharacter({ name: 'Harry Potter', house: 'gryffindor', actor: 'Daniel Radcliffe', image: 'h.jpg' }),
  buildCharacter({ name: 'Severus Snape', house: 'slytherin', actor: 'Alan Rickman', alive: false }),
  buildCharacter({ name: 'Cedric Diggory', house: 'hufflepuff', alive: false, image: 'c.jpg' }),
  buildCharacter({ name: 'Argus Filch', actor: 'David Bradley' }),
  buildCharacter({ name: 'Ángel Exemplo', house: 'ravenclaw' }),
]

const names = (list: CharacterSummary[]) => list.map((character) => character.name)

describe('parseFilters', () => {
  it('lê filtros válidos da URL', () => {
    const params = new URLSearchParams('q=harry&house=gryffindor&status=alive&sort=name-desc&photo=1')

    expect(parseFilters(params)).toEqual({
      query: 'harry',
      house: 'gryffindor',
      status: 'alive',
      sort: 'name-desc',
      onlyWithImage: true,
    })
  })

  it('aceita o objeto searchParams do Next.js', () => {
    expect(parseFilters({ house: ['none', 'slytherin'], status: undefined })).toEqual({
      ...DEFAULT_FILTERS,
      house: 'none',
    })
  })

  it('volta ao padrão quando os valores são inválidos', () => {
    const params = new URLSearchParams('house=durmstrang&status=zombie&sort=random&photo=yes')
    expect(parseFilters(params)).toEqual(DEFAULT_FILTERS)
  })
})

describe('filtersToSearchParams', () => {
  it('omite valores padrão', () => {
    expect(filtersToSearchParams(DEFAULT_FILTERS).toString()).toBe('')
    expect(hasActiveFilters(DEFAULT_FILTERS)).toBe(false)
  })

  it('faz o caminho inverso de parseFilters', () => {
    const filters = parseFilters(new URLSearchParams('q=snape&house=slytherin&status=deceased'))
    expect(parseFilters(filtersToSearchParams(filters))).toEqual(filters)
    expect(hasActiveFilters(filters)).toBe(true)
  })
})

describe('filterCharacters', () => {
  it('sem filtros mantém a ordem original', () => {
    expect(filterCharacters(characters, DEFAULT_FILTERS)).toEqual(characters)
  })

  it('filtra por casa e por "sem casa"', () => {
    expect(names(filterCharacters(characters, { ...DEFAULT_FILTERS, house: 'slytherin' }))).toEqual([
      'Severus Snape',
    ])
    expect(names(filterCharacters(characters, { ...DEFAULT_FILTERS, house: 'none' }))).toEqual([
      'Argus Filch',
    ])
  })

  it('filtra por status', () => {
    expect(names(filterCharacters(characters, { ...DEFAULT_FILTERS, status: 'deceased' }))).toEqual([
      'Severus Snape',
      'Cedric Diggory',
    ])
  })

  it('busca por nome ou ator, ignorando acentos e maiúsculas', () => {
    expect(names(filterCharacters(characters, { ...DEFAULT_FILTERS, query: 'RICKMAN' }))).toEqual([
      'Severus Snape',
    ])
    expect(names(filterCharacters(characters, { ...DEFAULT_FILTERS, query: 'angel' }))).toEqual([
      'Ángel Exemplo',
    ])
  })

  it('mostra apenas personagens com foto', () => {
    expect(names(filterCharacters(characters, { ...DEFAULT_FILTERS, onlyWithImage: true }))).toEqual([
      'Harry Potter',
      'Cedric Diggory',
    ])
  })

  it('ordena por nome', () => {
    const sorted = names(filterCharacters(characters, { ...DEFAULT_FILTERS, sort: 'name-asc' }))
    expect(sorted).toEqual([
      'Ángel Exemplo',
      'Argus Filch',
      'Cedric Diggory',
      'Harry Potter',
      'Severus Snape',
    ])

    const reversed = names(filterCharacters(characters, { ...DEFAULT_FILTERS, sort: 'name-desc' }))
    expect(reversed).toEqual([...sorted].reverse())
  })
})
