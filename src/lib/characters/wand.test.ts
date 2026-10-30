import { describe, expect, it } from 'vitest'
import {
  describeWand,
  formatWandCore,
  formatWandLength,
  formatWandWood,
  getHandleStyle,
  getWandCore,
  getWoodTone,
} from './wand'

describe('getWandCore', () => {
  it.each([
    ['phoenix tail feather', 'phoenix'],
    ['Phoenix feather', 'phoenix'],
    ['dragon heartstring', 'dragon'],
    ['unicorn tail hair', 'unicorn'],
    ['unicorn hair', 'unicorn'],
    ['thestral tail hair', null],
    [null, null],
  ])('%j -> %j', (core, expected) => {
    expect(getWandCore(core)).toBe(expected)
  })
})

describe('formatação', () => {
  it('traduz a madeira e o núcleo', () => {
    expect(formatWandWood('holly')).toBe('Azevinho')
    expect(formatWandWood('Elder')).toBe('Elder')
    expect(formatWandCore('unicorn tail hair')).toBe('Pelo de unicórnio')
    expect(formatWandCore(null)).toBeNull()
  })

  it('formata o comprimento em polegadas', () => {
    expect(formatWandLength(10.75)).toBe('10,75 polegadas')
    expect(formatWandLength(11, true)).toBe('11 pol.')
  })

  it('descreve a varinha ignorando partes desconhecidas', () => {
    expect(describeWand({ wood: 'holly', core: 'phoenix tail feather', length: 11 })).toBe(
      'Azevinho, pena de fênix, 11 polegadas',
    )
    expect(describeWand({ wood: 'yew', core: null, length: null })).toBe('Teixo')
    expect(describeWand({ wood: 'vine', core: 'dragon heartstring', length: 10.75 }, true)).toBe(
      'Videira · 10,75 pol.',
    )
  })
})

describe('aparência', () => {
  it('usa um tom padrão para madeiras desconhecidas', () => {
    expect(getWoodTone('holly').base).not.toBe(getWoodTone('walnut').base)
    expect(getWoodTone('elder')).toEqual(getWoodTone(null))
  })

  it('escolhe sempre o mesmo estilo de cabo para a mesma madeira', () => {
    expect(getHandleStyle('holly')).toBe(getHandleStyle('holly'))
    expect(['rings', 'spiral', 'knots']).toContain(getHandleStyle(null))
  })
})
