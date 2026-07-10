import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Void.prolite',
    short_name: 'Void',
    description: 'We design and build clean, high-performance websites and digital interfaces.',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/favicon.ico', sizes: '16x16 32x32 48x48 64x64 128x128 256x256', type: 'image/x-icon' },
    ],
    theme_color: '#f5f2eb',
    background_color: '#f5f2eb',
    display: 'standalone',
  }
}
