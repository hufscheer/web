import instance from '@/api';
import { TeamType } from '@/types/team';

/* 리그 내 팀 관리 API */
export const getTeamListByLeagueId = async (leagueId: string) => {
  const { data } = await instance.get<TeamType[]>(`/league-teams/${leagueId}/`);

  return data;
};

export const postTeamByLeagueId = async (payload: {
  leagueId: string;
  body: FormData;
}) => {
  await instance.post(`/team/register/${payload.leagueId}/`, payload.body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const putTeamById = async (payload: {
  teamId: string;
  body: FormData;
}) => {
  await instance.put(`/team/${payload.teamId}/change/`, payload.body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
