import { CharacterGridSkeleton } from '../CharacterGrid'
import styles from './CharacterExplorer.module.scss'

/** Fallback do Suspense enquanto os filtros da URL são lidos. */
export function CharacterExplorerSkeleton() {
  return (
    <div>
      <div className={styles.filtersSkeleton} aria-hidden="true" />
      <CharacterGridSkeleton />
    </div>
  )
}
