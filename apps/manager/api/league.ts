import instance from '@/api';
import {
  DeleteLeaguePayload,
  GameListParams,
  GameListType,
  LeagueIdType,
  LeagueListType,
  LeaguePlayerPayload,
  NewLeaguePayload,
  UpdateLeaguePayload,
  SportsCategoriesType,
} from '@/types/league';

export const getAllLeagues = async () => {
  const { data } = await instance.get<LeagueListType>('/leagues/all/');

  return data;
};

export const getGameList = async ({
  size = '5',
  leagueName,
  ...params
}: GameListParams & { leagueName: string }) => {
  const { data } = await instance.get<GameListType[]>('/games', {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    params: { size, ...params },
  });

  return { leagueName, data };
};

export const createLeague = async (payload: NewLeaguePayload) => {
  const { data } = await instance.post<LeagueIdType>('/leagues/', payload);

  return data;
};

export const createLeagueTeam = async (leagueId: number, payload: FormData) => {
  const { data } = await instance.post<{ data: [] }>(
    `/league-teams/register/${leagueId}/`,
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

export const createLeaguePlayers = async (
  teamId: number,
  payload: LeaguePlayerPayload[],
) => {
  await instance.post(`/league-teams/${teamId}/player/`, {
    data: payload.map(({ playerNumber, ...player }) => ({
      ...player,
      number: playerNumber,
    })),
  });
};

export const deleteLeague = async (body: DeleteLeaguePayload) => {
  const { status } = await instance.delete('/leagues/', { data: body });

  return status;
};

export const updateLeague = async (data: UpdateLeaguePayload) => {
  await instance.put('/leagues/', data);

  return data.leagueId;
};

export const getSportsCategories = async () => {
  const { data } = await instance.get<SportsCategoriesType[]>('/sport/');

  return data;
};
