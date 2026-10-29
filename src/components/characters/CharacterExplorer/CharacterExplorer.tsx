'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import { isHouseId } from '@/constants/houses'
import { useFiltersInUrl } from '@/hooks/useFiltersInUrl'
import {
  type CharacterFilters as Filters,
  DEFAULT_FILTERS,
  filterCharacters,
} from '@/lib/characters/filters'
import { cn, pluralize } from '@/lib/utils/text'
import type { CharacterSummary } from '@/types/character'
import { CharacterFilters } from '../CharacterFilters'
import { CharacterGrid } from '../CharacterGrid'
import { EmptyState } from '../EmptyState'
import styles from './CharacterExplorer.module.scss'

/** Quantos cards são renderizados por vez (e a cada "Carregar mais"). */
export const PAGE_SIZE = 24

interface CharacterExplorerProps {
  characters: CharacterSummary[]
  initialFilters: Filters
}

/**
 * Busca, filtros e paginação da lista de personagens.
 *
 * Os ~440 personagens já chegam do servidor, então filtrar no navegador é instantâneo e não
 * gera novas requisições. Só uma página de cards é renderizada por vez, o que mantém o DOM
 * leve e evita baixar imagens que a pessoa ainda não vai ver.
 */
export function CharacterExplorer({ characters, initialFilters }: CharacterExplorerProps) {
  const [filters, setFilters] = useState(initialFilters)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Mantém o campo de busca responsivo enquanto a grade é recalculada.
  const deferredFilters = useDeferredValue(filters)
  const isUpdating = deferredFilters !== filters

  const results = useMemo(
    () => filterCharacters(characters, deferredFilters),
    [characters, deferredFilters],
  )
  const visibleCharacters = results.slice(0, visibleCount)
  const hasMore = visibleCount < results.length

  useFiltersInUrl(filters)

  function updateFilters(changes: Partial<Filters>) {
    setFilters((current) => ({ ...current, ...changes }))
    setVisibleCount(PAGE_SIZE)
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div data-house={isHouseId(filters.house) ? filters.house : undefined}>
      <CharacterFilters filters={filters} onChange={updateFilters} onReset={resetFilters} />

      <p className={styles.summary} role="status">
        {pluralize(results.length, 'personagem encontrado', 'personagens encontrados')}
      </p>

      {results.length === 0 ? (
        <EmptyState onReset={resetFilters} />
      ) : (
        <div className={cn(styles.results, isUpdating && styles.updating)}>
          <CharacterGrid characters={visibleCharacters} />
        </div>
      )}

      {hasMore && (
        <div className={styles.more}>
          <p className={styles.progress}>
            Mostrando {visibleCharacters.length} de {results.length}
          </p>
          <button
            type="button"
            className={styles.moreButton}
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            Carregar mais personagens
          </button>
        </div>
      )}
    </div>
  )
}
