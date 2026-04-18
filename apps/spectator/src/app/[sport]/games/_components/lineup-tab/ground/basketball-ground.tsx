'use client';

import type { ComponentProps } from 'react';

import { ArrowBackIcon } from '@hcc/icons';
import { getBorderColor } from '@hcc/toolkit';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import type { GameTeamPlayerType } from '~/api';

// 정오각형 꼭짓점 좌표 (외접원 반지름 r=100px, 각 팀 진영 중심 기준 오프셋)
// 홈팀 (상단, 홈 골대가 화면 위): 꼭짓점이 위(골대 방향)를 향함 → 상단에 2변이 맞닿음
const HOME_PENTAGON = [
  { x: 0, y: -100 }, // 상단 꼭짓점 → 홈 골대 방향
  { x: 95, y: -31 }, // 우상
  { x: 59, y: 81 }, // 우하
  { x: -59, y: 81 }, // 좌하
  { x: -95, y: -31 }, // 좌상
] as const;

// 원정팀 (하단, 원정 골대가 화면 아래): 꼭짓점이 아래(골대 방향)를 향함 → 하단에 2변이 맞닿음
const AWAY_PENTAGON = [
  { x: 0, y: 100 }, // 하단 꼭짓점 → 원정 골대 방향
  { x: 95, y: 31 }, // 우하
  { x: 59, y: -81 }, // 우상
  { x: -59, y: -81 }, // 좌상
  { x: -95, y: 31 }, // 좌하
] as const;

interface BasketballGroundProps extends ComponentProps<'div'> {
  homeTeamColor?: string;
  awayTeamColor?: string;
  homePlayers: GameTeamPlayerType[];
  awayPlayers: GameTeamPlayerType[];
}

export const BasketballGround = ({
  homeTeamColor,
  awayTeamColor,
  homePlayers,
  awayPlayers,
  className,
  ...props
}: BasketballGroundProps) => {
  return (
    <div className={twMerge('relative min-h-[560px]', className)} {...props}>
      <Image
        src="/images/basketball-court.png"
        alt="농구 코트"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 flex flex-col">
        {/* 홈팀 진영 (상단, 꼭짓점이 위 골대 방향) */}
        <div className="relative flex-1">
          {HOME_PENTAGON.map((pos, i) => {
            const player = homePlayers[i];
            if (!player) return null;
            return (
              <BasketballPlayer
                key={player.id}
                player={player}
                teamColor={homeTeamColor}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>

        {/* 원정팀 진영 (하단, 꼭짓점이 아래 골대 방향) */}
        <div className="relative flex-1">
          {AWAY_PENTAGON.map((pos, i) => {
            const player = awayPlayers[i];
            if (!player) return null;
            return (
              <BasketballPlayer
                key={player.id}
                player={player}
                teamColor={awayTeamColor}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface BasketballPlayerProps extends ComponentProps<'span'> {
  player: GameTeamPlayerType;
  teamColor?: string;
}

const BasketballPlayer = ({ player, teamColor, className, ...props }: BasketballPlayerProps) => {
  const borderColor = getBorderColor(teamColor);
  return (
    <span className={twMerge('column-center z-above', className)} {...props}>
      <span
        style={{ backgroundColor: teamColor, borderColor }}
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
