import { useMemo } from 'react';

import { useLeaguesLeague, useSuspenseLeaguesLeague } from '~/api';
import { toManagerLeague } from '~/desktop/utils/convert';

export const useMyLeagues = () => {
  const { data } = useLeaguesLeague();
  return useMemo(() => (data ?? []).map(toManagerLeague), [data]);
};

export const useSuspenseMyLeagues = () => {
  const { data } = useSuspenseLeaguesLeague();
  return useMemo(() => data.map(toManagerLeague), [data]);
};
