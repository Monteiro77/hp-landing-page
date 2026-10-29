import { formatHouse } from '@/lib/characters/format'
import { cn } from '@/lib/utils/text'
import type { HouseId } from '@/types/character'
import styles from './HouseTag.module.scss'

interface HouseTagProps {
  house: HouseId | null
  className?: string
}

/** Nome da casa com a cor correspondente. */
export function HouseTag({ house, className }: HouseTagProps) {
  return (
    <span className={cn(styles.tag, className)} data-house={house ?? 'none'}>
      <span className={styles.swatch} aria-hidden="true" />
      {formatHouse(house)}
    </span>
  )
}
