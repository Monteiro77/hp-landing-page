import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/text'
import styles from './SectionHeading.module.scss'

interface SectionHeadingProps {
  id?: string
  eyebrow?: string
  title: string
  description?: ReactNode
  className?: string
}

/** Filete com losango que ladeia os títulos de seção. */
function Ornament({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 12"
      className={cn(styles.ornament, flip && styles.flip)}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 6h96" stroke="currentColor" strokeWidth="1" />
      <path d="M104 1.5 108.5 6 104 10.5 99.5 6Z" fill="none" stroke="currentColor" />
      <circle cx="115" cy="6" r="1.6" fill="currentColor" />
    </svg>
  )
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn(styles.heading, className)}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <div className={styles.titleRow}>
        <Ornament />
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        <Ornament flip />
      </div>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  )
}
