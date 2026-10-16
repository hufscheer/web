import { useQuery } from '@hcc/api-base';
import { useMemo } from 'react';

import type { GamesListPageResponse } from '~/api';
import type { Game, ManagerLeague } from '~/desktop/types';

import { queryKeys } from '~/api';
import { toGames } from '~/desktop/utils/convert';

import { useMyLeagues } from './useMyLeagues';

/** `/games` 는 학교를 가리지 않는다. 내가 운영하는 대회의 경기만 남긴다 */
export const toMyGames = (
  page: GamesListPageResponse | undefined,
  leagues: ManagerLeague[],
): Game[] => {
  const sportOf = new Map(leagues.map((league) => [league.leagueId, league.sportType]));
  return toGames(page, (leagueId) => sportOf.get(leagueId)).filter((game) =>
    sportOf.has(game.leagueId),
  );
};

export const useMyLiveGames = () => {
  const leagues = useMyLeagues();
  const { data } = useQuery(queryKeys.games.listAll({ state: 'PLAYING', size: 100 }));
  return useMemo(() => toMyGames(data, leagues), [data, leagues]);
};
