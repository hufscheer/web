import instance from '@/api';
import {
  GameCheerTalkType,
  GameLineupType,
  GameListType,
  GameTimelineType,
  GameListParams,
} from '@/types/game';

export const getGameList = async ({
  size = '5',
  cursor,
  ...params
}: GameListParams) => {
  const { data } = await instance.get<GameListType[]>('/games', {
    params: { size, cursor, ...params },
  });

  return data;
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
