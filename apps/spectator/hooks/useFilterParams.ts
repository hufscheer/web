import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useFilterContext } from '@/app/_contexts/FilterContext';

export function useFilterParams() {
  const router = useRouter();
  const { year, league, sport, round, leagueTeam } = useFilterContext();

  const buildQueryString = useCallback(
    (params: Record<string, number | null | undefined>) => {
      const searchParams = new URLSearchParams();

      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== null && value !== undefined) {
          searchParams.set(key, value.toString());
        }
      });

      return `/?${searchParams.toString()}`;
    },
    [],
  );

  const updateYear = useCallback(
    (newYear: number) => {
      const href = buildQueryString({ year: newYear });
      router.push(href);
    },
    [router, buildQueryString],
  );

  const updateLeague = useCallback(
    (newLeague: number) => {
      const href = buildQueryString({ year, league: newLeague });
      router.push(href);
    },
    [router, buildQueryString, year],
  );

  const updateSport = useCallback(
    (newSport: number) => {
      const href = buildQueryString({
        year,
        league,
        sport: newSport,
      });
      router.push(href);
    },
    [router, buildQueryString, year, league],
  );

  //todo: 팀 없으면 null로 보내기
  const updateRound = useCallback(
    (newRound: number) => {
      const href = buildQueryString({
        year,
        league,
        sport,
        team: leagueTeam,
        round: newRound,
      });
      router.push(href);
    },
    [router, buildQueryString, year, league, sport, leagueTeam],
  );

  const updateTeam = useCallback(
    (newTeam: number) => {
      const updatedTeam = leagueTeam === newTeam ? null : newTeam;

      const href = buildQueryString({
        year,
        league,
        sport,
        round,
        team: updatedTeam,
      });
      router.push(href);
    },
    [leagueTeam, buildQueryString, year, league, sport, round, router],
  );

  return { updateYear, updateLeague, updateSport, updateRound, updateTeam };
}
