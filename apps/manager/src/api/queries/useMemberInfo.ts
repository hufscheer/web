import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import { queryKeys } from '~/api/queryKey';

export const useMemberInfo = () => useQuery(queryKeys.members.info);

export const useSuspenseMemberInfo = () => useSuspenseQuery(queryKeys.members.info);
