import instance from '@/api/index';
import { GameCreatePayload } from '@/types/game';

export const createGame = async (
  leagueId: string,
  payload: GameCreatePayload,
) => {
  const { data } = await instance.post(`/games/${leagueId}/`, payload);

  return data;
};
