import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { CharacterGrid } from '@/components/characters/CharacterGrid'
import {
  CharacterProfile,
  CharacterProfileSkeleton,
} from '@/components/characters/CharacterProfile'
import { Horizon } from '@/components/ui/Horizon'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PATRONUS_LABELS } from '@/constants/labels'
import { formatHouse, formatStatus, translate } from '@/lib/characters/format'
import { getCharacterById, getCharacters } from '@/lib/hp-api/client'
import { toCharacterSummary } from '@/lib/hp-api/mappers'
import type { Character } from '@/types/character'
import styles from './page.module.scss'

const RELATED_LIMIT = 4

/** Pré-renderiza a página de todos os personagens no build (uma única chamada à API). */
export async function generateStaticParams() {
  const characters = await getCharacters()
  return characters.map(({ id }) => ({ id }))
}

function describe(character: Character): string {
  const parts = [
    character.house ? `Casa: ${formatHouse(character.house)}` : null,
    character.patronus ? `Patrono: ${translate(character.patronus, PATRONUS_LABELS)}` : null,
    character.actor ? `Interpretado por ${character.actor}` : null,
    `Status: ${formatStatus(character.alive, character.gender)}`,
  ]
  return `${character.name} no universo Harry Potter. ${parts.filter(Boolean).join('. ')}.`
}

export async function generateMetadata({
  params,
}: PageProps<'/personagem/[id]'>): Promise<Metadata> {
  const { id } = await params
  const character = await getCharacterById(id)
  if (!character) return { title: 'Personagem não encontrado' }

  const description = describe(character)
  return {
    title: character.name,
    description,
    alternates: { canonical: `/personagem/${character.id}` },
    openGraph: {
      title: character.name,
      description,
      images: character.image ? [{ url: character.image, alt: character.name }] : undefined,
    },
  }
}

/** Outros membros da mesma casa, priorizando quem tem foto. */
async function getRelatedCharacters(character: Character) {
  if (!character.house) return []

  const characters = await getCharacters()
  return characters
    .filter((other) => other.house === character.house && other.id !== character.id)
    .sort((a, b) => Number(b.image !== null) - Number(a.image !== null))
    .slice(0, RELATED_LIMIT)
    .map(toCharacterSummary)
}

async function CharacterDetails({ params }: Pick<PageProps<'/personagem/[id]'>, 'params'>) {
  const { id } = await params
  const character = await getCharacterById(id)
  if (!character) notFound()

  const related = await getRelatedCharacters(character)

  return (
    <>
      <CharacterProfile character={character} />

      {related.length > 0 && character.house && (
        <section className={styles.related} aria-labelledby="related-title">
          <SectionHeading
            id="related-title"
            title={`Outros membros da ${formatHouse(character.house)}`}
          />
          <CharacterGrid characters={related} />
          <Link href={`/?house=${character.house}#personagens`} className={styles.relatedLink}>
            Ver todos da {formatHouse(character.house)}
            <Icon name="arrowRight" size={16} />
          </Link>
        </section>
      )}
    </>
  )
}

/**
 * Todas as páginas são geradas no build, mas o conteúdo que depende do `id` fica em um
 * <Suspense>: ao navegar pelo site, a estrutura aparece na hora e o perfil logo em seguida.
 */
export default function CharacterPage({ params }: PageProps<'/personagem/[id]'>) {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link href="/#personagens" className={styles.back}>
          <Icon name="arrowLeft" size={18} />
          Todos os personagens
        </Link>

        <Suspense fallback={<CharacterProfileSkeleton />}>
          <CharacterDetails params={params} />
        </Suspense>
      </div>
      <Horizon variant="hills" className={styles.horizon} />
    </div>
  )
}
