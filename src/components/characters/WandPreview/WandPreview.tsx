import {
  WAND_CORES,
  describeWand,
  getHandleStyle,
  getWandCore,
  getWoodTone,
} from '@/lib/characters/wand'
import { cn } from '@/lib/utils/text'
import type { Wand } from '@/types/character'
import styles from './WandPreview.module.scss'

// Geometria em unidades do viewBox: 30 unidades por polegada, régua de 0 a 18 polegadas.
const MAX_INCHES = 18
const PX_PER_INCH = 30
const X0 = 24
const CY = 40
const RULER_Y = 84
const RULER_END = X0 + MAX_INCHES * PX_PER_INCH
/** Varinhas sem comprimento conhecido são desenhadas com o tamanho mais comum. */
const FALLBACK_LENGTH = 11
/** Engrossa o desenho na vertical sem alterar o comprimento (que segue a régua). */
const THICKEN = `translate(0 ${CY}) scale(1 1.5) translate(0 ${-CY})`

interface WandPreviewProps {
  /** `null` desenha a silhueta de uma varinha sem registro. */
  wand: Wand | null
  /** Identificador único na página, usado nos ids dos gradientes do SVG. */
  id: string
  variant?: 'full' | 'compact'
  className?: string
}

/** Contorno da varinha: pomo arredondado, cabo e haste afinando até a ponta. */
function buildOutline(handleEnd: number, tipX: number): string {
  return [
    `M${X0} ${CY}`,
    `C${X0} ${CY - 7} ${X0 + 6} ${CY - 7.5} ${X0 + 10} ${CY - 6.5}`,
    `L${handleEnd} ${CY - 5}`,
    `Q${handleEnd + 4} ${CY - 5.6} ${handleEnd + 8} ${CY - 4}`,
    `L${tipX} ${CY - 1.4}`,
    `Q${tipX + 3} ${CY} ${tipX} ${CY + 1.4}`,
    `L${handleEnd + 8} ${CY + 4}`,
    `Q${handleEnd + 4} ${CY + 5.6} ${handleEnd} ${CY + 5}`,
    `L${X0 + 10} ${CY + 6.5}`,
    `C${X0 + 6} ${CY + 7.5} ${X0} ${CY + 7} ${X0} ${CY}Z`,
  ].join(' ')
}

function Ruler({ length }: { length: number | null }) {
  const ticks = Array.from({ length: MAX_INCHES + 1 }, (_, inch) => inch)

  return (
    <g className={styles.ruler}>
      <line x1={X0} y1={RULER_Y} x2={RULER_END} y2={RULER_Y} />
      {length !== null && (
        <line
          className={styles.measure}
          x1={X0}
          y1={RULER_Y}
          x2={X0 + length * PX_PER_INCH}
          y2={RULER_Y}
        />
      )}
      {ticks.map((inch) => {
        const x = X0 + inch * PX_PER_INCH
        const isMajor = inch % 3 === 0
        return (
          <g key={inch}>
            <line x1={x} y1={RULER_Y} x2={x} y2={RULER_Y + (isMajor ? 8 : 4)} />
            {isMajor && (
              <text x={x} y={RULER_Y + 20} textAnchor="middle">
                {inch}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}

/**
 * Desenho da varinha gerado a partir dos dados da API: a cor vem da madeira, o tamanho é o
 * comprimento real em polegadas, a ponta brilha na cor do núcleo e o cabo varia com a madeira.
 */
export function WandPreview({ wand, id, variant = 'full', className }: WandPreviewProps) {
  const isCompact = variant === 'compact'
  const length = wand?.length ?? FALLBACK_LENGTH
  const tipX = X0 + length * PX_PER_INCH
  const handleEnd = X0 + Math.min(3.4, length * 0.3) * PX_PER_INCH
  const outline = buildOutline(handleEnd, tipX)

  const tone = getWoodTone(wand?.wood ?? null)
  const core = getWandCore(wand?.core ?? null)
  const handleStyle = getHandleStyle(wand?.wood ?? null)
  const ids = { wood: `wand-wood-${id}`, glow: `wand-glow-${id}`, clip: `wand-clip-${id}` }

  const viewBox = isCompact
    ? `0 ${CY - 12} ${RULER_END + 12} 24`
    : `0 ${CY - 26} ${RULER_END + X0} ${RULER_Y - CY + 50}`
  const label = wand ? `Varinha: ${describeWand(wand)}` : 'Varinha sem registro'

  if (!wand) {
    return (
      <svg viewBox={viewBox} className={cn(styles.wand, className)} role="img" aria-label={label}>
        <path d={outline} className={styles.unknown} transform={THICKEN} />
        {!isCompact && <Ruler length={null} />}
      </svg>
    )
  }

  return (
    <svg viewBox={viewBox} className={cn(styles.wand, className)} role="img" aria-label={label}>
      <defs>
        <linearGradient id={ids.wood} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone.light} />
          <stop offset="0.45" stopColor={tone.base} />
          <stop offset="1" stopColor={tone.dark} />
        </linearGradient>
        {core && (
          <radialGradient id={ids.glow}>
            <stop offset="0" stopColor={WAND_CORES[core].glow} stopOpacity="0.95" />
            <stop offset="1" stopColor={WAND_CORES[core].glow} stopOpacity="0" />
          </radialGradient>
        )}
        <clipPath id={ids.clip}>
          <path d={outline} />
        </clipPath>
      </defs>

      {!isCompact && <Ruler length={wand.length} />}

      {core && (
        <circle
          className={cn(styles.glow, !isCompact && styles.pulse)}
          cx={tipX}
          cy={CY}
          r={isCompact ? 9 : 20}
          fill={`url(#${ids.glow})`}
        />
      )}

      <g transform={THICKEN}>
        <path d={outline} fill={`url(#${ids.wood})`} stroke={tone.dark} strokeWidth="0.8" />

        <g clipPath={`url(#${ids.clip})`} stroke={tone.dark} fill="none">
          {/* Veios da madeira ao longo da haste */}
          <path
            d={`M${handleEnd + 10} ${CY - 1.6} L${tipX - 8} ${CY - 0.6}`}
            strokeWidth="0.6"
            opacity="0.5"
          />
          <path
            d={`M${handleEnd + 30} ${CY + 1.4} L${tipX - 30} ${CY + 0.5}`}
            strokeWidth="0.5"
            opacity="0.4"
          />

          {handleStyle === 'rings' &&
            [X0 + 12, handleEnd - 18, handleEnd - 4].map((x) => (
              <rect
                key={x}
                x={x}
                y={CY - 8}
                width="2.6"
                height="16"
                fill={tone.dark}
                stroke="none"
                opacity="0.85"
              />
            ))}

          {handleStyle === 'spiral' &&
            Array.from({ length: Math.floor((handleEnd - X0) / 7) }, (_, index) => {
              const x = X0 + 6 + index * 7
              return (
                <line
                  key={x}
                  x1={x}
                  y1={CY - 8}
                  x2={x - 6}
                  y2={CY + 8}
                  strokeWidth="1.4"
                  opacity="0.6"
                />
              )
            })}
        </g>

        {handleStyle === 'knots' &&
          [0.4, 0.62].map((position) => (
            <ellipse
              key={position}
              cx={handleEnd + (tipX - handleEnd) * position}
              cy={CY}
              rx="3"
              ry={4.2 - position * 2}
              fill={tone.base}
              stroke={tone.dark}
              strokeWidth="0.6"
            />
          ))}
      </g>

      {core && <circle cx={tipX} cy={CY} r={isCompact ? 1.4 : 2} fill="#ffffff" />}
    </svg>
  )
}
