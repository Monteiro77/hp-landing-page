import Image, { type StaticImageData } from 'next/image'
import gryffindor from '@/assets/images/houses/gryffindor.png'
import hufflepuff from '@/assets/images/houses/hufflepuff.png'
import ravenclaw from '@/assets/images/houses/ravenclaw.png'
import slytherin from '@/assets/images/houses/slytherin.png'
import { HOUSES } from '@/constants/houses'
import type { HouseId } from '@/types/character'

/** Brasões das casas (ícones do Icons8, 48x48px). */
export const HOUSE_CRESTS: Record<HouseId, StaticImageData> = {
  gryffindor,
  slytherin,
  hufflepuff,
  ravenclaw,
}

interface HouseCrestProps {
  house: HouseId
  /** Tamanho em pixels. Os originais têm 48px, então acima disso a imagem perde nitidez. */
  size: number
  /** Quando o nome da casa já aparece ao lado, o brasão é decorativo. */
  decorative?: boolean
  className?: string
}

export function HouseCrest({ house, size, decorative = true, className }: HouseCrestProps) {
  return (
    <Image
      src={HOUSE_CRESTS[house]}
      alt={decorative ? '' : `Brasão da ${HOUSES[house].name}`}
      width={size}
      height={size}
      quality={90}
      className={className}
    />
  )
}
