import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { TeamCreateType } from '../types';

type Request = {
  leagueId: string;
  team: TeamCreateType;
};

const postCreateLeagueTeam = ({ leagueId, team }: Request) =>
  fetcher.post<void>(`/leagues/${leagueId}/teams`, { team });

const useCreateLeagueTeam = () =>
  useMutation({ mutationFn: postCreateLeagueTeam });

export default useCreateLeagueTeam;
