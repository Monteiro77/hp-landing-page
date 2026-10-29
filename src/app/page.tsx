import { CharacterGrid } from '@/components/characters/CharacterGrid'
import { Hero } from '@/components/home/Hero'
import { HouseShowcase } from '@/components/home/HouseShowcase'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getCharacterStats } from '@/lib/characters/stats'
import { getCharacters } from '@/lib/hp-api/client'
import { toCharacterSummary } from '@/lib/hp-api/mappers'
import styles from './page.module.scss'

export default async function HomePage() {
  const characters = (await getCharacters()).map(toCharacterSummary)
  const stats = getCharacterStats(characters)

  // Os três primeiros com foto (a API lista os protagonistas primeiro), com o 1º no centro.
  const [first, second, third] = characters.filter((character) => character.image !== null)
  const featured = [second, first, third].filter(Boolean)

  return (
    <>
      <Hero stats={stats} featured={featured} />
      <HouseShowcase counts={stats.byHouse} />

      <section id="personagens" className={styles.section} aria-labelledby="personagens-title">
        <SectionHeading
          id="personagens-title"
          eyebrow="Personagens"
          title="Quem é quem no mundo bruxo"
          description="Alunos, professores, criaturas e trouxas que aparecem na saga."
        />
        <CharacterGrid characters={characters.slice(0, 24)} />
      </section>
    </>
  )
}
