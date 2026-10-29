# Almanaque Bruxo

Landing page com os personagens do universo Harry Potter, consumindo a [HP-API](https://hp-api.onrender.com). Desenvolvida como teste técnico.

**Aplicação publicada:** _link da Vercel após o deploy_

## Funcionalidades

- **Cards de personagem** com imagem, nome, data de nascimento, casa, patrono, ator/atriz e status (vivo ou não).
- **Busca instantânea** por nome do personagem ou do ator, sem diferenciar acentos e maiúsculas.
- **Filtros** por casa (incluindo "sem casa"), status e "apenas com foto", além de **ordenação** por nome.
- **Filtros na URL** (`/?q=snape&house=slytherin&status=deceased`): a busca pode ser compartilhada ou recarregada.
- **Página de cada personagem** (`/personagem/[id]`) com varinha, espécie, ascendência, intérpretes e outros membros da casa.
- **Seção das casas** com brasão, qualidades e atalho para a lista já filtrada.
- **Tema claro e escuro** automático, seguindo a preferência do sistema.
- Estados de **carregamento** (skeletons), **lista vazia**, **erro** com "Tentar novamente" e **404**.
- Textos em português, com concordância de gênero ("Viva", "Falecido", "Aluna de Hogwarts") e tradução de patronos, espécies e casas.

## Tecnologias

| Item        | Escolha                                                                     |
| ----------- | --------------------------------------------------------------------------- |
| Framework   | [Next.js 16](https://nextjs.org) (App Router, Cache Components) + React 19  |
| Linguagem   | TypeScript (modo `strict`)                                                  |
| Estilização | SCSS com CSS Modules                                                        |
| API         | REST: `GET https://hp-api.onrender.com/api/characters`                      |
| Testes      | Vitest                                                                      |
| Qualidade   | ESLint, Prettier e GitHub Actions (lint, formatação, tipos, testes e build) |

## Como rodar localmente

Pré-requisitos: **Node.js 20.9 ou superior** e npm.

```bash
git clone https://github.com/Monteiro77/hp-landing-page.git
cd hp-landing-page
npm install
npm run dev
```

Acesse <http://localhost:3000>. Não é necessário configurar variáveis de ambiente.

### Scripts

| Comando             | O que faz                                                      |
| ------------------- | -------------------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento                                    |
| `npm run build`     | Build de produção (pré-renderiza as 437 páginas de personagem) |
| `npm start`         | Serve o build de produção                                      |
| `npm test`          | Testes unitários (Vitest)                                      |
| `npm run lint`      | ESLint                                                         |
| `npm run typecheck` | Gera os tipos das rotas e roda o TypeScript                    |
| `npm run format`    | Formata o código com Prettier                                  |

## Estrutura de pastas

```text
src/
├── app/                    # Rotas (App Router)
│   ├── page.tsx            # Landing page: hero, casas e lista de personagens
│   ├── personagem/[id]/    # Página de detalhes
│   ├── error.tsx           # Tela de erro com "Tentar novamente"
│   ├── not-found.tsx       # 404
│   └── sitemap.ts, robots.ts, icon.svg
├── components/
│   ├── characters/         # Card, grade, filtros, explorador, perfil, retrato...
│   ├── home/               # Hero e vitrine das casas
│   ├── houses/             # Brasão das casas (SVG)
│   ├── layout/             # Header e footer
│   └── ui/                 # Ícones, títulos de seção, mensagens de página
├── constants/              # Casas, traduções e dados do site
├── hooks/                  # useFiltersInUrl
├── lib/
│   ├── hp-api/             # Cliente REST, tipos da API e mapeamento
│   ├── characters/         # Filtros, formatação e estatísticas (com testes)
│   └── utils/              # Funções de texto (com testes)
├── styles/
│   ├── abstracts/          # Tokens (breakpoints, cores das casas) e mixins
│   └── globals.scss        # Variáveis CSS, temas claro/escuro e reset
└── types/                  # Modelo de domínio (Character, CharacterSummary)
```

Cada componente fica em sua pasta, com `Componente.tsx`, `Componente.module.scss` e um `index.ts`.

## Decisões técnicas

### Dados e cache

- A resposta da API é normalizada em `lib/hp-api/mappers.ts`: strings vazias viram `null`, datas `DD-MM-YYYY` viram ISO e o nome da casa vira um id tipado. Os componentes nunca lidam com o formato bruto da API.
- `getCharacters()` usa `'use cache'` com `cacheLife('days')`. A página é pré-renderizada no build e revalidada em segundo plano uma vez por dia, então o visitante nunca espera pela API, que roda no plano gratuito do Render e pode demorar a responder.
- As páginas de detalhe reaproveitam essa mesma lista em vez de chamar `/api/character/:id`: o build das 437 páginas faz **uma única** requisição à API.

### Renderização (Partial Prerendering)

- Hero, casas e o cabeçalho da lista são HTML estático. Só a parte que depende da URL (os filtros) fica em um `<Suspense>` e é transmitida no mesmo response, já com os cards renderizados no servidor.
- Para o navegador vai uma versão enxuta de cada personagem (`CharacterSummary`), apenas com os campos usados nos cards.
- A filtragem acontece no navegador: com ~440 personagens ela é instantânea e dispensa novas requisições. `useDeferredValue` mantém o campo de busca responsivo, e a URL é atualizada com `history.replaceState`.

### Performance

- Imagens com `next/image`: AVIF/WebP, `srcset` com `sizes` por breakpoint, lazy loading e `preload` só no retrato principal (LCP).
- Paginação com "Carregar mais" (24 por vez): menos DOM e nenhuma imagem baixada antes da hora.
- Uma única fonte web (Cinzel, só nos títulos, via `next/font`). O corpo usa a fonte do sistema.
- Fundo e efeitos feitos só com CSS, sem imagens decorativas.

### Design e acessibilidade

As decisões visuais seguem as Human Interface Guidelines da Apple, adaptadas para a web:

- Cores semânticas com tema claro e escuro (`prefers-color-scheme`) e contraste mínimo de 5:1 nos textos, calculado nos dois temas.
- Respeita `prefers-reduced-motion`, `prefers-contrast: more` e `prefers-reduced-transparency`.
- O status (vivo/falecido) é diferenciado por forma e texto, não por cor, já que vermelho e verde identificam Grifinória e Sonserina.
- Alvos de toque de 44px, foco visível em todos os controles e card inteiro clicável com um único link (sem foco duplicado).
- Busca com `role="search"`, contagem de resultados anunciada por leitores de tela, rótulos em todos os campos e "pular para o conteúdo".
- Elemento-assinatura: os retratos em moldura de arco, como os quadros de Hogwarts. O restante da interface é discreto.

## Limitações conhecidas

- A HP-API tem foto de apenas 25 dos 437 personagens. Os demais usam um monograma com as cores da casa.
- Um id inexistente em `/personagem/[id]` exibe a página 404 com `noindex`, mas responde HTTP 200: com Cache Components, o `notFound()` roda dentro do streaming e `dynamicParams` não está disponível.

## Deploy

O projeto está pronto para a [Vercel](https://vercel.com): importe o repositório e mantenha as configurações padrão do Next.js. A URL pública usada nos metadados vem de `VERCEL_PROJECT_PRODUCTION_URL` (definida pela Vercel) ou de `NEXT_PUBLIC_SITE_URL`, se configurada.

## Créditos

Dados da [HP-API](https://hp-api.onrender.com). Harry Potter e seus personagens são marcas da Warner Bros. Entertainment. Projeto sem fins comerciais.
