import styles from './CharacterProfile.module.scss'

/** Placeholder com o formato do perfil, exibido durante a navegação. */
export function CharacterProfileSkeleton() {
  return (
    <div className={styles.profile} aria-busy="true" aria-label="Carregando personagem">
      <div className={`${styles.frame} ${styles.skeleton}`}>
        <div className={styles.portrait} />
      </div>
      <div className={styles.content} aria-hidden="true">
        <div className={styles.header}>
          <span className={styles.skeletonLine} style={{ width: '6rem' }} />
          <span className={styles.skeletonLine} style={{ width: '70%', height: '3rem' }} />
          <span className={styles.skeletonLine} style={{ width: '50%' }} />
        </div>
        <div className={`${styles.details} ${styles.skeleton}`} style={{ height: '24rem' }} />
      </div>
    </div>
  )
}
