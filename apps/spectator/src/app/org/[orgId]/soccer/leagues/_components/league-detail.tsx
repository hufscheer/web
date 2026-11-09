'use client';

import { Suspense } from '@suspensive/react';
import { useSearchParams } from 'next/navigation';

import { useSuspenseLeague, useSuspenseLeagueTeams } from '~/api';

import { SPORT_TYPE } from '../../_constants';
import { GameList } from './game-list';
import { RoundFilter } from './round-filter';
import { TeamFilter } from './team-filter';

type Props = {
  leagueId: number;
};

/**
 * `?round=`, `?teams=`, `?third_place_match=` 을 서버 페이지에서 읽으면 요청마다 서버에서 렌더링돼 캐시할 수 없다.
 * 그래서 클라이언트에서 읽고, 대회와 라운드별 팀 목록도 클라이언트가 가져온다
 */
export const LeagueDetail = ({ leagueId }: Props) => {
  const searchParams = useSearchParams();
  const { data: league } = useSuspenseLeague({ leagueId });

  const round = Number(searchParams.get('round')) || league.maxRound;
  const thirdPlaceMatch = searchParams.get('third_place_match') === 'true';
  const teamsParam = searchParams.get('teams');
  const selectedTeams = teamsParam ? teamsParam.split(',').map(Number).filter(Boolean) : [];

  const { data: teams } = useSuspenseLeagueTeams({ leagueId, round, thirdPlaceMatch });

  return (
    <>
      {round && <RoundFilter league={league} round={round} thirdPlaceMatch={thirdPlaceMatch} />}
      {teams && <TeamFilter teams={teams} selectedTeams={selectedTeams} />}
      <Suspense clientOnly>
        <GameList
          leagueId={leagueId}
          round={round}
          thirdPlaceMatch={thirdPlaceMatch}
          selectedTeams={selectedTeams}
          sportType={SPORT_TYPE}
          bracketEnabled={league.bracketEnabled}
        />
      </Suspense>
    </>
  );
};
