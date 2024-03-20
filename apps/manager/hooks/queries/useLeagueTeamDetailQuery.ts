import useLeagueTeamQuery from './useLeagueTeamQuery';

export default function useLeagueTeamDetailQuery(
  leagueId: string,
  teamId: string,
) {
  const { data: teams } = useLeagueTeamQuery(leagueId);

  if (!teams) return { data: null };

  const team = Object.values(teams)
    .flat()
    ?.find(team => team.id === Number(teamId));

  return { data: team };
}
