import { useEffect } from 'react'
import { type CharacterFilters, filtersToSearchParams } from '@/lib/characters/filters'

/**
 * Reflete os filtros na query string, para que a busca possa ser compartilhada ou recarregada.
 *
 * Usa `history.replaceState` (integrado ao roteador do Next.js) em vez de `router.replace`:
 * a filtragem acontece no navegador, então não há motivo para uma nova requisição ao servidor.
 */
export function useFiltersInUrl(filters: CharacterFilters, delay = 300) {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const { pathname, search, hash } = window.location
      const query = filtersToSearchParams(filters).toString()
      const nextSearch = query ? `?${query}` : ''

      if (nextSearch !== search) {
        window.history.replaceState(null, '', `${pathname}${nextSearch}${hash}`)
      }
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [filters, delay])
}
