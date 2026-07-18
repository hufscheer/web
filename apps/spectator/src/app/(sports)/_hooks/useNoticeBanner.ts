import { useCallback, useState } from 'react';

export const useNoticeBanner = (gameId: number) => {
  const key = `cheer-notice-dismissed-${gameId}`;
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    if (sessionStorage.getItem(key)) return;
    setVisible(true);
  }, [key]);

  const dismiss = useCallback(() => {
    setVisible(false);
    sessionStorage.setItem(key, 'true');
  }, [key]);

  return { visible, show, dismiss };
};
