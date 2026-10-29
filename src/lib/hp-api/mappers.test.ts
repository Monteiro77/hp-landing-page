import { describe, expect, it } from 'vitest'
import { mapApiCharacter, parseApiDate, toCharacterSummary } from './mappers'
import type { ApiCharacter } from './types'

function buildApiCharacter(overrides: Partial<ApiCharacter> = {}): ApiCharacter {
  return {
    id: '9e3f7ce4',
    name: 'Harry Potter',
    alternate_names: ['The Boy Who Lived', ''],
    species: 'human',
    gender: 'male',
    house: 'Gryffindor',
    dateOfBirth: '31-07-1980',
    yearOfBirth: 1980,
    wizard: true,
    ancestry: 'half-blood',
    eyeColour: 'green',
    hairColour: 'black',
    wand: { wood: 'holly', core: 'phoenix tail feather', length: 11 },
    patronus: 'stag',
    hogwartsStudent: true,
    hogwartsStaff: false,
    actor: 'Daniel Radcliffe',
    alternate_actors: [],
    alive: true,
    image: 'https://ik.imagekit.io/hpapi/harry.jpg',
    ...overrides,
  }
}

describe('parseApiDate', () => {
  it('converte DD-MM-YYYY para ISO', () => {
    expect(parseApiDate('31-07-1980')).toBe('1980-07-31')
  })

  it.each([null, '', '1980', '31/07/1980'])('retorna null para %j', (value) => {
    expect(parseApiDate(value)).toBeNull()
  })
})

describe('mapApiCharacter', () => {
  it('normaliza um personagem completo', () => {
    const character = mapApiCharacter(buildApiCharacter())

    expect(character).toMatchObject({
      name: 'Harry Potter',
      alternateNames: ['The Boy Who Lived'],
      house: 'gryffindor',
      birthDate: '1980-07-31',
      patronus: 'stag',
      actor: 'Daniel Radcliffe',
      alive: true,
      wand: { wood: 'holly', core: 'phoenix tail feather', length: 11 },
      isStudent: true,
    })
  })

  it('converte campos vazios em null', () => {
    const character = mapApiCharacter(
      buildApiCharacter({
        house: '',
        image: '',
        patronus: '',
        actor: '  ',
        dateOfBirth: null,
        wand: { wood: '', core: '', length: null },
      }),
    )

    expect(character.house).toBeNull()
    expect(character.image).toBeNull()
    expect(character.patronus).toBeNull()
    expect(character.actor).toBeNull()
    expect(character.birthDate).toBeNull()
    expect(character.wand).toBeNull()
  })

  it('ignora nomes de casa desconhecidos', () => {
    expect(mapApiCharacter(buildApiCharacter({ house: 'Durmstrang' })).house).toBeNull()
  })
})

describe('toCharacterSummary', () => {
  it('mantém apenas os campos usados na listagem', () => {
    const summary = toCharacterSummary(mapApiCharacter(buildApiCharacter()))

    expect(Object.keys(summary).sort()).toEqual(
      [
        'actor',
        'alive',
        'birthDate',
        'birthYear',
        'gender',
        'house',
        'id',
        'image',
        'name',
        'patronus',
      ].sort(),
    )
  })
})
