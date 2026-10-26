import { useEffect } from 'react';

import { ensurePushDevice, getFcmToken, getPushSupport, pushDeviceStore } from '~/utils/push';

/**
 * FCM 토큰은 바뀔 수 있어, 알림을 켜 둔 기기는 앱을 열 때 한 번 서버와 맞춘다.
 * 알림 버튼이 있는 화면을 거치지 않아도 실행되도록 전역에서 호출한다.
 */
export const usePushTokenSync = () => {
  useEffect(() => {
    if (!pushDeviceStore.getSnapshot()) return;
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    if (getPushSupport() !== 'supported') return;

    getFcmToken()
      .then(ensurePushDevice)
      .catch(() => {
        // 다음에 앱을 열 때 다시 시도한다.
      });
  }, []);
};
