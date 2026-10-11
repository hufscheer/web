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
};

export type PushFollowsUpdatePayload = PushFollowsPayload & PushFollowsType;
