import Link from 'next/link'
import { HousePennant } from '@/components/houses/HousePennant'
import { Icon } from '@/components/ui/Icon'
import { LogoMark } from '@/components/ui/LogoMark'
import { HOUSE_IDS, HOUSES } from '@/constants/houses'
import { SITE } from '@/constants/site'
import styles from './Header.module.scss'

const NAV_LINKS = [
  { href: '/#casas', label: 'Casas' },
  { href: '/#personagens', label: 'Personagens' },
] as const

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <nav aria-label="Navegação principal" className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/" className={styles.brand}>
          <LogoMark className={styles.logo} />
          <span className={styles.brandName}>{SITE.name}</span>
        </Link>

        <a
          href={SITE.repositoryUrl}
          className={styles.github}
          target="_blank"
          rel="noreferrer"
          aria-label="Código-fonte no GitHub (abre em nova aba)"
        >
          <Icon name="github" size={18} />
          <span className={styles.githubLabel}>GitHub</span>
        </a>
      </div>

      {/* Atalhos para a lista já filtrada por casa, como a linha de pílulas do site oficial. */}
      <nav aria-label="Personagens por casa" className={styles.houses}>
        <ul className={styles.houseList}>
          {HOUSE_IDS.map((id) => (
            <li key={id}>
              <Link href={`/?house=${id}#personagens`} className={styles.housePill}>
                <HousePennant house={id} className={styles.pennant} />
                {HOUSES[id].name}
                <Icon name="chevronRight" size={14} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
