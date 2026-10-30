import { describe, expect, it } from 'vitest'
import { PATRONUS_LABELS } from '@/constants/labels'
import { formatBirthDate, formatHouse, formatStatus, translate } from './format'

describe('formatBirthDate', () => {
  it('formata a data completa em português', () => {
    expect(formatBirthDate('1980-07-31', 1980)).toBe('31 de julho de 1980')
  })

  it('usa apenas o ano quando não há data completa', () => {
    expect(formatBirthDate(null, 1926)).toBe('1926')
  })

  it('retorna null sem data nem ano', () => {
    expect(formatBirthDate(null, null)).toBeNull()
  })
})

describe('formatStatus', () => {
  it('concorda com o gênero', () => {
    expect(formatStatus(true, 'female')).toBe('Viva')
    expect(formatStatus(false, 'female')).toBe('Falecida')
    expect(formatStatus(true, 'male')).toBe('Vivo')
    expect(formatStatus(false, null)).toBe('Falecido')
  })
})

describe('formatHouse', () => {
  it('traduz o nome da casa', () => {
    expect(formatHouse('hufflepuff')).toBe('Lufa-Lufa')
    expect(formatHouse(null)).toBe('Sem casa')
  })
})

describe('translate', () => {
  it('usa o dicionário sem diferenciar maiúsculas', () => {
    expect(translate('Jack Russell terrier', PATRONUS_LABELS)).toBe('Jack Russell terrier')
    expect(translate('stag', PATRONUS_LABELS)).toBe('Cervo')
  })

  it('capitaliza valores sem tradução', () => {
    expect(translate('dementor', PATRONUS_LABELS)).toBe('Dementor')
  })

  it('retorna null para valores ausentes', () => {
    expect(translate(null, PATRONUS_LABELS)).toBeNull()
  })
})
