import { AxiosError } from 'axios';

import instance from '@/api';
import { LeagueType, SportsType } from '@/types/league';

export const getLeagues = async (year: number) => {
  const { data } = await instance.get<LeagueType[]>(`/leagues`, {
    params: {
      year,
    },
  });

  return data;
};

export const getAllLeagues = async () => {
  try {
    const response = await instance.get<LeagueType[]>('/leagues');

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      throw new Error(axiosError.response.statusText);
    } else {
      throw new Error('리그 목록을 불러오는 데에 실패했습니다!');
    }
  }
};

export const getSportsListByLeagueId = async (leagueId: string) => {
  const { data } = await instance.get<SportsType[]>(
    `/leagues/${leagueId}/sports`,
  );

  return data;
};
