import type { SVGProps } from 'react'

/**
 * Marca do site: silhueta minimalista do bruxo (cabelo bagunçado, cicatriz de raio e óculos
 * redondos), desenhada para este projeto. Usa `currentColor`.
 */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M8 37C5 30 5 22 9 17c-1-4 2-8 6-8 2-4 8-5 11-3 3-3 9-3 12-.5 4-2 10-.5 12 3.5 5 1 8 6 6 11 3 5 2 11 0 16l-3-7-2.5 4-3-8.5-3.5 5.5-4-7.5-3.5 6-4-7.5-4 6.5-4.5-6-3.5 6.5-3-4.5-3.5 7.5-2.5-4Z" />
      <path d="M31 27.5 25.5 34h4l-3.5 7 8-8.5h-4.2l3.6-5Z" />
      <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
        <circle cx="21.5" cy="47.5" r="8.2" />
        <circle cx="42.5" cy="47.5" r="8.2" />
        <path d="M29.7 46.5c1.4-1.5 3.2-1.5 4.6 0M13.3 46.5 9 43M50.7 46.5l4.3-3.5" />
      </g>
    </svg>
  )
}
