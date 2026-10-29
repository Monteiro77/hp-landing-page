import type { MetadataRoute } from 'next'
import { SITE } from '@/constants/site'
import { getCharacters } from '@/lib/hp-api/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const characters = await getCharacters()

  return [
    { url: SITE.url, changeFrequency: 'weekly', priority: 1 },
    ...characters.map((character) => ({
      url: `${SITE.url}/personagem/${character.id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
