import type { Metadata } from 'next'
import { PageMessage } from '@/components/ui/PageMessage'

export const metadata: Metadata = {
  title: 'Página não encontrada',
}

export default function NotFound() {
  return (
    <PageMessage
      eyebrow="Erro 404"
      title="Página não encontrada"
      description="O endereço pode estar incorreto ou o personagem não existe na HP-API. Volte para a lista e busque pelo nome."
      actionLabel="Ver todos os personagens"
      actionHref="/#personagens"
    />
  )
}
