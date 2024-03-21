import instance from '@/api';
import { GameInfoType, PutMatchInfoPayload } from '@/types/match';

export const getMatchInfoById = async (matchId: string) => {
  const { data } = await instance.get<GameInfoType>(`/game/info/${matchId}/`);

  return data;
};

export const putMatchInfo = async (payload: {
  matchId: string;
  data: PutMatchInfoPayload;
}) => {
  await instance.put(`/game/change/${payload.matchId}/`, payload.data);

  return payload.matchId;
};
