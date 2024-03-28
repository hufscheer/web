'use client';

import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { clsx } from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent, forwardRef, useEffect, useRef, useState } from 'react';

import useLeagueTeams from '@/queries/useLeagueTeams';

import * as styles from './GameFilter.css';

export default function LeagueTeamFilter({ leagueId }: { leagueId: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);
  const prevScrollLeftRef = useRef(0);

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

    const containerWidth =
      scrollRef.current.parentElement?.clientWidth ??
      scrollRef.current.clientWidth;
    const itemWidth = itemElement.offsetWidth;
    const itemLeft = itemElement.offsetLeft;

    const scrollCoordinate = itemLeft - containerWidth / 2 + itemWidth / 2;

    scrollRef.current.scrollTo({
      left: scrollCoordinate,
      behavior: 'smooth',
    });
  };

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { leagueTeams } = useLeagueTeams(leagueId);
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
        {leagueTeams.map(team => {
          const isSelected = selectedLeagueTeam.includes(
            team.leagueTeamId.toString(),
          );

          return (
            <Item
              key={team.leagueTeamId}
              team={team}
              isSelected={isSelected}
              handleRouter={handleRouter}
              ref={itemRef}
            />
          );
        })}
      </ul>
    </div>
  );
}

type ItemProps = {
  isSelected: boolean;
  handleRouter: (
    e: MouseEvent<HTMLButtonElement>,
    selectedTeamId: number,
  ) => void;
  team: {
    leagueTeamId: number;
    teamName: string;
  };
};

const Item = forwardRef<HTMLLIElement, ItemProps>(function Item(
  { team: { leagueTeamId, teamName }, isSelected, handleRouter },
  ref,
) {
  return (
    <li ref={ref}>
      <button
        onClick={e => handleRouter(e, leagueTeamId)}
        className={clsx(
          styles.leagueTeam.itemExpanded,
          isSelected && styles.leagueTeam.itemFocused,
        )}
      >
        {teamName}
      </button>
    </li>
  );
});
