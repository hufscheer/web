import instance from '@/api';
import {
  MatchInfoType,
  PutMatchInfoPayload,
  SportsQuarterType,
} from '@/types/match';

export const getMatchInfoByIdWithAuth = async (matchId: string) => {
  const { data } = await instance.get<MatchInfoType>(`/game/info/${matchId}/`);

  return data;
};

export const putMatchInfoWithAuth = async (payload: {
  matchId: string;
  data: PutMatchInfoPayload;
}) => {
  await instance.put(`/game/change/${payload.matchId}/`, payload.data);

  return payload.matchId;
};

export const getSportsQuarterByIdWithAuth = async (sportId: number) => {
  const { data } = await instance.get<SportsQuarterType[]>(
    `/sport/${sportId}/quarter/`,
  );

  return data;
};
