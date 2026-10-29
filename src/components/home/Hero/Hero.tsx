import { CharacterPortrait } from '@/components/characters/CharacterPortrait'
import { Icon } from '@/components/ui/Icon'
import { HOUSE_IDS } from '@/constants/houses'
import type { CharacterStats } from '@/lib/characters/stats'
import type { CharacterSummary } from '@/types/character'
import styles from './Hero.module.scss'

const numberFormatter = new Intl.NumberFormat('pt-BR')

interface HeroProps {
  stats: CharacterStats
  /** Até três personagens exibidos nos quadros; o do meio ganha destaque. */
  featured: CharacterSummary[]
}

export function Hero({ stats, featured }: HeroProps) {
  const highlights = [
    { value: stats.total, label: 'personagens catalogados' },
    { value: HOUSE_IDS.length, label: 'casas de Hogwarts' },
    { value: stats.alive, label: 'ainda vivos' },
    { value: stats.actors, label: 'atores e atrizes' },
  ]

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <Icon name="sparkle" size={14} />
            Guia do universo Harry Potter
          </p>
          <h1 id="hero-title" className={styles.title}>
            Bruxos, trouxas e criaturas de <span className={styles.highlight}>Hogwarts</span> em um
            só lugar
          </h1>
          <p className={styles.lead}>
            Descubra a casa, o patrono, a data de nascimento e quem interpretou cada personagem da
            saga. E confira quem sobreviveu até o fim.
          </p>
          <div className={styles.actions}>
            <a href="#personagens" className={styles.primaryAction}>
              Explorar personagens
              <Icon name="arrowRight" size={18} />
            </a>
            <a href="#casas" className={styles.secondaryAction}>
              Conhecer as casas
            </a>
          </div>
        </div>

        <div className={styles.gallery} aria-hidden="true">
          {featured.map((character, index) => (
            <div key={character.id} className={styles.frame} data-house={character.house ?? 'none'}>
              <CharacterPortrait
                name={character.name}
                image={character.image}
                sizes="(min-width: 1024px) 240px, 33vw"
                preload={index === 1}
                decorative
                className={styles.portrait}
              />
            </div>
          ))}
        </div>
      </div>

      <dl className={styles.stats}>
        {highlights.map((item) => (
          <div key={item.label} className={styles.stat}>
            <dt className={styles.statLabel}>{item.label}</dt>
            <dd className={styles.statValue}>{numberFormatter.format(item.value)}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
