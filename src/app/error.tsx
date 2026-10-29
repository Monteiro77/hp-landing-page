'use client' // Error boundaries precisam ser Client Components.

import { useEffect } from 'react'
import { PageMessage } from '@/components/ui/PageMessage'

interface ErrorPageProps {
  error: unknown
  retry: () => void
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <PageMessage
      eyebrow="Erro ao carregar"
      title="Não foi possível carregar os personagens"
      description="A HP-API está fora do ar ou demorou para responder. Aguarde alguns segundos e tente novamente."
      actionLabel="Tentar novamente"
      onAction={retry}
    />
  )
}
