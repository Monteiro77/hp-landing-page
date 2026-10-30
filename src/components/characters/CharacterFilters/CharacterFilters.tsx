'use client'

import { useId } from 'react'
import { HouseCrest } from '@/components/houses/HouseCrest'
import { Icon } from '@/components/ui/Icon'
import { HOUSE_IDS, HOUSES, isHouseId } from '@/constants/houses'
import {
  type CharacterFilters as Filters,
  type HouseFilter,
  type SortOrder,
  type StatusFilter,
  hasActiveFilters,
} from '@/lib/characters/filters'
import styles from './CharacterFilters.module.scss'

const HOUSE_OPTIONS: Array<{ value: HouseFilter; label: string }> = [
  { value: 'all', label: 'Todas as casas' },
  ...HOUSE_IDS.map((id) => ({ value: id, label: HOUSES[id].name })),
  { value: 'none', label: 'Sem casa' },
]

const STATUS_OPTIONS: Array<{ value: StatusFilter; label: string }> = [
  { value: 'all', label: 'Status: todos' },
  { value: 'alive', label: 'Vivos' },
  { value: 'deceased', label: 'Falecidos' },
]

const SORT_OPTIONS: Array<{ value: SortOrder; label: string }> = [
  { value: 'relevance', label: 'Relevância' },
  { value: 'name-asc', label: 'Nome (A–Z)' },
  { value: 'name-desc', label: 'Nome (Z–A)' },
]

interface CharacterFiltersProps {
  filters: Filters
  onChange: (changes: Partial<Filters>) => void
  onReset: () => void
}

export function CharacterFilters({ filters, onChange, onReset }: CharacterFiltersProps) {
  const id = useId()

  return (
    <form
      role="search"
      aria-label="Filtrar personagens"
      className={styles.filters}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className={styles.row}>
        <div className={styles.search}>
          <label htmlFor={`${id}-query`} className="visually-hidden">
            Buscar por personagem ou ator
          </label>
          <Icon name="search" size={18} className={styles.searchIcon} />
          <input
            id={`${id}-query`}
            type="search"
            className={styles.searchInput}
            placeholder="Buscar por nome ou ator"
            autoComplete="off"
            spellCheck={false}
            maxLength={80}
            value={filters.query}
            onChange={(event) => onChange({ query: event.target.value })}
          />
          {filters.query && (
            <button
              type="button"
              className={styles.clearSearch}
              onClick={() => onChange({ query: '' })}
              aria-label="Limpar busca"
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </div>

        <div className={styles.selectWrapper}>
          <label htmlFor={`${id}-status`} className="visually-hidden">
            Status
          </label>
          <select
            id={`${id}-status`}
            className={styles.select}
            value={filters.status}
            onChange={(event) => onChange({ status: event.target.value as StatusFilter })}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Icon name="chevronDown" size={16} className={styles.selectIcon} />
        </div>

        <div className={styles.selectWrapper}>
          <label htmlFor={`${id}-sort`} className="visually-hidden">
            Ordenar por
          </label>
          <select
            id={`${id}-sort`}
            className={styles.select}
            value={filters.sort}
            onChange={(event) => onChange({ sort: event.target.value as SortOrder })}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Icon name="chevronDown" size={16} className={styles.selectIcon} />
        </div>
      </div>

      <div className={styles.row}>
        <fieldset className={styles.houses}>
          <legend className="visually-hidden">Casa</legend>
          {HOUSE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={styles.chip}
              data-house={option.value === 'all' ? undefined : option.value}
            >
              <input
                type="radio"
                name={`${id}-house`}
                value={option.value}
                checked={filters.house === option.value}
                onChange={() => onChange({ house: option.value })}
              />
              <span className={styles.chipLabel}>
                {isHouseId(option.value) ? (
                  <HouseCrest house={option.value} size={22} className={styles.crest} />
                ) : (
                  option.value === 'none' && <span className={styles.swatch} aria-hidden="true" />
                )}
                {option.label}
              </span>
            </label>
          ))}
        </fieldset>

        <div className={styles.extras}>
          {/* Fora de listas, um botão de alternância é mais claro que um switch. */}
          <button
            type="button"
            className={styles.toggle}
            aria-pressed={filters.onlyWithImage}
            onClick={() => onChange({ onlyWithImage: !filters.onlyWithImage })}
          >
            {filters.onlyWithImage && <Icon name="check" size={16} />}
            Apenas com foto
          </button>

          {hasActiveFilters(filters) && (
            <button type="button" className={styles.reset} onClick={onReset}>
              Limpar filtros
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
