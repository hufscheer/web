import { ReactNode } from 'react';

import { MatchCheerType, MatchTeamType } from '@/types/match';

import { useMatchCheerById } from './query';

type MatchCheerByIdFetcherProps = {
  matchId: string;
  children: ({
    cheers,
    matchTeams,
  }: {
    cheers: MatchCheerType[];
    matchTeams: MatchTeamType[];
  }) => ReactNode;
};

export default function MatchCheerByIdFetcher({
  matchId,
  children,
}: MatchCheerByIdFetcherProps) {
  const { cheers, matchTeams, cheersError, matchTeamsError } =
    useMatchCheerById(matchId);

  if (cheersError) throw cheersError;
  if (matchTeamsError) throw matchTeamsError;

  return children({ cheers, matchTeams });
}
