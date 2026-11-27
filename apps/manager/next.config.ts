import type { NextConfig } from 'next';

const apiBaseUrl = process.env.API_BASE_URL ?? '';

/** 데스크탑 사이드바의 서버 배지. Vercel 에 따로 주지 않으면 실제로 붙는 API 주소로 정한다 */
const apiEnv =
  process.env.NEXT_PUBLIC_API_ENV ??
  (new URL(apiBaseUrl || 'http://localhost').hostname === 'api.hufscheer.com' ? 'prod' : 'dev');

/**
 * 데스크탑 경기 기록 화면이 기록 변경 알림을 받는 STOMP 주소. 관객 웹처럼 `/api` 리라이트를 거치지 않고 API 서버에
 * 바로 붙는다. 따로 주지 않으면 API 주소에서 만든다(https://api.hufscheer.com → wss://api.hufscheer.com/ws)
 */
const socketUrl =
  process.env.NEXT_PUBLIC_SOCKET_URL ??
  (apiBaseUrl ? `${apiBaseUrl.replace(/^http/, 'ws').replace(/\/$/, '')}/ws` : '');

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_ENV: apiEnv,
    NEXT_PUBLIC_SOCKET_URL: socketUrl,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hufscheer-server.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'hufscheer-images.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.hufscheer.com',
      },
      {
        protocol: 'https',
        hostname: 'hufstreaming.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/images/:path*',
        destination: 'https://hufscheer-image.s3.ap-northeast-2.amazonaws.com/:path*',
      },
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
