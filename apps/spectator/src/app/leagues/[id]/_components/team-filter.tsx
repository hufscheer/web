'use client';

import Conveyer from '@egjs/conveyer';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const toggleTeam = (leagueTeamId: number) => {
    const sp = new URLSearchParams(searchParams);
    const currentTeams = selectedTeams || [];
    const isActive = currentTeams.includes(leagueTeamId);
    const updatedTeams = isActive
      ? currentTeams.filter(id => id !== leagueTeamId)
      : [...currentTeams, leagueTeamId];

    if (updatedTeams.length === 0) sp.delete('teams');
    else sp.set('teams', updatedTeams.join(','));

    router.replace(`${pathname}?${sp.toString()}`);
  };

  return (
    <div ref={containerRef} className="sticky top-24 z-header flex overflow-hidden bg-white py-3">
      <div className="flex gap-2 overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*:first-child]:pl-5 [&>*:last-child]:pr-5">
        {teams.map(item => {
          const isActive = selectedTeams.includes(item.leagueTeamId);

          return (
            <div key={`team-${item.leagueTeamId}`} className="flex shrink-0 items-center gap-2">
              <FilterBadge isActive={isActive} onClick={() => toggleTeam(item.leagueTeamId)}>
                {item.teamName}
              </FilterBadge>
            </div>
          );
        })}
      </div>
    </div>
  );
};
