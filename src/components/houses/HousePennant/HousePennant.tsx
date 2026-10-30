import { HOUSES } from '@/constants/houses'
import type { HouseId } from '@/types/character'
import styles from './HousePennant.module.scss'

interface HousePennantProps {
  house: HouseId
  className?: string
}

/** Estandarte da casa com a inicial no brasão, colorido pelas variáveis `--house-*`. */
export function HousePennant({ house, className }: HousePennantProps) {
  const initial = HOUSES[house].name.charAt(0)

  return (
    <svg
      viewBox="0 0 60 86"
      className={className}
      data-house={house}
      aria-hidden="true"
      focusable="false"
    >
      <rect className={styles.rod} x="0" y="0" width="60" height="5" rx="2.5" />
      <path className={styles.field} d="M5 5h50v63L30 82 5 68Z" />
      <path className={styles.trim} d="M10 9h40v56L30 76.5 10 65Z" strokeWidth="1.5" />
      <circle className={styles.trim} cx="30" cy="38" r="14" strokeWidth="1.5" />
      <text className={styles.initial} x="30" y="45.5" textAnchor="middle">
        {initial}
      </text>
    </svg>
  )
}
