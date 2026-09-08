import { useMemo } from 'react';
import { useSuspenseLeague, useSuspenseLeagueTeams } from '~/api';
import { getRoundOptions } from '~/constants/leagues';

export const useBasicInfoData = (leagueId: number) => {
  const { data: league } = useSuspenseLeague({ leagueId });
  /**
   * 팀 목록에는 round 를 넘기지 않는다.
   *
   * 서버의 그 필터는 "그 라운드에 이미 경기가 있는 팀"을 준다(teamsPlayedInRound).
   * 경기를 만들려고 연 화면에서 그걸 걸면 아직 경기가 없는 팀이 목록에서 사라져,
   * 그 팀의 첫 경기를 영영 만들 수 없다. 라운드를 고르는 순간 목록이 비던 게 이 때문이다.
   *
   * 라운드 필터는 "누가 진출했나"를 보는 조회용이지 대진을 짜는 용도가 아니다.
   * 아래 라인업 단계도 이미 필터 없이 부르고 있어서, 여기서 빼면 두 단계가 같은 목록을 쓴다.
   */
  const { data: teams } = useSuspenseLeagueTeams({ leagueId });
  const isThirdPlaceMatchEnabled = league.thirdPlaceMatchEnabled === true;

  const roundOptions = useMemo(
    () =>
      getRoundOptions(league.sportType, isThirdPlaceMatchEnabled)
        .filter((item) => league.maxRound >= item.round)
        .map((item) => ({ value: item.value.toString(), label: item.label })),
    [isThirdPlaceMatchEnabled, league.maxRound, league.sportType],
  );

  const teamOptions = useMemo(
    () =>
      teams.map((t) => ({
        value: t.leagueTeamId.toString(),
        label: t.teamName,
      })),
    [teams],
  );

  return { teams, roundOptions, teamOptions };
};
