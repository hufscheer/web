'use client';

import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { clsx } from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import useLeagueTeams from '@/queries/useLeagueTeams';

import * as styles from './GameFilter.css';

export default function LeagueTeamFilter({ leagueId }: { leagueId: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { leagueTeams } = useLeagueTeams(leagueId);
  const selectedLeagueTeam = Number(searchParams.get('leagueTeam')) || -1;

  // const year = Number(searchParams.get('year'));
  // const league = searchParams.get('league');

  if (!leagueTeams || !leagueTeams.length) return;

  const handleRouter = (teamId: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    const ss = current.get('leagueTeam');

    if (ss === teamId.toString()) {
      current.delete('leagueTeam');
    } else {
      current.set('leagueTeam', teamId.toString());
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

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
              team.leagueTeamId === selectedLeagueTeam &&
                styles.leagueTeam.itemFocused,
            )}
          >
            <button onClick={() => handleRouter(team.leagueTeamId)}>
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
