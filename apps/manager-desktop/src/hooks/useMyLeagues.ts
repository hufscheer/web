import { useLeaguesLeague, useSuspenseLeaguesLeague } from '@hcc/manager-api';
import { useMemo } from 'react';

import { toManagerLeague } from '~/utils/convert';

export const useMyLeagues = () => {
  const { data } = useLeaguesLeague();
  return useMemo(() => (data ?? []).map(toManagerLeague), [data]);
};

export const useSuspenseMyLeagues = () => {
  const { data } = useSuspenseLeaguesLeague();
  return useMemo(() => data.map(toManagerLeague), [data]);
};
