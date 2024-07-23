import { LeagueListType, useGamesByLeagueList, StateType } from '@hcc/api';

type MatchOverviewProps = {
  status: StateType;
  leagues: LeagueListType[];
};

const MatchOverview = ({ status, leagues }: MatchOverviewProps) => {
  useGamesByLeagueList(leagues, status);

  return (
    <div>
      {status}
      {leagues.map(league => (
        <span key={league.leagueId}>{league.leagueId}</span>
      ))}
    </div>
  );
};

export default MatchOverview;
