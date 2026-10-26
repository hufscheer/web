import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => {
  return {
    id: '/',
    name: '훕치치',
    short_name: '훕치치',
    description: '한국외대 스포츠 플랫폼 훕치치',
    // `/` 진입 시 proxy 가 마지막으로 본 org 로 복원하거나 `/welcome` 으로 보낸다.
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'ko',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
};

export default manifest;
