export type PushPlatformType = 'IOS' | 'ANDROID' | 'WEB';

export type PushDeviceRegisterPayload = {
  token: string;
  platform: PushPlatformType;
};

export type PushDeviceType = {
  deviceKey: string;
};

export type PushTokenRefreshPayload = {
  deviceKey: string;
  token: string;
};

export type PushFollowsPayload = {
  deviceKey: string;
};

export type PushFollowsType = {
  teamIds: number[];
  gameIds: number[];
  /** 서버는 구독 목록을 통째로 교체하므로, 쓰지 않더라도 받은 값을 그대로 돌려보내야 지워지지 않는다. */
  organizationIds: number[];
};

export type PushFollowsUpdatePayload = PushFollowsPayload & PushFollowsType;
