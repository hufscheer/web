import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { clsx } from 'clsx';
import { useState } from 'react';

import { useFilterContext } from '@/app/_contexts/FilterContext';
import { useFilterParams } from '@/hooks/useFilterParams';
import useLeagueTeams from '@/queries/useLeagueTeams';

import * as styles from './GameFilter.css';

export default function LeagueTeamFilter() {
  const { league, leagueTeam } = useFilterContext();
  const { leagueTeams } = useLeagueTeams(league);
  const { updateTeam } = useFilterParams();

  const [isExpanded, setIsExpanded] = useState(false);

  if (!leagueTeams || leagueTeams.length < 1) return;

  return (
    <div className={styles.leagueTeam.wrapper}>
      <ul
        className={clsx(
          styles.leagueTeam.list,
          isExpanded && styles.leagueTeam.listExpand,
        )}
      >
        {leagueTeams.map(team => (
          <li
            key={team.leagueTeamId}
            className={clsx(
              styles.leagueTeam.item,
              team.leagueTeamId === leagueTeam && styles.leagueTeam.itemFocused,
            )}
          >
            <button onClick={() => updateTeam(team.leagueTeamId)}>
              {team.teamName}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={clsx(
          styles.leagueTeam.expandButton,
          isExpanded && styles.leagueTeam.expandButtonFocused,
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Icon
          source={CaretDownIcon}
          className={clsx(
            styles.leagueTeam.expandButtonIcon,
            isExpanded && styles.leagueTeam.expandButtonIconFocused,
          )}
        />
      </button>
    </div>
  );
}
