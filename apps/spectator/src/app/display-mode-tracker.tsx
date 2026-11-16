'use client';

import { sendGAEvent } from '@next/third-parties/google';
import { useEffect } from 'react';

type DisplayMode = 'standalone' | 'browser';

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const IOS_FIRST_STANDALONE_KEY = 'ios_first_standalone_logged';

const detectDisplayMode = (): DisplayMode => {
  const nav = window.navigator as Navigator & { standalone?: boolean };

  const installedModes = ['standalone', 'minimal-ui', 'fullscreen'];
  const matchesInstalled = installedModes.some(
    (mode) => window.matchMedia?.(`(display-mode: ${mode})`).matches,
  );

  const isInstalled =
    matchesInstalled ||
    nav.standalone === true ||
    document.referrer.startsWith('android-app://');

  return isInstalled ? 'standalone' : 'browser';
};

const isIOS = () => /iP(ad|hone|od)/.test(window.navigator.userAgent);

/**
 * 사용자 접속 환경과 설치·첫 실행 시점을 GA4에 기록한다.
 * - user_properties.display_mode: 이후 모든 이벤트에 사용자 차원으로 붙는다.
 * - app_environment: 세션 유입 환경 이벤트.
 * - first_standalone_session: standalone 세션 시작 (유저당 최초 1회만 집계).
 * - ios_first_standalone_session: iOS 전용, 홈 화면 추가 후 첫 실행 근사치.
 * - app_installed: Android/Desktop 설치 완료 (브라우저 `appinstalled` 이벤트).
 */
export const DisplayModeTracker = () => {
  useEffect(() => {
    const displayMode = detectDisplayMode();

    const w = window as GtagWindow;
    w.dataLayer = w.dataLayer || [];
    if (typeof w.gtag === 'function') {
      w.gtag('set', 'user_properties', { display_mode: displayMode });
    } else {
      w.dataLayer.push(['set', 'user_properties', { display_mode: displayMode }]);
    }

    sendGAEvent('event', 'app_environment', { display_mode: displayMode });

    if (displayMode === 'standalone') {
      sendGAEvent('event', 'first_standalone_session', {});

      if (isIOS()) {
        try {
          if (!localStorage.getItem(IOS_FIRST_STANDALONE_KEY)) {
            sendGAEvent('event', 'ios_first_standalone_session', {});
            localStorage.setItem(IOS_FIRST_STANDALONE_KEY, '1');
          }
        } catch {
          // 시크릿 모드 등 스토리지 접근 불가 시 무시한다.
        }
      }
    }

    const handleInstalled = () => {
      sendGAEvent('event', 'app_installed', {});
    };
    window.addEventListener('appinstalled', handleInstalled);
    return () => window.removeEventListener('appinstalled', handleInstalled);
  }, []);

  return null;
};
