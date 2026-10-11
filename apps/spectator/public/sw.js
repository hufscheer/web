/**
 * 훕치치 spectator 서비스워커
 *
 * - 해시가 붙은 정적 파일(`/_next/static/*`)과 PWA 아이콘만 캐시한다.
 * - API, 소켓, HTML 등 나머지 요청은 가로채지 않는다. (실시간 데이터가 캐시되면 안 됨)
 * - 페이지 이동이 네트워크 오류로 실패할 때만 오프라인 안내 페이지를 보여준다.
 * - FCM 웹 푸시를 받아 알림을 띄우고, 알림을 누르면 해당 경기 페이지로 이동한다.
 *   (Firebase SDK 를 불러오지 않고 표준 Push API 로 직접 처리한다.)
 *
 * 캐시 구조를 바꾸면 VERSION 을 올려 이전 캐시를 정리한다.
 */
const VERSION = 'v1';
const STATIC_CACHE = `hcc-static-${VERSION}`;
const OFFLINE_CACHE = `hcc-offline-${VERSION}`;
const OFFLINE_URL = '/offline.html';
const OFFLINE_ASSETS = [OFFLINE_URL, '/icons/icon-192.png'];
const MAX_STATIC_ENTRIES = 300;
const NOTIFICATION_ICON = '/icons/icon-192.png';

// 개발 서버의 정적 파일은 해시가 고정되지 않아 캐시하면 변경 사항이 반영되지 않는다.
const isLocalhost = ['localhost', '127.0.0.1'].includes(self.location.hostname);

const isCacheableStatic = (url) =>
  url.origin === self.location.origin &&
  (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/'));

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(OFFLINE_CACHE)
      .then((cache) =>
        cache.addAll(OFFLINE_ASSETS.map((url) => new Request(url, { cache: 'reload' }))),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith('hcc-') && key !== STATIC_CACHE && key !== OFFLINE_CACHE)
          .map((key) => caches.delete(key)),
      );
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }
      await self.clients.claim();
    })(),
  );
});

const trimCache = async (cacheName, maxEntries) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  const overflow = keys.length - maxEntries;
  if (overflow <= 0) return;
  await Promise.all(keys.slice(0, overflow).map((key) => cache.delete(key)));
};

const cacheFirst = async (event) => {
  const cached = await caches.match(event.request);
  if (cached) return cached;

  const cache = await caches.open(STATIC_CACHE);
  const response = await fetch(event.request);
  if (response.ok) {
    event.waitUntil(
      cache
        .put(event.request, response.clone())
        .then(() => trimCache(STATIC_CACHE, MAX_STATIC_ENTRIES)),
    );
  }
  return response;
};

const networkWithOfflineFallback = async (event) => {
  try {
    const preloaded = await event.preloadResponse;
    if (preloaded) return preloaded;
    return await fetch(event.request);
  } catch {
    const cache = await caches.open(OFFLINE_CACHE);
    const offline = await cache.match(OFFLINE_URL);
    return offline ?? Response.error();
  }
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (isLocalhost || request.method !== 'GET') return;

  if (request.mode === 'navigate') {
    event.respondWith(networkWithOfflineFallback(event));
    return;
  }

  const url = new URL(request.url);
  if (isCacheableStatic(url)) {
    event.respondWith(cacheFirst(event));
  }
});

const parsePushPayload = (event) => {
  if (!event.data) return null;
  try {
    return event.data.json();
  } catch {
    return null;
  }
};

/**
 * FCM 이 보내는 형태: { notification: { title, body }, data: { url, gameId, type } }
 * 웹 푸시는 받으면 반드시 알림을 띄워야 하므로 내용이 비어 있어도 기본 문구로 띄운다.
 */
self.addEventListener('push', (event) => {
  const payload = parsePushPayload(event);
  const notification = payload?.notification ?? {};
  const data = payload?.data ?? {};

  event.waitUntil(
    self.registration.showNotification(notification.title || '훕치치', {
      body: notification.body || '',
      icon: NOTIFICATION_ICON,
      data: { url: data.url || '/' },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = new URL(event.notification.data?.url || '/', self.location.origin);
  if (url.origin !== self.location.origin) return;

  event.waitUntil(
    (async () => {
      const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      const same = windows.find((client) => client.url === url.href);
      if (same) return same.focus();

      // navigate 는 이 서비스워커가 제어하는 창에서만 동작하므로 실패하면 새 창을 연다.
      const existing = windows.find((client) => 'navigate' in client);
      if (existing) {
        try {
          await existing.focus();
          return await existing.navigate(url.href);
        } catch {
          // 아래에서 새 창으로 연다.
        }
      }

      return self.clients.openWindow(url.href);
    })(),
  );
});
