import instance from '@/api';
import {
  DeleteLeaguePayload,
  LeagueIdType,
  LeagueType,
  NewLeaguePayload,
  PutLeaguePayload,
  SportsCategoriesType,
} from '@/types/league';

export const getAllLeagues = async () => {
  const { data } = await instance.get<LeagueType[]>('/leagues/all/');

  return data;
};

export const postNewLeague = async (body: NewLeaguePayload) => {
  const { data } = await instance.post<LeagueIdType>('/league/', body);

  return data;
};

export const deleteLeagueById = async (body: DeleteLeaguePayload) => {
  const { status } = await instance.delete('/league/', { data: body });

  return status;
};

export const putLeague = async (data: PutLeaguePayload) => {
  await instance.put('/league/', data);

  return data.leagueId;
};

export const getSportsCategories = async () => {
  const { data } = await instance.get<SportsCategoriesType[]>('/sport/');

  return data;
};
