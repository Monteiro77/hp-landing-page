import Link from 'next/link'
import { LogoMark } from '@/components/ui/LogoMark'
import { SITE } from '@/constants/site'
import styles from './Footer.module.scss'

const LINKS = [
  { href: '/#casas', label: 'Casas de Hogwarts', external: false },
  { href: '/#personagens', label: 'Personagens', external: false },
  { href: SITE.apiDocsUrl, label: 'HP-API', external: true },
  { href: SITE.repositoryUrl, label: 'Código no GitHub', external: true },
] as const

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.box}>
        <div className={styles.top}>
          <ul className={styles.links}>
            {LINKS.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href}>{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
          <p className={styles.brand}>
            <LogoMark className={styles.logo} />
            {SITE.name}
          </p>
        </div>

        <div className={styles.bottom}>
          <p className={styles.caption}>{SITE.name} · Projeto não oficial</p>
          <p>
            Dados fornecidos pela HP-API. Brasões das casas por{' '}
            <a href="https://icons8.com" target="_blank" rel="noreferrer">
              Icons8
            </a>
            . Projeto sem fins comerciais, desenvolvido como teste técnico.
          </p>
          <p>
            Harry Potter, seus personagens e elementos são marcas da Warner Bros. Entertainment Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}
