import { ANCESTRY_LABELS, GENDER_LABELS, PATRONUS_LABELS, SPECIES_LABELS } from '@/constants/labels'
import { formatBirthDate, formatHouse, formatWandLength, translate } from '@/lib/characters/format'
import { capitalize } from '@/lib/utils/text'
import type { Character, Wand } from '@/types/character'
import { CharacterPortrait } from '../CharacterPortrait'
import { HouseTag } from '../HouseTag'
import { StatusBadge } from '../StatusBadge'
import styles from './CharacterProfile.module.scss'

interface CharacterProfileProps {
  character: Character
}

function formatWand(wand: Wand | null): string | null {
  if (!wand) return null

  const parts = [
    wand.wood && capitalize(wand.wood),
    wand.core,
    wand.length !== null && formatWandLength(wand.length),
  ].filter(Boolean)

  return parts.length > 0 ? parts.join(', ') : null
}

/** Papéis do personagem, com concordância de gênero ("Aluna de Hogwarts", "Bruxo"...). */
function formatRoles(character: Character): string[] {
  const suffix = character.gender === 'female' ? 'a' : 'o'
  const roles: string[] = []

  if (character.isStudent) roles.push(`Alun${suffix} de Hogwarts`)
  if (character.isStaff) roles.push(`Funcionári${suffix} de Hogwarts`)
  roles.push(character.isWizard ? `Brux${suffix}` : `Não brux${suffix}`)

  return roles
}

export function CharacterProfile({ character }: CharacterProfileProps) {
  const actors = [character.actor, ...character.alternateActors].filter(Boolean).join(', ')

  const details: Array<{ label: string; value: string | null }> = [
    { label: 'Nascimento', value: formatBirthDate(character.birthDate, character.birthYear) },
    { label: 'Casa', value: formatHouse(character.house) },
    { label: 'Patrono', value: translate(character.patronus, PATRONUS_LABELS) },
    { label: character.alternateActors.length > 0 ? 'Intérpretes' : 'Ator/Atriz', value: actors },
    { label: 'Espécie', value: translate(character.species, SPECIES_LABELS) },
    { label: 'Gênero', value: translate(character.gender, GENDER_LABELS) },
    { label: 'Ascendência', value: translate(character.ancestry, ANCESTRY_LABELS) },
    { label: 'Varinha', value: formatWand(character.wand) },
  ]

  return (
    <article className={styles.profile} data-house={character.house ?? 'none'}>
      <div className={styles.frame}>
        <CharacterPortrait
          name={character.name}
          image={character.image}
          sizes="(min-width: 768px) 360px, 80vw"
          preload
          className={styles.portrait}
        />
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <HouseTag house={character.house} />
          <h1 className={styles.name}>{character.name}</h1>
          {character.alternateNames.length > 0 && (
            <p className={styles.aliases}>
              Também conhecido como {character.alternateNames.join(', ')}
            </p>
          )}
          <ul className={styles.badges} aria-label="Resumo">
            <li>
              <StatusBadge alive={character.alive} gender={character.gender} />
            </li>
            {formatRoles(character).map((role) => (
              <li key={role} className={styles.role}>
                {role}
              </li>
            ))}
          </ul>
        </header>

        <dl className={styles.details}>
          {details.map(({ label, value }) => (
            <div key={label} className={styles.detail}>
              <dt>{label}</dt>
              {value ? <dd>{value}</dd> : <dd className={styles.unknown}>Não informado</dd>}
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}
