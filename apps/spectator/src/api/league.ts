import instance from '@/src/api/index';
import { LeagueType } from '@/src/types/league';

export const getLeagues = async (year: number) => {
  const { data } = await instance.get<LeagueType[]>(`/leagues`, {
    params: { year },
  });

  return data;
};
