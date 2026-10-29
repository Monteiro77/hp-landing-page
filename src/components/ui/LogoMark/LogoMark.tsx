import type { SVGProps } from 'react'

/** Marca do site: um brasão com uma estrela mágica. Usa `currentColor`. */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M16 2.5 27 7v8.6c0 6.9-4.7 11.9-11 13.9C9.7 27.5 5 22.5 5 15.6V7l11-4.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16 8.5c.4 3.9 2.1 5.6 6 6-3.9.4-5.6 2.1-6 6-.4-3.9-2.1-5.6-6-6 3.9-.4 5.6-2.1 6-6Z"
        fill="currentColor"
      />
    </svg>
  )
}
