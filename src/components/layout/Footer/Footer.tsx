import { LogoMark } from '@/components/ui/LogoMark'
import { SITE } from '@/constants/site'
import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <LogoMark className={styles.logo} />
          <span>{SITE.name}</span>
        </div>

        <div className={styles.content}>
          <p>
            Dados fornecidos pela{' '}
            <a href={SITE.apiDocsUrl} target="_blank" rel="noreferrer">
              HP-API
            </a>
            . Código disponível no{' '}
            <a href={SITE.repositoryUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
            .
          </p>
          <p className={styles.legal}>
            Harry Potter e seus personagens são marcas da Warner Bros. Entertainment. Projeto sem
            fins comerciais, desenvolvido como teste técnico.
          </p>
        </div>
      </div>
    </footer>
  )
}
