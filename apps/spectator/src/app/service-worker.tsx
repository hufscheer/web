'use client';

import { useEffect } from 'react';

import { registerServiceWorker } from '~/utils/service-worker';

/**
 * 프로덕션에서만 서비스워커를 등록한다.
 * 개발 환경에서는 캐시 때문에 변경 사항이 반영되지 않는 문제를 막기 위해 등록하지 않는다.
 * (알림을 켜면 개발 환경에서도 등록되지만, sw.js 가 localhost 에서는 캐시하지 않는다.)
 */
export const ServiceWorkerRegister = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;

    registerServiceWorker().catch((error) => {
      console.error('서비스워커 등록 실패:', error);
    });
  }, []);

  return null;
};
