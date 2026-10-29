import Link from 'next/link'
import styles from './PageMessage.module.scss'

interface PageMessageProps {
  eyebrow: string
  title: string
  description: string
  actionLabel: string
  /** Link da ação; sem ele, a ação é um botão que chama `onAction`. */
  actionHref?: string
  onAction?: () => void
}

/** Mensagem de página inteira (404, erro): diz o que aconteceu e qual o próximo passo. */
export function PageMessage({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: PageMessageProps) {
  return (
    <section className={styles.message}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      {actionHref ? (
        <Link href={actionHref} className={styles.action}>
          {actionLabel}
        </Link>
      ) : (
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </section>
  )
}
