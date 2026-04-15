import { useSuspenseQuery } from '@hcc/api-base';

import { queryKeys } from '../queryKey';

export const useSuspenseOrganizations = () => useSuspenseQuery(queryKeys.organizations.list);
