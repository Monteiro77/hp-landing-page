import type { Metadata, Viewport } from 'next'
import { Crimson_Pro, Mulish } from 'next/font/google'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { SITE } from '@/constants/site'
import '@/styles/globals.scss'

// Fontes livres no espírito do site oficial: serifada clássica nos títulos e sans geométrica
// no texto. O next/font hospeda os arquivos junto com o site (sem requisição ao Google).
const crimson = Crimson_Pro({ subsets: ['latin'], variable: '--font-crimson', display: 'swap' })
const mulish = Mulish({ subsets: ['latin'], variable: '--font-mulish', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Personagens do universo Harry Potter`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
  },
}

export const viewport: Viewport = {
  themeColor: '#00001b',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={`${crimson.variable} ${mulish.variable}`}>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
