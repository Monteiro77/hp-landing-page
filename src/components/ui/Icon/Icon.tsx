import type { ReactNode, SVGProps } from 'react'

const STROKE_ICONS = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  close: <path d="M18 6 6 18M6 6l12 12" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  arrowLeft: <path d="M19 12H5m6-6-6 6 6 6" />,
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  refresh: <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4.5h-4.5" />,
} satisfies Record<string, ReactNode>

const FILL_ICONS = {
  sparkle: (
    <path d="M12 2.5c.5 4.6 2.4 6.5 7 7-4.6.5-6.5 2.4-7 7-.5-4.6-2.4-6.5-7-7 4.6-.5 6.5-2.4 7-7Zm6.5 12c.2 2 1 2.8 3 3-2 .2-2.8 1-3 3-.2-2-1-2.8-3-3 2-.2 2.8-1 3-3Z" />
  ),
  github: (
    <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  ),
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof STROKE_ICONS | keyof typeof FILL_ICONS

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
}

/** Ícones SVG inline: sem requisições extras e herdando a cor do texto (`currentColor`). */
export function Icon({ name, size = 20, ...props }: IconProps) {
  const isFilled = name in FILL_ICONS
  const content = isFilled
    ? FILL_ICONS[name as keyof typeof FILL_ICONS]
    : STROKE_ICONS[name as keyof typeof STROKE_ICONS]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...(isFilled
        ? { fill: 'currentColor' }
        : {
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 2,
            strokeLinecap: 'round' as const,
            strokeLinejoin: 'round' as const,
          })}
      {...props}
    >
      {content}
    </svg>
  )
}
