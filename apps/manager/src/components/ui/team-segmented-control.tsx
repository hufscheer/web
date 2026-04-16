'use client';

import { twMerge } from 'tailwind-merge';

type Team = { gameTeamId: number; teamName: string };

type Props = {
  teams: Team[];
  value: number | null;
  onChange: (teamId: number) => void;
};

export function TeamSegmentedControl({ teams, value, onChange }: Props) {
  return (
    <div className="flex overflow-hidden rounded-xl bg-[#E9EBEE] p-1">
      {teams.map((team) => (
        <button
          key={team.gameTeamId}
          type="button"
          className={twMerge(
            'flex flex-1 items-center justify-center rounded-lg py-3 text-sm font-medium transition-colors',
            value === team.gameTeamId ? 'bg-white text-black shadow-sm' : 'text-neutral-400',
          )}
          onClick={() => onChange(team.gameTeamId)}
        >
          {team.teamName}
        </button>
      ))}
    </div>
  );
}
