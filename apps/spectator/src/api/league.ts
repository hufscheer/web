import instance from '@/api';
import { LeagueType } from '@/types/league';

export const getLeagues = async (year: number) => {
  const { data } = await instance.get<LeagueType[]>(`/leagues`, {
    params: { year },
  });

  return data;
};
