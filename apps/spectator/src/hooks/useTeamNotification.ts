import { useQueryClient } from '@hcc/api-base';
import { toast } from '@hcc/ui';
import { HTTPError } from 'ky';
import { useEffect, useState, useSyncExternalStore } from 'react';

import type { PushFollowsType } from '~/api';

import { replacePushFollows, usePushFollows } from '~/api';
import { handleHTTPError } from '~/api/http-error';
import { queryKeys } from '~/api/queryKey';
import {
  ensurePushDevice,
  getFcmToken,
  getPushSupport,
  isPushDeviceNotFound,
  pushDeviceStore,
} from '~/utils/push';

const EMPTY_FOLLOWS: PushFollowsType = { teamIds: [], gameIds: [], organizationIds: [] };
const FAILURE_MESSAGE = '알림 설정에 실패했어요. 잠시 후 다시 시도해 주세요';

const noopSubscribe = () => () => {};

// 브라우저 환경은 세션 중에 바뀌지 않으므로 한 번만 계산한다. 서버 렌더링에서는 null.
const usePushSupport = () => useSyncExternalStore(noopSubscribe, getPushSupport, () => null);

const getPermission = () => ('Notification' in window ? Notification.permission : 'default');
const usePermission = () => useSyncExternalStore(noopSubscribe, getPermission, () => 'default');

export const useTeamNotification = (teamId: number) => {
  const qc = useQueryClient();
  const support = usePushSupport();
  const permission = usePermission();
  const device = useSyncExternalStore(
    pushDeviceStore.subscribe,
    pushDeviceStore.getSnapshot,
    pushDeviceStore.getServerSnapshot,
  );
  const [isPending, setIsPending] = useState(false);

  // 기기 설정에서 알림 권한을 끄면 서버 구독이 남아 있어도 꺼진 것으로 보여준다.
  const deviceKey = permission === 'granted' ? (device?.deviceKey ?? null) : null;
  const { data: follows, error } = usePushFollows(deviceKey);
  const isFollowing = follows?.teamIds.includes(teamId) ?? false;

  // 토큰이 무효해져 서버가 기기를 지운 경우
  useEffect(() => {
    if (isPushDeviceNotFound(error)) pushDeviceStore.clear();
  }, [error]);

  const fetchFollows = async (key: string) => {
    try {
      return await qc.fetchQuery(queryKeys.push.follows({ deviceKey: key }));
    } catch (error) {
      if (isPushDeviceNotFound(error)) return null;
      throw error;
    }
  };

  const saveTeamIds = async (key: string, current: PushFollowsType, teamIds: number[]) => {
    const next = { ...current, teamIds };
    await replacePushFollows({ deviceKey: key, ...next });
    qc.setQueryData(queryKeys.push.follows({ deviceKey: key }).queryKey, next);
  };

  const subscribe = async () => {
    // iOS 는 사용자 동작 직후에만 권한을 요청할 수 있어 다른 비동기 작업보다 먼저 호출한다.
    const result = await Notification.requestPermission();
    if (result !== 'granted') {
      toast.error('알림 권한이 꺼져 있어요. 기기 설정에서 알림을 허용해 주세요');
      return false;
    }

    const token = await getFcmToken();
    let key = await ensurePushDevice(token);
    let current = await fetchFollows(key);

    if (!current) {
      pushDeviceStore.clear();
      key = await ensurePushDevice(token);
      current = EMPTY_FOLLOWS;
    }

    await saveTeamIds(key, current, [...new Set([...current.teamIds, teamId])]);
    toast.success('이 팀의 경기 시작·득점·종료 알림을 보내드릴게요');
    return true;
  };

  const unsubscribe = async (key: string) => {
    const current = (await fetchFollows(key)) ?? EMPTY_FOLLOWS;
    await saveTeamIds(
      key,
      current,
      current.teamIds.filter((id) => id !== teamId),
    );
    toast.success('팀 알림을 껐어요');
    return false;
  };

  /** 바뀐 뒤의 알림 상태를 돌려준다. 실패하면 기존 상태를 그대로 돌려준다. */
  const toggle = async () => {
    if (support !== 'supported' || isPending) return isFollowing;

    setIsPending(true);
    try {
      if (isFollowing && deviceKey) return await unsubscribe(deviceKey);
      return await subscribe();
    } catch (error) {
      if (error instanceof HTTPError) {
        // 400(팔로우 개수 초과 등)·429(등록 요청 과다)는 서버 메시지를 그대로 보여준다.
        handleHTTPError(error, (status) =>
          status === 400 || status === 429 ? undefined : FAILURE_MESSAGE,
        );
      } else {
        toast.error(FAILURE_MESSAGE);
      }
      return isFollowing;
    } finally {
      setIsPending(false);
    }
  };

  return { support, isFollowing, isPending, toggle };
};
