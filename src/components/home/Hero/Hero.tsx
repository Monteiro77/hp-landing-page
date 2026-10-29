import { CharacterPortrait } from '@/components/characters/CharacterPortrait'
import { Icon } from '@/components/ui/Icon'
import type { CharacterStats } from '@/lib/characters/stats'
import { pluralize } from '@/lib/utils/text'
import type { CharacterSummary } from '@/types/character'
import styles from './Hero.module.scss'

interface HeroProps {
  stats: CharacterStats
  /** Até três personagens exibidos nos quadros; o do meio ganha destaque. */
  featured: CharacterSummary[]
}

export function Hero({ stats, featured }: HeroProps) {
  const facts = [
    pluralize(stats.total, 'personagem', 'personagens'),
    `${pluralize(stats.alive, 'vivo', 'vivos')} até o fim da saga`,
    pluralize(stats.actors, 'ator ou atriz', 'atores e atrizes'),
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
            Bruxos, trouxas e criaturas de Hogwarts em um só lugar
          </h1>
          <p className={styles.lead}>
            Descubra a casa, o patrono, a data de nascimento e quem interpretou cada personagem da
            saga.
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

          <ul className={styles.facts} aria-label="A coleção em números">
            {facts.map((fact) => {
              const [count, ...rest] = fact.split(' ')
              return (
                <li key={fact}>
                  <strong>{count}</strong> {rest.join(' ')}
                </li>
              )
            })}
          </ul>
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
    </section>
  )
}
