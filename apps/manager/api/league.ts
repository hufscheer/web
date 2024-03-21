import instance from '@/api';
import { GameListParams, GameListType } from '@/types/game';
import {
  DeleteLeaguePayload,
  LeagueIdType,
  LeagueListType,
  LeaguePlayerPayload,
  NewLeaguePayload,
  UpdateLeaguePayload,
  SportsCategoriesType,
  LeaguePlayerWithIDPayload,
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
  const { data } = await instance.get<GameListType[]>('/games/', {
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
  const { data } = await instance.post<{ teamIds: number[] }>(
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

export const updateLeagueTeam = async (teamId: string, payload: FormData) => {
  const { data } = await instance.put(
    `/league-teams/${teamId}/change/`,
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

export const getLeagueTeamPlayers = async (teamId: string) => {
  const { data } = await instance.get<LeaguePlayerWithIDPayload[]>(
    `/league-teams/${teamId}/player/all/`,
  );

  return data;
};

export const updateLeagueTeamPlayers = async (
  teamId: string,
  teamPlayerId: string,
  payload: LeaguePlayerPayload,
) => {
  const { data } = await instance.put(
    `/league-teams/${teamId}/player/${teamPlayerId}/`,
    payload,
  );

  return data;
};

export const createLeaguePlayers = async (
  teamId: number,
  payload: LeaguePlayerPayload[],
) => {
  await instance.post(
    `/league-teams/${teamId}/player/`,
    payload.map(({ playerNumber, ...player }) => ({
      ...player,
      number: playerNumber,
    })),
  );
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
