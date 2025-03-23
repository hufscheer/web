import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameTimelineById } from '@/src/api/game';

import { useGameTeamInfo } from './useGameTeamInfo';

const TIMELINE_POLLING_INTERVAL = 1000 * 60;
export const useTimelineById = (gameId: string, interval = TIMELINE_POLLING_INTERVAL) => {
  const { getTeamInfo } = useGameTeamInfo(gameId);
  const query = useSuspenseQuery({
    queryKey: ['game-timeline', gameId],
    queryFn: () => getGameTimelineById(gameId),
    select: (data) => {
      return data.map((d) => ({
        ...d,
        records: d.records.map((record) => ({
          ...record,
          ...getTeamInfo(record.gameTeamId),
        })),
      }));
    },

    // refetch options
    refetchInterval: interval,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60,
  });

  if (query.error) throw query.error;

  return query;
};
