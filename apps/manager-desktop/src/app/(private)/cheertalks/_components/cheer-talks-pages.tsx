'use client';

import { useSuspenseQueries } from '@hcc/api-base';
import { queryKeys, useSuspenseLeague } from '@hcc/manager-api';

import type { SportType } from '~/types';

import { isLeagueRunning, matchup } from '~/constants/sports';
import { useSuspenseMyLeagues } from '~/hooks/useMyLeagues';
import { toGame } from '~/utils/convert';

import CheerTalksClient from './cheer-talks-client';

/** 끝난 대회의 신고 응원톡도 열 수 있게 전부 주되, 진행 중인 대회를 앞에 둔다 */
export const AllCheerTalks = () => {
  const leagues = useSuspenseMyLeagues();
  const sorted = [
    ...leagues.filter(isLeagueRunning),
    ...leagues.filter((league) => !isLeagueRunning(league)),
  ];

  return <CheerTalksClient leagues={sorted} />;
};

export const LeagueCheerTalks = ({ leagueId }: { leagueId: number }) => {
  const { data: league } = useSuspenseLeague({ leagueId });

  return (
    <CheerTalksClient
      scope={{
        leagueId,
        title: '응원톡 관리',
        breadcrumb: ['대회 관리', league.name, '응원톡'],
      }}
    />
  );
};

export const GameCheerTalks = ({
  leagueId,
  gameId,
  sportType,
}: {
  leagueId: number;
  gameId: number;
  sportType: SportType;
}) => {
  const [{ data: league }, { data: game }] = useSuspenseQueries({
    queries: [queryKeys.leagues.detail({ leagueId }), queryKeys.games.detail({ gameId })],
  });

  return (
    <CheerTalksClient
      scope={{
        leagueId,
        gameId,
        title: '응원톡 관리',
        breadcrumb: ['대회 관리', league.name, matchup(toGame(game, sportType)), '응원톡'],
      }}
    />
  );
};
