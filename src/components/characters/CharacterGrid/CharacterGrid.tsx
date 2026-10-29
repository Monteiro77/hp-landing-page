import type { CharacterSummary } from '@/types/character'
import { CharacterCard } from '../CharacterCard'
import styles from './CharacterGrid.module.scss'

interface CharacterGridProps {
  characters: CharacterSummary[]
  headingLevel?: 'h2' | 'h3'
}

export function CharacterGrid({ characters, headingLevel }: CharacterGridProps) {
  return (
    <ul className={styles.grid} role="list">
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard character={character} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  )
}
