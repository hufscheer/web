import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { getMatchLineupById } from '@/api/match';

import { FconlineInfoType, getFconlinePlayerInfo } from '@/api/player';

export const useMatchFconlineLineupById = (matchId: string) => {
  const { data, error } = useSuspenseQuery({
    queryKey: ['match-lineup', matchId],
    queryFn: () => getMatchLineupById(matchId),
  });

  const nicknames = data
    .map(info => ({
      order: info.order,
      nickname:
        info.gameTeamPlayers.map(player => player.description).pop() || '',
    }))
    .flat();

  const queryOptions = nicknames.map(nickname => ({
    queryKey: ['fconline-lineup', nickname.nickname],
    queryFn: () => getFconlinePlayerInfo(nickname.nickname),
    select: (data: FconlineInfoType) => ({ ...data, order: nickname.order }),
  }));

  const datas = useSuspenseQueries({
    queries: queryOptions,
  });

  const fconlineError = datas.find(data => data.error);
  const fconlineInfo = datas.map(data => data.data);

  return {
    lineup: data,
    fconlineInfo,
    fconlineError,
    error,
  };
};
