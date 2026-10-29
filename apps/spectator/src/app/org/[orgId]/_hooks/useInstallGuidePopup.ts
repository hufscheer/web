import { useCallback, useEffect, useState } from 'react';

const HIDE_UNTIL_KEY = 'install-guide-hide-until';
const SESSION_DISMISSED_KEY = 'install-guide-dismissed';

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

const getEndOfToday = () => {
  const date = new Date();
  date.setHours(24, 0, 0, 0);
  return date.getTime();
};

export const useInstallGuidePopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (isStandalone()) return;
      if (sessionStorage.getItem(SESSION_DISMISSED_KEY)) return;

      const hideUntil = Number(localStorage.getItem(HIDE_UNTIL_KEY));
      if (hideUntil && Date.now() < hideUntil) return;

      setOpen(true);
    } catch {
      // 스토리지 접근이 막힌 환경(시크릿 모드 등)에서는 팝업을 띄우지 않는다.
    }
  }, []);

  const close = useCallback((hideToday: boolean) => {
    setOpen(false);
    try {
      sessionStorage.setItem(SESSION_DISMISSED_KEY, 'true');
      if (hideToday) localStorage.setItem(HIDE_UNTIL_KEY, String(getEndOfToday()));
    } catch {
      // ignore
    }
  }, []);

  return { open, close };
};
