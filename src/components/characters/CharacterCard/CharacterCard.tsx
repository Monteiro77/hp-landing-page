import Link from 'next/link'
import { HousePennant } from '@/components/houses/HousePennant'
import { PATRONUS_LABELS } from '@/constants/labels'
import { formatBirthDate, translate } from '@/lib/characters/format'
import type { CharacterSummary } from '@/types/character'
import { CharacterPortrait } from '../CharacterPortrait'
import { HouseTag } from '../HouseTag'
import { StatusBadge } from '../StatusBadge'
import styles from './CharacterCard.module.scss'

// Deve acompanhar as colunas definidas em CharacterGrid.module.scss.
const PORTRAIT_SIZES = '(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw'

interface CharacterCardProps {
  character: CharacterSummary
  headingLevel?: 'h2' | 'h3'
}

function DetailValue({ value }: { value: string | null }) {
  return value ? <dd>{value}</dd> : <dd className={styles.unknown}>Não informado</dd>
}

export function CharacterCard({ character, headingLevel: Heading = 'h3' }: CharacterCardProps) {
  const { id, name, image, house, birthDate, birthYear, patronus, actor, alive, gender } = character

  return (
    <article className={styles.card} data-house={house ?? 'none'}>
      <div className={styles.media}>
        <CharacterPortrait
          name={name}
          image={image}
          sizes={PORTRAIT_SIZES}
          decorative
          className={styles.portrait}
        />
        <StatusBadge alive={alive} gender={gender} className={styles.status} />
        {house && <HousePennant house={house} className={styles.pennant} />}
        <Heading className={styles.name}>
          {/* O link "esticado" (::after) torna o card inteiro clicável, mantendo um único foco. */}
          <Link href={`/personagem/${id}`} className={styles.link}>
            {name}
          </Link>
        </Heading>
      </div>

      <div className={styles.body}>
        <HouseTag house={house} />

        <dl className={styles.details}>
          <div className={styles.detail}>
            <dt>Nascimento</dt>
            <DetailValue value={formatBirthDate(birthDate, birthYear)} />
          </div>
          <div className={styles.detail}>
            <dt>Patrono</dt>
            <DetailValue value={translate(patronus, PATRONUS_LABELS)} />
          </div>
          <div className={styles.detail}>
            <dt>Ator/Atriz</dt>
            <DetailValue value={actor} />
          </div>
        </dl>
      </div>
    </article>
  )
}
