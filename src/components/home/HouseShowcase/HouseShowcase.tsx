import Link from 'next/link'
import { HouseCrest } from '@/components/houses/HouseCrest'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { HOUSE_IDS, HOUSES } from '@/constants/houses'
import type { HouseId } from '@/types/character'
import styles from './HouseShowcase.module.scss'

interface HouseShowcaseProps {
  /** Quantidade de personagens por casa. */
  counts: Record<HouseId, number>
}

export function HouseShowcase({ counts }: HouseShowcaseProps) {
  return (
    <section id="casas" className={styles.section} aria-labelledby="casas-title">
      <SectionHeading
        id="casas-title"
        eyebrow="As quatro casas"
        title="Cada bruxo tem o seu lugar"
        description="O Chapéu Seletor distribui os alunos pelas qualidades que mais valorizam. Escolha uma casa para conhecer seus membros."
        align="center"
      />

      <ul className={styles.grid} role="list">
        {HOUSE_IDS.map((id) => {
          const house = HOUSES[id]

          return (
            <li key={id}>
              <article className={styles.card} data-house={id}>
                <HouseCrest house={id} className={styles.crest} />
                <h3 className={styles.name}>
                  <Link href={`/?house=${id}#personagens`} className={styles.link}>
                    {house.name}
                  </Link>
                </h3>
                <p className={styles.founder}>Fundada por {house.founder}</p>

                <ul className={styles.traits} aria-label="Qualidades">
                  {house.traits.map((trait) => (
                    <li key={trait}>{trait}</li>
                  ))}
                </ul>

                <dl className={styles.meta}>
                  <div>
                    <dt>Animal</dt>
                    <dd>{house.animal}</dd>
                  </div>
                  <div>
                    <dt>Elemento</dt>
                    <dd>{house.element}</dd>
                  </div>
                </dl>

                <p className={styles.footer}>
                  <span>{counts[id]} personagens</span>
                  <span className={styles.cta} aria-hidden="true">
                    Ver membros
                    <Icon name="arrowRight" size={16} />
                  </span>
                </p>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
