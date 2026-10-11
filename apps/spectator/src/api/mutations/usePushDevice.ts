import type {
  PushDeviceRegisterPayload,
  PushDeviceType,
  PushFollowsUpdatePayload,
  PushTokenRefreshPayload,
} from '~/api/types';

import { fetcher } from '~/api/fetcher';

export const registerPushDevice = (request: PushDeviceRegisterPayload) =>
  fetcher.post<PushDeviceType>('push/devices', { json: request });

export const refreshPushToken = ({ deviceKey, token }: PushTokenRefreshPayload) =>
  fetcher.put<void>(`push/devices/${deviceKey}/token`, { json: { token } });

/** 팔로우 목록을 통째로 교체한다. 팀/경기 중 하나만 바꿀 때도 나머지를 함께 보내야 한다. */
export const replacePushFollows = ({ deviceKey, ...request }: PushFollowsUpdatePayload) =>
  fetcher.put<void>(`push/devices/${deviceKey}/follows`, { json: request });
