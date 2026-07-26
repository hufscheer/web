'use client';

import type { ComponentProps } from 'react';

import { ArrowBackIcon } from '@hcc/icons';
import { getBorderColor } from '@hcc/toolkit';
import { twMerge } from 'tailwind-merge';

import type { GameTeamPlayerType } from '~/api';

const GroundBase = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={twMerge(
        'column relative min-h-[600px] w-full bg-[#3D9A54]',

        "before:absolute before:top-1/2 before:left-1/2 before:content-['']",
        'before:h-[5rem] before:w-[5rem]',
        'before:rounded-full before:border-[2px] before:border-white before:border-solid',
        'before:-translate-x-1/2 before:-translate-y-1/2 before:transform',

        "after:absolute after:top-1/2 after:right-0 after:left-0 after:content-['']",
        'after:border-white after:border-t-[2px] after:border-solid',
        'after:-translate-y-1/2 after:transform',

        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const GroundPlayerField = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={twMerge(
        'flex max-h-[360px] min-h-[300px] flex-col items-center justify-between px-3 py-6',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface PlayerProps extends ComponentProps<'span'> {
  player: GameTeamPlayerType;
  teamColor?: string;
}

const GroundPlayer = ({ player, teamColor, ...props }: PlayerProps) => {
  const borderColor = getBorderColor(teamColor);
  return (
    <span className="column-center z-above flex-1" {...props}>
      <span
        style={{ backgroundColor: teamColor, borderColor: borderColor }}
        className="center relative h-8 w-8 rounded-full border text-sm font-medium text-white"
      >
        {player.jerseyNumber}
        {player.isReplaced && (
          <i className="center absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border border-[var(--color-danger-600)] bg-[var(--color-danger-200)]">
            <ArrowBackIcon className="text-[var(--color-danger-600)]" size={8} />
          </i>
        )}
      </span>
      <span className="mt-1 rounded-lg border border-[#00000010] bg-[#00000030] px-1.5 py-0.5 text-xs font-medium text-white">
        {player.playerName}
      </span>
    </span>
  );
};

export const Ground = Object.assign(GroundBase, {
  PlayerField: GroundPlayerField,
  Player: GroundPlayer,
});
