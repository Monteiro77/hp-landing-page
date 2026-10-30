import Link from 'next/link'
import { CharacterPortrait } from '@/components/characters/CharacterPortrait'
import { Horizon } from '@/components/ui/Horizon'
import type { CharacterStats } from '@/lib/characters/stats'
import { pluralize } from '@/lib/utils/text'
import type { CharacterSummary } from '@/types/character'
import styles from './Hero.module.scss'

interface HeroProps {
  stats: CharacterStats
  /** Personagens em destaque exibidos ao lado do título. */
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
          <p className={styles.eyebrow}>Guia não oficial do mundo bruxo</p>
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

        <ul className={styles.picks} aria-label="Personagens em destaque">
          {featured.map((character, index) => (
            <li key={character.id} data-house={character.house ?? 'none'}>
              <Link href={`/personagem/${character.id}`} className={styles.pick}>
                <CharacterPortrait
                  name={character.name}
                  image={character.image}
                  sizes="(min-width: 1024px) 200px, 30vw"
                  preload={index === 0}
                  decorative
                  className={styles.pickPortrait}
                />
                <span className={styles.pickName}>{character.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Horizon variant="castle" className={styles.horizon} />
    </section>
  )
}
