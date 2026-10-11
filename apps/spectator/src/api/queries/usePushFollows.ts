import { useQuery } from '@hcc/api-base';

import { queryKeys } from '../queryKey';

/** 등록된 기기가 없으면(`deviceKey` 가 null) 요청하지 않는다. */
export const usePushFollows = (deviceKey: string | null) =>
  useQuery({
    ...queryKeys.push.follows({ deviceKey: deviceKey ?? '' }),
    enabled: deviceKey !== null,
  });
