'use client';

import { useSuspenseQueries } from '@hcc/api-base';

import type { SportType } from '~/app/(desktop)/_types';

import { queryKeys, useSuspenseLeague } from '~/api';
import { routes } from '~/app/(desktop)/_constants/routes';
import { isLeagueRunning, matchup } from '~/app/(desktop)/_constants/sports';
import { useSuspenseMyLeagues } from '~/app/(desktop)/_hooks/useMyLeagues';
import { toGame } from '~/app/(desktop)/_utils/convert';

import CheerTalksClient, { type Filter } from './cheer-talks-client';

/** 끝난 대회의 신고 응원톡도 열 수 있게 전부 주되, 진행 중인 대회를 앞에 둔다 */
export const AllCheerTalks = ({ initialFilter }: { initialFilter?: Filter }) => {
  const leagues = useSuspenseMyLeagues();
  const sorted = [
    ...leagues.filter(isLeagueRunning),
    ...leagues.filter((league) => !isLeagueRunning(league)),
  ];

  return (
    <CheerTalksClient
      key={initialFilter ?? 'default'}
      leagues={sorted}
      initialFilter={initialFilter}
    />
  );
};

export const LeagueCheerTalks = ({
  leagueId,
  initialFilter,
}: {
  leagueId: number;
  initialFilter?: Filter;
}) => {
  const { data: league } = useSuspenseLeague({ leagueId });

  return (
    <CheerTalksClient
      key={initialFilter ?? 'default'}
      initialFilter={initialFilter}
      scope={{
        leagueId,
        title: '응원톡 관리',
        breadcrumb: ['대회 관리', { label: league.name, href: routes.league(leagueId) }, '응원톡'],
      }}
    />
  );
};

export const GameCheerTalks = ({
  leagueId,
  gameId,
  sportType,
  initialFilter,
}: {
  leagueId: number;
  gameId: number;
  sportType: SportType;
  initialFilter?: Filter;
}) => {
  const [{ data: league }, { data: game }] = useSuspenseQueries({
    queries: [queryKeys.leagues.detail({ leagueId }), queryKeys.games.detail({ gameId })],
  });

  const gameRow = toGame(game, sportType);

  return (
    <CheerTalksClient
      key={initialFilter ?? 'default'}
      initialFilter={initialFilter}
      scope={{
        leagueId,
        gameId,
        title: '응원톡 관리',
        breadcrumb: [
          '대회 관리',
          { label: league.name, href: routes.league(leagueId) },
          { label: matchup(gameRow), href: routes.gameTimelineOf(gameRow) },
          '응원톡',
        ],
      }}
    />
  );
};
