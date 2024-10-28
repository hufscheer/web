import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useTimeline = (gameId: string) => useQuery(queryKeys.timeline(gameId));

export default useTimeline;
