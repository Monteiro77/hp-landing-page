import { Suspense } from 'react'
import {
  CharacterExplorer,
  CharacterExplorerSkeleton,
} from '@/components/characters/CharacterExplorer'
import { Hero } from '@/components/home/Hero'
import { HouseShowcase } from '@/components/home/HouseShowcase'
import { Horizon } from '@/components/ui/Horizon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { filtersToSearchParams, parseFilters } from '@/lib/characters/filters'
import { getCharacterStats } from '@/lib/characters/stats'
import { getCharacters } from '@/lib/hp-api/client'
import { toCharacterSummary } from '@/lib/hp-api/mappers'
import { pluralize } from '@/lib/utils/text'
import type { CharacterSummary } from '@/types/character'
import styles from './page.module.scss'

interface CharacterResultsProps {
  characters: CharacterSummary[]
  searchParams: PageProps<'/'>['searchParams']
}

/**
 * Única parte da página que depende da requisição (os filtros na URL). Fica dentro de um
 * <Suspense>, então todo o resto é pré-renderizado como HTML estático.
 */
async function CharacterResults({ characters, searchParams }: CharacterResultsProps) {
  const filters = parseFilters(await searchParams)

  // A `key` remonta o explorador quando a URL muda por navegação (ex.: link de uma casa).
  return (
    <CharacterExplorer
      key={filtersToSearchParams(filters).toString()}
      characters={characters}
      initialFilters={filters}
    />
  )
}

export default async function HomePage({ searchParams }: PageProps<'/'>) {
  const characters = (await getCharacters()).map(toCharacterSummary)
  const stats = getCharacterStats(characters)

  return (
    <>
      <Hero stats={stats} />
      <HouseShowcase counts={stats.byHouse} />

      <section id="personagens" className={styles.section} aria-labelledby="personagens-title">
        <div className={styles.inner}>
          <SectionHeading
            id="personagens-title"
            eyebrow={pluralize(stats.total, 'personagem', 'personagens')}
            title="Quem é quem no mundo bruxo"
            description="Busque pelo nome do personagem ou do ator e filtre por casa ou status."
          />
          <Suspense fallback={<CharacterExplorerSkeleton />}>
            <CharacterResults characters={characters} searchParams={searchParams} />
          </Suspense>
        </div>
        <Horizon variant="hills" className={styles.horizon} />
      </section>
    </>
  )
}
