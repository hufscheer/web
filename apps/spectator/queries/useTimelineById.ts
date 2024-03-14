import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameTimelineById } from '@/api/game';

import { useGameTeamInfo } from './useGameTeamInfo';

export const useTimelineById = (gameId: string) => {
  const { getTeamInfo } = useGameTeamInfo(gameId);
  const { error, ...rest } = useSuspenseQuery({
    queryKey: ['game-timeline', gameId],
    queryFn: () => getGameTimelineById(gameId),
    select: data => {
      return data.map(d => ({
        ...d,
        records: d.records.map(record => ({
          ...record,
          ...getTeamInfo(record.gameTeamId),
        })),
      }));
    },
  });

  if (error) throw error;

  return rest;
};
