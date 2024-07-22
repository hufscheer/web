import { fetcher } from './fetcher';
import { LeagueListType, LeagueType } from './types/league';

const leagueQueryKeys = {
  leagues: (year?: string) => ({
    queryKey: ['leagues', { year }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (year) params.append('year', year);
      return fetcher.get<LeagueListType[]>(`/leagues`, { params });
    },
  }),

  league: (leagueId: string) => ({
    queryKey: ['league', { leagueId }],
    queryFn: () => fetcher.get<LeagueType>(`/leagues/${leagueId}`),
  }),
};

export const queryKeys = { ...leagueQueryKeys };
