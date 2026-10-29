import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // As imagens da HP-API são servidas pelo ImageKit. Liberamos apenas esse caminho.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/hpapi/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  sassOptions: {
    // Permite `@use 'mixins' as *;` em qualquer módulo SCSS, sem caminhos relativos.
    loadPaths: [path.join(process.cwd(), 'src/styles')],
  },
}

export default nextConfig
