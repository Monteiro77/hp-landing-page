import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/text'
import styles from './SectionHeading.module.scss'

interface SectionHeadingProps {
  id?: string
  eyebrow: string
  title: string
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn(styles.heading, align === 'center' && styles.center, className)}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  )
}
