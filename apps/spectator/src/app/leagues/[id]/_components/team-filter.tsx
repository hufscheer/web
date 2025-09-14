'use client';

import Conveyer from '@egjs/conveyer';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import type { LeagueTeamType } from '~/api';
import { FilterBadge } from '~/components/ui';

type Props = {
  teams: LeagueTeamType[];
  selectedTeams: number[];
};

export const TeamFilter = ({ teams, selectedTeams }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const conveyerRef = useRef<Conveyer | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current) return;
    conveyerRef.current = new Conveyer(containerRef.current, {
      horizontal: true,
      useDrag: true,
      useSideWheel: true,
      preventClickOnDrag: true,
    });
    return () => conveyerRef.current?.destroy();
  }, []);

  const toggleTeam = (teamId: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentTeams = selectedTeams || [];
    const isActive = currentTeams.includes(teamId);
    const updatedTeams = isActive
      ? currentTeams.filter(id => id !== teamId)
      : [...currentTeams, teamId];

    if (updatedTeams.length === 0) {
      searchParams.delete('teams');
    } else {
      searchParams.set('teams', updatedTeams.join(','));
    }

    router.replace(`${window.location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div ref={containerRef} className="flex overflow-hidden bg-white py-3">
      <div className="flex gap-2 [&>*:first-child]:pl-5 [&>*:last-child]:pr-5">
        {teams.map(item => {
          const isActive = selectedTeams.includes(item.teamId);

          return (
            <div key={`team-${item.teamId}`} className="flex shrink-0 items-center gap-2">
              <FilterBadge isActive={isActive} onClick={() => toggleTeam(item.teamId)}>
                {item.teamName}
              </FilterBadge>
            </div>
          );
        })}
      </div>
    </div>
  );
};
