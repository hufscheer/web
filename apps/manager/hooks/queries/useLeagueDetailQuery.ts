import useLeagueQuery from './useLeagueQuery';

export default function useLeagueDetailQuery(leagueId: number) {
  const { data: leagues } = useLeagueQuery();

  const league = leagues?.find(league => league.leagueId === leagueId);

  return { data: league };
}
