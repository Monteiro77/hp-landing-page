import type { HouseId } from '@/types/character'
import { HOUSE_CRESTS } from '../HouseCrest'
import styles from './HousePennant.module.scss'

interface HousePennantProps {
  house: HouseId
  className?: string
}

/** Estandarte da casa com o brasão ao centro, colorido pelas variáveis `--house-*`. */
export function HousePennant({ house, className }: HousePennantProps) {
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
      {/* 30 unidades ≈ 52px no maior estandarte, perto dos 48px originais do ícone. */}
      <image href={HOUSE_CRESTS[house].src} x="15" y="21" width="30" height="30" />
    </svg>
  )
}
