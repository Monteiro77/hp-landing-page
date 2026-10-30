import Image from 'next/image'
import harryOnBroom from '@/assets/images/harry-vassoura.webp'
import { Horizon } from '@/components/ui/Horizon'
import type { CharacterStats } from '@/lib/characters/stats'
import { pluralize } from '@/lib/utils/text'
import styles from './Hero.module.scss'

interface HeroProps {
  stats: CharacterStats
}

export function Hero({ stats }: HeroProps) {
  const facts = [
    pluralize(stats.total, 'personagem', 'personagens'),
    `${pluralize(stats.alive, 'vivo', 'vivos')} até o fim da saga`,
    pluralize(stats.actors, 'ator ou atriz', 'atores e atrizes'),
  ]

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.content}>
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

        {/* Imagem importada estaticamente: o next/image já conhece as dimensões (sem salto de
            layout) e gera as versões redimensionadas. É o maior elemento da tela, então é
            pré-carregada. */}
        <div className={styles.visual}>
          <Image
            src={harryOnBroom}
            alt="Harry Potter voando em uma vassoura com a varinha acesa"
            sizes="(min-width: 1024px) 460px, (min-width: 768px) 55vw, 80vw"
            quality={90}
            preload
            className={styles.harry}
          />
        </div>
      </div>

      <Horizon variant="castle" className={styles.horizon} />
    </section>
  )
}
