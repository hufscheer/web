import { useGame } from '@hcc/api';

export const useGameTeamInfo = (
  gameId: string,
): { getTeamInfo: typeof getTeamInfo } => {
  const { data: gameDetail } = useGame(gameId);

  const getTeamInfo = (gameTeamId: number) => {
    const order = gameDetail.gameTeams.findIndex(
      team => team.gameTeamId === gameTeamId,
    );

    return {
      direction: (['left', 'right'] as const)[order],
      logoImageUrl: gameDetail.gameTeams[order]?.logoImageUrl || '',
    };
  };

  return { getTeamInfo };
};
