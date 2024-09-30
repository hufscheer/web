import useGameById from './useGameById';

export const useGameTeamInfo = (
  gameId: string,
): { getTeamInfo: typeof getTeamInfo } => {
  const { gameDetail } = useGameById(gameId);

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
