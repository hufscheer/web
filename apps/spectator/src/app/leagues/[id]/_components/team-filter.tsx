import type { LeagueTeamType } from '~/api';
import { FilterBadge } from '~/components/ui';

type Props = {
  teams: LeagueTeamType[];
};

export const TeamFilter = ({ teams }: Props) => {
  console.log(teams);

  return (
    <>
      {teams.map((team: LeagueTeamType) => (
        <FilterBadge isActive={false} key={team.teamId}>
          {team.teamName}
        </FilterBadge>
      ))}
    </>
  );
};
