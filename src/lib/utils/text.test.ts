import { describe, expect, it } from 'vitest'
import { cn, emptyToNull, getInitials, normalizeForSearch, pluralize } from './text'

describe('emptyToNull', () => {
  it('converte vazio e espaços em null', () => {
    expect(emptyToNull('')).toBeNull()
    expect(emptyToNull('   ')).toBeNull()
    expect(emptyToNull(undefined)).toBeNull()
    expect(emptyToNull(' stag ')).toBe('stag')
  })
})

describe('getInitials', () => {
  it.each([
    ['Harry James Potter', 'HP'],
    ['Hedwig', 'H'],
    ['  mrs   Norris ', 'MN'],
    ['', '?'],
  ])('%j -> %j', (name, expected) => {
    expect(getInitials(name)).toBe(expected)
  })
})

describe('normalizeForSearch', () => {
  it('remove acentos e caixa', () => {
    expect(normalizeForSearch('  Grifinória ')).toBe('grifinoria')
  })
})

describe('pluralize', () => {
  it('escolhe singular ou plural e formata o número', () => {
    expect(pluralize(1, 'personagem', 'personagens')).toBe('1 personagem')
    expect(pluralize(0, 'personagem', 'personagens')).toBe('0 personagens')
    expect(pluralize(1200, 'personagem', 'personagens')).toBe('1.200 personagens')
  })
})

describe('cn', () => {
  it('ignora valores falsos', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b')
  })
})
