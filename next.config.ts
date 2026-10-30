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
    // As fotos da API são pequenas (a do Harry tem 163x227px) e já vêm comprimidas em JPEG.
    // Medido contra as originais: AVIF q75 ficava em 33 dB de PSNR (manchas na pele e no
    // cabelo), WebP q90 fica em ~41 dB com o mesmo tamanho de arquivo da original.
    formats: ['image/webp'],
    qualities: [90],
  },
  sassOptions: {
    // Permite `@use 'mixins' as *;` em qualquer módulo SCSS, sem caminhos relativos.
    loadPaths: [path.join(process.cwd(), 'src/styles')],
  },
}

export default nextConfig
