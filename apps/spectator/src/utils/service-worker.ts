/** 이미 등록돼 있으면 기존 등록을 돌려준다. */
export const registerServiceWorker = () =>
  navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' });
