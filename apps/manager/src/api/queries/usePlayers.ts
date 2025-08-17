import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import { queryKeys } from '../queryKey';

export const usePlayers = () => useQuery(queryKeys.players.list);

export const useSuspensePlayers = () => useSuspenseQuery(queryKeys.players.list);
