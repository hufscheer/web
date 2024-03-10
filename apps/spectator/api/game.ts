import instance from '@/api';
import {
  GameCheerType,
  GameCheerTalkPayload,
  GameCheerTalkType,
  GameLineupType,
  GameListType,
  GameTimelineType,
  GameType,
  GameVideoType,
  GameListParams,
} from '@/types/game';
import { convertObjectToQueryString } from '@/utils/queryString';

export const getGameList = async ({
  size = '5',
  cursor,
  ...params
}: GameListParams) => {
  const queryString = convertObjectToQueryString(params);

  const { data } = await instance.get<GameListType[]>(
    `/games?${queryString}&cursor=${cursor}&size=${size}`,
  );

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

export const getGameCheerTalkById = async (
  gameId: string,
  cursor: number | string,
  size = 20,
) => {
  const { data } = await instance.get<GameCheerTalkType[]>(
    `/games/${gameId}/cheer-talks?cursor=${cursor}&size=${size}`,
  );

  return data;
};

export const postGameCheerTalk = async (payload: GameCheerTalkPayload) => {
  await instance.post(`/cheer-talks`, payload);
};

export const postReportCheerTalk = async (payload: { cheerTalkId: number }) => {
  await instance.post(`/reports`, payload);
};
