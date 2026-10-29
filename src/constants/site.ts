const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL

export const SITE = {
  name: 'Almanaque Bruxo',
  description:
    'Explore os personagens do universo Harry Potter: casas de Hogwarts, patronos, atores e quem sobreviveu até o fim.',
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (productionHost ? `https://${productionHost}` : 'http://localhost:3000'),
  repositoryUrl: 'https://github.com/Monteiro77/hp-landing-page',
  apiDocsUrl: 'https://hp-api.onrender.com',
} as const
