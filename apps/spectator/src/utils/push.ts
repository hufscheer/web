import { HTTPError } from 'ky';

import { refreshPushToken, registerPushDevice } from '~/api/mutations/usePushDevice';

import { registerServiceWorker } from './service-worker';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

/**
 * - supported: 바로 알림을 켤 수 있음
 * - ios-install-required: iOS 는 홈 화면에 추가한 앱에서만 웹 푸시를 받을 수 있음
 * - in-app-browser: 카카오톡 등 인앱 브라우저는 웹 푸시를 지원하지 않음
 * - unsupported: 브라우저 미지원 또는 Firebase 환경 변수 누락
 */
export type PushSupport = 'supported' | 'ios-install-required' | 'in-app-browser' | 'unsupported';

const IN_APP_BROWSER_REGEX = /KAKAOTALK|Instagram|FBAN|FBAV|Line\/|NAVER\(inapp/i;

const isConfigured = () => Object.values(firebaseConfig).every(Boolean) && Boolean(vapidKey);

// iPadOS 13+ 는 데스크톱 Safari 로 UA 를 보내므로 터치 지원 여부로 구분한다.
const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1);

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

export const getPushSupport = (): PushSupport => {
  if (!isConfigured()) return 'unsupported';
  if (IN_APP_BROWSER_REGEX.test(navigator.userAgent)) return 'in-app-browser';
  if (isIOS() && !isStandalone()) return 'ios-install-required';
  if (
    !('serviceWorker' in navigator) ||
    !('PushManager' in window) ||
    !('Notification' in window)
  ) {
    return 'unsupported';
  }
  return 'supported';
};

/** Firebase SDK 는 알림을 켤 때만 필요하므로 동적으로 불러온다. */
export const getFcmToken = async () => {
  const [{ getApps, initializeApp }, { getMessaging, getToken, isSupported }] = await Promise.all([
    import('firebase/app'),
    import('firebase/messaging'),
  ]);

  if (!(await isSupported())) throw new Error('이 브라우저는 FCM 을 지원하지 않습니다.');

  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  await registerServiceWorker();
  const registration = await navigator.serviceWorker.ready;

  return getToken(getMessaging(app), { vapidKey, serviceWorkerRegistration: registration });
};

type StoredPushDevice = {
  deviceKey: string;
  token: string;
};

const STORAGE_KEY = 'hcc:push-device';
const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedDevice: StoredPushDevice | null = null;

const readRaw = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const parse = (raw: string | null): StoredPushDevice | null => {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (
      typeof value === 'object' &&
      value !== null &&
      'deviceKey' in value &&
      'token' in value &&
      typeof value.deviceKey === 'string' &&
      typeof value.token === 'string'
    ) {
      return { deviceKey: value.deviceKey, token: value.token };
    }
    return null;
  } catch {
    return null;
  }
};

const write = (device: StoredPushDevice | null) => {
  try {
    if (device) localStorage.setItem(STORAGE_KEY, JSON.stringify(device));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 저장소를 쓸 수 없는 환경(사파리 비공개 모드 등)에서는 이번 세션 동안만 유지된다.
  }
  cachedRaw = device ? JSON.stringify(device) : null;
  cachedDevice = device;
  listeners.forEach((listener) => listener());
};

/** useSyncExternalStore 로 구독할 수 있는 기기 정보 저장소 */
export const pushDeviceStore = {
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: (): StoredPushDevice | null => {
    if (cachedRaw === undefined) {
      cachedRaw = readRaw();
      cachedDevice = parse(cachedRaw);
    }
    return cachedDevice;
  },
  getServerSnapshot: (): StoredPushDevice | null => null,
  clear: () => write(null),
};

export const isPushDeviceNotFound = (error: unknown) =>
  error instanceof HTTPError && error.response.status === 404;

/**
 * 토큰에 맞는 기기를 서버에 등록하고 deviceKey 를 돌려준다.
 * 저장된 기기가 있으면 토큰만 갱신하고, 서버에서 지워진 기기면 새로 등록한다.
 */
export const ensurePushDevice = async (token: string) => {
  const stored = pushDeviceStore.getSnapshot();

  if (stored?.token === token) return stored.deviceKey;

  if (stored) {
    try {
      await refreshPushToken({ deviceKey: stored.deviceKey, token });
      write({ deviceKey: stored.deviceKey, token });
      return stored.deviceKey;
    } catch (error) {
      if (!isPushDeviceNotFound(error)) throw error;
    }
  }

  const { deviceKey } = await registerPushDevice({ token, platform: 'WEB' });
  write({ deviceKey, token });
  return deviceKey;
};
