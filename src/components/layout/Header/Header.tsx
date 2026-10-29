import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import { LogoMark } from '@/components/ui/LogoMark'
import { SITE } from '@/constants/site'
import styles from './Header.module.scss'

const NAV_LINKS = [
  { href: '/#casas', label: 'Casas' },
  { href: '/#personagens', label: 'Personagens' },
] as const

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <LogoMark className={styles.logo} />
          <span className={styles.brandName}>{SITE.name}</span>
        </Link>

        <nav aria-label="Navegação principal">
          <ul className={styles.nav}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={SITE.repositoryUrl}
                className={styles.iconLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Código-fonte no GitHub (abre em nova aba)"
              >
                <Icon name="github" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
