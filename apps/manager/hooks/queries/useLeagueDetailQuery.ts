import useLeagueQuery from './useLeagueQuery';

export default function useLeagueDetailQuery(leagueId: number) {
  const { data: leagues } = useLeagueQuery();

  if (!leagues) return { data: null };

  const league = Object.values(leagues)
    .flat()
    ?.find(league => league.leagueId === leagueId);

  return { data: league };
}
