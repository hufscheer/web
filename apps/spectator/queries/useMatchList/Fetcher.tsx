import { ReactNode } from 'react';

import { MatchListParams } from '@/api/match';
import { MatchListType } from '@/types/match';

import { useMatchList } from './query';

interface MatchListFetcherProps
  extends Omit<MatchListParams, 'cursor' | 'size'> {
  children: ({ matchList }: { matchList: MatchListType[] }) => ReactNode;
}

export default function MatchListFetcher({
  children,
  ...props
}: MatchListFetcherProps) {
  const { matchList, error } = useMatchList(props);

  if (error) throw error;

  return children({ matchList });
}
