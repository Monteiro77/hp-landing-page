import { HOUSES } from '@/constants/houses'
import type { HouseId } from '@/types/character'
import styles from './HouseCrest.module.scss'

interface HouseCrestProps {
  house: HouseId
  className?: string
}

/** Brasão estilizado com a inicial da casa, colorido pelas variáveis `--house-*`. */
export function HouseCrest({ house, className }: HouseCrestProps) {
  const initial = HOUSES[house].name.charAt(0)

  return (
    <svg
      viewBox="0 0 64 76"
      className={className}
      data-house={house}
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={styles.shield}
        d="M32 2 60 12v22c0 19-12 33-28 40C16 67 4 53 4 34V12L32 2Z"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        className={styles.inner}
        d="M32 9.5 53.5 17.2V34c0 14.8-9.3 26-21.5 32-12.2-6-21.5-17.2-21.5-32V17.2L32 9.5Z"
        strokeWidth="1"
      />
      <text className={styles.initial} x="32" y="47" textAnchor="middle">
        {initial}
      </text>
    </svg>
  )
}
