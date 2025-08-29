'use client';

import Image from 'next/image';
import { useSuspenseTeams } from '~/api';
import { TeamFilter } from './team-filter';
import { useTeamUnits } from './useTeamUnits';

export const TeamTab = () => {
  const { selected } = useTeamUnits();
  const { data } = useSuspenseTeams({ units: selected });

  return (
    <>
      <TeamFilter />

      <div className="flex-1 overflow-y-auto">
        {data.map(team => (
          <div key={team.id} className="border-gray-100 border-b p-4">
            <div className="flex items-center gap-3">
              {team.logoImageUrl && (
                <div className="relative h-6 w-6">
                  <Image src={team.logoImageUrl} alt={`${team.name} 로고`} fill />
                </div>
              )}
              <div>
                <div className="font-medium">{team.name}</div>
                <div className="text-gray-500 text-sm">{team.unit}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
