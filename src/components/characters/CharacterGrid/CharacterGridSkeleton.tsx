import styles from './CharacterGrid.module.scss'

interface CharacterGridSkeletonProps {
  count?: number
}

/** Placeholder com o mesmo formato da grade, evitando saltos de layout durante o carregamento. */
export function CharacterGridSkeleton({ count = 8 }: CharacterGridSkeletonProps) {
  return (
    <div className={styles.grid} aria-busy="true" aria-label="Carregando personagens">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={styles.skeletonCard} aria-hidden="true">
          <div className={styles.skeletonMedia} />
          <div className={styles.skeletonBody}>
            <span className={styles.skeletonLine} style={{ width: '35%' }} />
            <span className={styles.skeletonLine} style={{ width: '75%', height: '1.25rem' }} />
            <span className={styles.skeletonLine} />
            <span className={styles.skeletonLine} />
            <span className={styles.skeletonLine} style={{ width: '60%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}
