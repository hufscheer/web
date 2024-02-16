import instance from '@/api';
import {
  GameCheerType,
  GameCommentPayload,
  GameCommentType,
  GameLineupType,
  GameListType,
  GameStatus,
  GameTimelineType,
  GameType,
  GameVideoType,
} from '@/types/game';
import { convertObjectToQueryString } from '@/utils/queryString';

export type GameListParams = {
  sport_id?: string[];
  status: GameStatus;
  league_id?: string;
  // cursor?: number;
};

export const getGameList = async ({ ...params }: GameListParams) => {
  const queryString = convertObjectToQueryString(params);

  const { data } = await instance.get<GameListType[]>(`games?${queryString}`);

  return data;
};

export const getGameById = async (gameId: string) => {
  const { data } = await instance.get<GameType>(`/games/${gameId}`);

  return data;
};

export const getGameCheerById = async (gameId: string) => {
  const { data } = await instance.get<GameCheerType[]>(
    `/games/${gameId}/cheer`,
  );

  return data;
};

export const postCheer = async ({
  gameId,
  ...payload
}: {
  gameId: string;
  gameTeamId: number;
  cheerCount: number;
}) => {
  return await instance.post(`/games/${gameId}/cheer`, payload);
};

export const getGameComments = async (gameId: string, cursor = 1) => {
  const response = await instance.get<GameCommentType[]>(
    `/games/${gameId}/comments?cursor=${cursor}`,
  );

  return response.data;
};

export const getGameTimelineById = async (gameId: string) => {
  const { data } = await instance.get<GameTimelineType[]>(
    `/games/${gameId}/timeline`,
  );

  return data;
};

export const getGameLineupById = async (gameId: string) => {
  const { data } = await instance.get<GameLineupType[]>(
    `/games/${gameId}/lineup`,
  );

  return data;
};

export const getGameVideoById = async (gameId: string) => {
  const { data } = await instance.get<GameVideoType>(`/games/${gameId}/video`);

  return data;
};

export const getGameCommentById = async (
  gameId: string,
  cursor: number | string,
  size = 20,
) => {
  const { data } = await instance.get<GameCommentType[]>(
    `/games/${gameId}/comments?cursor=${cursor}&size=${size}`,
  );

  return data;
};

export const postGameComment = async (payload: GameCommentPayload) => {
  await instance.post(`/comments`, payload);
};

export const postReportComment = async (payload: { commentId: number }) => {
  await instance.post(`/reports`, payload);
};
