import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameTimelineById } from '@/api/game';

import useGameById from './useGameById';

export const useTimelineById = (gameId: string) => {
  const { gameDetail } = useGameById(gameId);
  const teams = gameDetail.gameTeams;
  const { error, ...rest } = useSuspenseQuery({
    queryKey: ['game-timeline', gameId],
    queryFn: () => getGameTimelineById(gameId),
    select: data => {
      return data.map(d => ({
        ...d,
        records: d.records.map(record => ({
          ...record,
          direction: (['left', 'right'] as const)[
            teams.findIndex(team => team.gameTeamName === record.teamName)
          ],
        })),
      }));
    },
  });

  if (error) throw error;

  return rest;
};
