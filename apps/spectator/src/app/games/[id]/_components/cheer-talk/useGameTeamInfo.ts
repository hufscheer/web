import { useSuspenseGame } from '~/api';

export const useSuspenseGameTeamInfo = (gameId: number) => {
  const { data } = useSuspenseGame({ gameId });

  const getTeamInfo = (gameTeamId: number) => {
    const order = data.gameTeams.findIndex(team => team.gameTeamId === gameTeamId);

    return {
      direction: (['HOME', 'AWAY'] as const)[order] as 'HOME' | 'AWAY',
      logoImageUrl: data.gameTeams[order]?.logoImageUrl || '',
    };
  };

  return { getTeamInfo };
};
