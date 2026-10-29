import { CharacterGrid } from '@/components/characters/CharacterGrid'
import { getCharacters } from '@/lib/hp-api/client'
import { toCharacterSummary } from '@/lib/hp-api/mappers'
import styles from './page.module.scss'

export default async function HomePage() {
  const characters = (await getCharacters()).map(toCharacterSummary)

  return (
    <section id="personagens" className={styles.section}>
      <h2 className={styles.title}>Personagens</h2>
      <CharacterGrid characters={characters.slice(0, 24)} />
    </section>
  )
}
