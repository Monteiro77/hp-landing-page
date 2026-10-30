import Link from 'next/link'
import { HousePennant } from '@/components/houses/HousePennant'
import { Horizon } from '@/components/ui/Horizon'
import { HOUSE_IDS, HOUSES } from '@/constants/houses'
import { pluralize } from '@/lib/utils/text'
import type { HouseId } from '@/types/character'
import styles from './HouseShowcase.module.scss'

interface HouseShowcaseProps {
  /** Quantidade de personagens por casa. */
  counts: Record<HouseId, number>
}

export function HouseShowcase({ counts }: HouseShowcaseProps) {
  return (
    <section id="casas" className={styles.section} aria-labelledby="casas-title">
      <div className={styles.inner}>
        <div className={styles.banners}>
          <p className={styles.ribbon}>
            <span>Casas de Hogwarts</span>
          </p>

          <ul className={styles.houses}>
            {HOUSE_IDS.map((id) => {
              const house = HOUSES[id]

              return (
                <li key={id} data-house={id}>
                  <Link href={`/?house=${id}#personagens`} className={styles.house}>
                    <HousePennant house={id} className={styles.pennant} />
                    <span className={styles.houseName}>{house.name}</span>
                    <span className={styles.count}>
                      {pluralize(counts[id], 'personagem', 'personagens')}
                    </span>
                    <span className={styles.traits}>{house.traits.slice(0, 2).join(' · ')}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.content}>
          <h2 id="casas-title" className={styles.title}>
            Qual é a sua casa em Hogwarts?
          </h2>
          <p className={styles.description}>
            O Chapéu Seletor distribui os alunos pelas qualidades que mais valorizam: a coragem da
            Grifinória, a ambição da Sonserina, a lealdade da Lufa-Lufa e a sabedoria da Corvinal.
            Escolha um estandarte para conhecer seus membros.
          </p>
          <a href="#personagens" className={styles.action}>
            Ver todos os personagens
          </a>
        </div>
      </div>

      <Horizon variant="village" className={styles.horizon} />
    </section>
  )
}
