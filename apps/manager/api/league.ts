import instance from '@/api';
import {
  DeleteLeaguePayload,
  LeagueIdType,
  LeagueType,
  NewLeaguePayload,
  PutLeaguePayload,
  SportsCategoriesType,
} from '@/types/league';

export const getAllLeaguesWithAuth = async () => {
  const { data } = await instance.get<LeagueType[]>('/league/all/');

  return data;
};

export const postNewLeagueWithAuth = async (body: NewLeaguePayload) => {
  const { data } = await instance.post<LeagueIdType>('/league/', body);

  return data;
};

export const deleteLeagueByIdWithAuth = async (body: DeleteLeaguePayload) => {
  const { status } = await instance.delete('/league/', { data: body });

  return status;
};

export const putLeagueWithAuth = async (data: PutLeaguePayload) => {
  await instance.put('/league/', data);

  return data.leagueId;
};

export const getSportsCategoriesWithAuth = async () => {
  const { data } = await instance.get<SportsCategoriesType[]>('/sport/');

  return data;
};
