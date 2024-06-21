'use client';

import { useConveyer } from '@egjs/react-conveyer';
import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { clsx } from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import useLeagueTeams from '@/queries/useLeagueTeams';

import * as styles from './GameFilter.css';

type LeagueTeamFilterProps = {
  leagueId: number;
  round: number;
};

export default function LeagueTeamFilter({
  leagueId,
  round,
}: LeagueTeamFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollRef = useRef<HTMLUListElement | null>(null);
  const prevScrollLeftRef = useRef(0);

  useConveyer(scrollRef, {
    horizontal: true,
    useDrag: true,
    useSideWheel: true,
    preventClickOnDrag: true,
  });

  const toggleExpand = () => {
    if (!isExpanded && scrollRef.current) {
      prevScrollLeftRef.current = scrollRef.current.scrollLeft;
    }
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (!isExpanded && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: prevScrollLeftRef.current,
        behavior: 'instant',
      });
    }
  }, [isExpanded]);

  const scrollToCenter = (itemElement: HTMLButtonElement) => {
    if (!itemElement || !scrollRef.current) return;

    itemElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  };

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { leagueTeams } = useLeagueTeams(leagueId, round);
  const selectedLeagueTeam = searchParams.get('leagueTeam')?.split(',') || [];

  if (!leagueTeams || !leagueTeams.length) return;

  const handleRouter = (
    event: MouseEvent<HTMLButtonElement>,
    selectedTeamId: number,
  ) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const teamIdParams = current.get('leagueTeam') || null;
    const teamIds = teamIdParams?.split(',').map(Number) || [];

    const hasTeamId = teamIds.includes(selectedTeamId);
    const updatedTeamIds = hasTeamId
      ? teamIds.filter(id => id !== selectedTeamId)
      : [...teamIds, selectedTeamId].sort((a, b) => a - b);

    if (!hasTeamId) scrollToCenter(event.currentTarget);

    if (!updatedTeamIds.length) current.delete('leagueTeam');
    else current.set('leagueTeam', updatedTeamIds.join(','));

    const query = current ? `?${current}` : '';

    router.push(`${pathname}${query}`);
  };

  return (
    <div className={styles.leagueTeam.wrapper}>
      <button className={clsx(styles.expandable.button)} onClick={toggleExpand}>
        <Icon
          source={CaretDownIcon}
          className={clsx(
            styles.expandable.caret,
            isExpanded && styles.expandable.caretFocused,
          )}
        />
      </button>

      <ul
        ref={scrollRef}
        className={clsx(
          styles.leagueTeam.list,
          isExpanded && styles.leagueTeam.listExpanded,
        )}
      >
        {leagueTeams.map(team => (
          <li key={team.leagueTeamId}>
            <button
              onClick={e => handleRouter(e, team.leagueTeamId)}
              className={clsx(
                styles.leagueTeam.itemExpanded,
                selectedLeagueTeam.includes(team.leagueTeamId.toString()) &&
                  styles.leagueTeam.itemFocused,
              )}
            >
              {team.teamName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
