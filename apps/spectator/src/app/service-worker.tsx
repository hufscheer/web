'use client';

import { useEffect } from 'react';

/**
 * 프로덕션에서만 서비스워커를 등록한다.
 * 개발 환경에서는 캐시 때문에 변경 사항이 반영되지 않는 문제를 막기 위해 등록하지 않는다.
 */
export const ServiceWorkerRegister = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .register('/sw.js', { scope: '/', updateViaCache: 'none' })
      .catch((error) => {
        console.error('서비스워커 등록 실패:', error);
      });
  }, []);

  return null;
};
