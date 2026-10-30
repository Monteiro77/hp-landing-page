import { ANCESTRY_LABELS, GENDER_LABELS, PATRONUS_LABELS, SPECIES_LABELS } from '@/constants/labels'
import { formatBirthDate, formatHouse, translate } from '@/lib/characters/format'
import { formatWandCore, formatWandLength, formatWandWood } from '@/lib/characters/wand'
import type { Character, Wand } from '@/types/character'
import { CharacterPortrait } from '../CharacterPortrait'
import { HouseTag } from '../HouseTag'
import { StatusBadge } from '../StatusBadge'
import { WandPreview } from '../WandPreview'
import styles from './CharacterProfile.module.scss'

interface CharacterProfileProps {
  character: Character
}

function DetailList({ items }: { items: Array<{ label: string; value: string | null }> }) {
  return items.map(({ label, value }) => (
    <div key={label} className={styles.detail}>
      <dt>{label}</dt>
      {value ? <dd>{value}</dd> : <dd className={styles.unknown}>Não informado</dd>}
    </div>
  ))
}

function WandSection({ wand, characterId }: { wand: Wand | null; characterId: string }) {
  return (
    <section className={styles.wand} aria-labelledby="wand-title">
      <h2 id="wand-title" className={styles.wandTitle}>
        Varinha
      </h2>
      <WandPreview wand={wand} id={`profile-${characterId}`} className={styles.wandPreview} />
      {wand ? (
        <dl className={styles.wandSpecs}>
          <DetailList
            items={[
              { label: 'Madeira', value: formatWandWood(wand.wood) },
              { label: 'Núcleo', value: formatWandCore(wand.core) },
              {
                label: 'Comprimento',
                value: wand.length !== null ? formatWandLength(wand.length) : null,
              },
            ]}
          />
        </dl>
      ) : (
        <p className={styles.wandEmpty}>A HP-API não tem registro da varinha deste personagem.</p>
      )}
    </section>
  )
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
          <DetailList items={details} />
        </dl>

        <WandSection wand={character.wand} characterId={character.id} />
      </div>
    </article>
  )
}
