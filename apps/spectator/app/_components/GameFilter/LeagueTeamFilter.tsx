'use client';

import Flicking from '@egjs/react-flicking';
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
  const selectedLeagueTeam = searchParams.get('leagueTeam')?.split(',') || [];

  if (!leagueTeams || !leagueTeams.length) return;

  const handleRouter = (selectedTeamId: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const teamIdParams = current.get('leagueTeam') || null;
    const teamIds = teamIdParams?.split(',').map(Number) || [];

    const hasTeamId = teamIds.includes(selectedTeamId);
    const updatedTeamIds = hasTeamId
      ? teamIds.filter(id => id !== selectedTeamId)
      : [...teamIds, selectedTeamId].sort((a, b) => a - b);

    if (!updatedTeamIds.length) current.delete('leagueTeam');
    else current.set('leagueTeam', updatedTeamIds.join(','));

    const query = current ? `?${current}` : '';

    router.push(`${pathname}${query}`);
  };

  return (
    <div className={styles.leagueTeam.wrapper}>
      <button
        className={clsx(styles.expandable.button)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Icon
          source={CaretDownIcon}
          className={clsx(
            styles.expandable.caret,
            isExpanded && styles.expandable.caretFocused,
          )}
        />
      </button>

      {isExpanded ? (
        <ul
          className={clsx(styles.leagueTeam.list, styles.leagueTeam.listExpand)}
        >
          {leagueTeams.map(team => {
            const isSelected = selectedLeagueTeam.includes(
              team.leagueTeamId.toString(),
            );

            return (
              <li key={team.leagueTeamId}>
                <button
                  onClick={() => handleRouter(team.leagueTeamId)}
                  className={clsx(
                    styles.leagueTeam.itemExpanded,
                    isSelected && styles.leagueTeam.itemFocused,
                  )}
                >
                  {team.teamName}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <Flicking
          viewportTag="div"
          cameraTag="ul"
          align="center"
          duration={500}
          autoResize={true}
          bound={true}
          hideBeforeInit={true}
          className={clsx(styles.leagueTeam.list)}
        >
          {leagueTeams.map(team => {
            const isSelected = selectedLeagueTeam.includes(
              team.leagueTeamId.toString(),
            );

            return (
              <li key={team.leagueTeamId}>
                <button
                  onClick={() => handleRouter(team.leagueTeamId)}
                  className={clsx(
                    styles.leagueTeam.itemFlicking,
                    isSelected && styles.leagueTeam.itemFocused,
                  )}
                >
                  {team.teamName}
                </button>
              </li>
            );
          })}
        </Flicking>
      )}
    </div>
  );
}
