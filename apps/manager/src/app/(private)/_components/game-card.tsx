import type { PropsWithChildren } from 'react';

import { ChevronForwardIcon } from '@hcc/icons';
import { formatTime } from '@hcc/toolkit';
import { Badge, Button, Typography } from '@hcc/ui';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import type { GameQuarterType, GameTeamType, GameType } from '~/api';
import type { GameStateType, SportType } from '~/api/types';

import { routes } from '~/constants/routes';

export const GameCardRoot = ({ children }: PropsWithChildren) => {
  return <div className="column bg-white p-5">{children}</div>;
};

type GameHeaderProps = {
  leagueId: number;
  sportType: SportType;
  gameQuarter?: GameQuarterType;
} & Pick<GameType, 'id' | 'state' | 'startTime'>;

const GameHeader = ({
  leagueId,
  id: gameId,
  sportType,
  gameQuarter,
  state,
  startTime,
}: GameHeaderProps) => {
  return (
    <div className="row-between">
      <Badge size="sm" variant={state === 'PLAYING' ? 'danger' : 'default'}>
        {state ?? gameQuarter?.label}
      </Badge>
      <Typography className="center-y" color="var(--color-neutral-500)" fontSize={14} asChild>
        <Link href={`/${routes.game(leagueId, gameId, sportType)}`}>
          {formatTime(startTime, { format: 'YYYY.MM.DD. HH:mm' })}
          <ChevronForwardIcon size={20} />
        </Link>
      </Typography>
    </div>
  );
};

const GameTeamGroup = ({ children }: PropsWithChildren) => {
  return <div className="column mt-4 gap-2">{children}</div>;
};

const GameTeam = ({ gameTeamName, logoImageUrl, score }: GameTeamType) => {
  return (
    <div className="row-between">
      <div className="center-y flex-1 gap-2">
        <div className="relative h-6 w-6 overflow-hidden rounded-full">
          <Image src={logoImageUrl} alt={`${gameTeamName} 팀 로고`} priority={false} fill />
        </div>
        <Typography fontSize={14} weight="medium">
          {gameTeamName}
        </Typography>
      </div>
      <Typography className="shrink-0" fontSize={14} weight="medium">
        {score}
      </Typography>
    </div>
  );
};

type GameMenuProps = {
  leagueId: number;
  id: number;
  sportType: SportType;
  state: GameStateType;
};

const GameMenu = ({ leagueId, id, sportType, state }: GameMenuProps) => {
  const isFinished = state === 'FINISHED';

  return (
    <div className="row-between mt-4 gap-2.5">
      {isFinished ? (
        <Typography color="var(--color-neutral-500)" fontSize={14}>
          경기가 종료되어 진행 및 정보 수정이 불가능합니다.
        </Typography>
      ) : (
        <>
          <Button
            disabled={isFinished}
            className={clsx('flex-1', isFinished && 'pointer-events-none')}
            size="sm"
            color="black"
            variant="subtle"
            asChild
          >
            <Link href={`/${routes.game_timeline(leagueId, id, sportType)}`}>경기 진행</Link>
          </Button>
          <Button
            disabled={isFinished}
            className={clsx('flex-1', isFinished && 'pointer-events-none')}
            size="sm"
            color="black"
            variant="subtle"
            asChild
          >
            <Link href={`/${routes.game(leagueId, id, sportType)}`}>경기 정보 수정</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export const GameCard = Object.assign(GameCardRoot, {
  Header: GameHeader,
  TeamGroup: GameTeamGroup,
  Team: GameTeam,
  Menu: GameMenu,
});
