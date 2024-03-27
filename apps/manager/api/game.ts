import instance from '@/api/index';
import {
  GameCreatePayload,
  GameLineupType,
  GameTimelineType,
  GenericRecordPayload,
  LowerRecordType,
  GameInfoType,
  SportsQuarterType,
  GameTeamType,
  GameUpdatePayload,
  OptionalLineup,
} from '@/types/game';

export const getGameDetail = async (gameId: string) => {
  const { data } = await instance.get<GameInfoType>(`/games/${gameId}/info/`);

  return data;
};

export const createGame = async (
  leagueId: string,
  payload: GameCreatePayload,
) => {
  const { data } = await instance.post(`/games/${leagueId}/`, payload);

  return data;
};

export const deleteGame = async (gameId: string) => {
  const { data } = await instance.delete(`/games/${gameId}/delete/`);

  return data;
};

export const getGameTimeline = async (gameId: string) => {
  const { data } = await instance.get<GameTimelineType[]>(
    `/games/${gameId}/timeline/`,
  );

  return data;
};

export const createGameTimeline = async (
  recordType: LowerRecordType,
  { gameId, ...payload }: GenericRecordPayload<typeof recordType>,
) => {
  const { data } = await instance.post(
    `/timelines/create/${recordType}/${gameId}/`,
    payload,
  );

  return data;
};

export const getGameTeams = async (gameId: string) => {
  const { data } = await instance.get<GameTeamType[]>(`/games/${gameId}/team/`);

  return data;
};

export const getQuarters = async (sportId: string) => {
  const { data } = await instance.get<SportsQuarterType[]>(
    `/sports/${sportId}/quarter/`,
  );

  return data;
};

export const getLineup = async (teamId: string) => {
  if (!teamId) return null;

  const { data } = await instance.get<GameLineupType[]>(
    `/games/team/${teamId}/lineup-player/all/`,
  );

  return data;
};

export const updateGame = async (
  gameId: string,
  payload: GameUpdatePayload,
) => {
  const { data } = await instance.put(`/games/${gameId}/change/`, payload);

  return data;
};

export const createLineup = async (
  teamId: string,
  payload: OptionalLineup[],
) => {
  const { data } = await instance.put(
    `/games/team/${teamId}/lineup-player/`,
    payload,
  );

  return data;
};
