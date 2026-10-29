import { formatStatus } from '@/lib/characters/format'
import { cn } from '@/lib/utils/text'
import styles from './StatusBadge.module.scss'

interface StatusBadgeProps {
  alive: boolean
  gender: string | null
  className?: string
}

export function StatusBadge({ alive, gender, className }: StatusBadgeProps) {
  return (
    <span className={cn(styles.badge, alive ? styles.alive : styles.deceased, className)}>
      <span className={styles.dot} aria-hidden="true" />
      <span className="visually-hidden">Status: </span>
      {formatStatus(alive, gender)}
    </span>
  )
}
