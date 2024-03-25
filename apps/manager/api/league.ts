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
  // 무한 스크롤 처리 필요!
  size = '50',
  leagueName,
  ...params
}: GameListParams & { leagueName: string }) => {
  const { data } = await instance.get<GameListType[]>('/games/', {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    params: { size, ...params },
  });

  return { leagueId: params.league_id, leagueName, data };
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

export const deleteLeagueTeam = async (teamId: string) => {
  const { data } = await instance.delete(`/league-teams/${teamId}/delete/`);

  return data;
};

export const getLeagueTeamPlayers = async (teamId: string) => {
  const { data } = await instance.get<LeaguePlayerWithIDPayload[]>(
    `/league-teams/${teamId}/player/all/`,
  );

  return data;
};

export const getPlayersByTeamId = async (teamId: string) => {
  const { data } = await instance.get<LeaguePlayerWithIDPayload[]>(
    `/league-teams/player/game-team/${teamId}/`,
  );

  return data;
};

export const updateLeaguePlayers = async (
  teamPlayerId: string,
  payload: LeaguePlayerPayload,
) => {
  const { data } = await instance.put(
    `/league-teams/player/${teamPlayerId}/`,
    payload,
  );

  return data;
};

export const createLeaguePlayers = async (
  teamId: number,
  payload: LeaguePlayerPayload[],
) => {
  await instance.post(`/league-teams/${teamId}/player/`, payload);
};

export const deleteLeaguePlayers = async (teamPlayerId: string) => {
  await instance.delete(`/league-teams/player/${teamPlayerId}/`);
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
