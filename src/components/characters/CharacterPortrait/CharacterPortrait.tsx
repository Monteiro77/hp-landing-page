'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn, getInitials } from '@/lib/utils/text'
import styles from './CharacterPortrait.module.scss'

/** Deve constar em `images.qualities` no next.config.ts. */
const PORTRAIT_QUALITY = 90

interface CharacterPortraitProps {
  name: string
  image: string | null
  /** Larguras que o retrato ocupa em cada breakpoint (atributo `sizes` do next/image). */
  sizes: string
  /** Use no retrato que for o maior elemento visível da página (LCP). */
  preload?: boolean
  /** Quando o nome já aparece ao lado (ex.: nos cards), o retrato é decorativo para leitores de tela. */
  decorative?: boolean
  className?: string
}

/**
 * Retrato do personagem otimizado pelo next/image (AVIF/WebP, lazy loading e `srcset`).
 * Sem imagem na API, ou se ela falhar ao carregar, mostra um monograma com as cores da casa.
 */
export function CharacterPortrait({
  name,
  image,
  sizes,
  preload = false,
  decorative = false,
  className,
}: CharacterPortraitProps) {
  const [hasError, setHasError] = useState(false)
  const showImage = image !== null && !hasError

  return (
    <div className={cn(styles.portrait, className)}>
      {showImage ? (
        <Image
          src={image}
          alt={decorative ? '' : `Retrato de ${name}`}
          fill
          sizes={sizes}
          quality={PORTRAIT_QUALITY}
          preload={preload}
          className={styles.image}
          onError={() => setHasError(true)}
        />
      ) : (
        <div
          className={styles.fallback}
          {...(decorative
            ? { 'aria-hidden': true }
            : { role: 'img', 'aria-label': `${name} (sem imagem disponível)` })}
        >
          <span className={styles.initials}>{getInitials(name)}</span>
        </div>
      )}
    </div>
  )
}
