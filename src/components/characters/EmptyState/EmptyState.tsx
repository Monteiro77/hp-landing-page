import { Icon } from '@/components/ui/Icon'
import styles from './EmptyState.module.scss'

interface EmptyStateProps {
  onReset: () => void
}

/** Exibido quando a busca não encontra ninguém: explica e oferece o próximo passo. */
export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <Icon name="search" size={28} className={styles.icon} />
      <h3 className={styles.title}>Nenhum personagem encontrado</h3>
      <p className={styles.text}>
        Confira a grafia ou busque pelo nome do ator. Você também pode remover os filtros para ver
        todos os personagens.
      </p>
      <button type="button" className={styles.action} onClick={onReset}>
        Limpar filtros
      </button>
    </div>
  )
}
