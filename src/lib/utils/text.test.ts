import { describe, expect, it } from 'vitest'
import { cn, emptyToNull, getInitials, normalizeForSearch } from './text'

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

describe('cn', () => {
  it('ignora valores falsos', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b')
  })
})
