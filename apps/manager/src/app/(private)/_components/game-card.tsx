import { ChevronForwardIcon } from '@hcc/icons';
import { formatTime } from '@hcc/toolkit';
import { Badge, Button, Typography } from '@hcc/ui';
import Image from 'next/image';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import type { GameTeamType, GameType } from '~/api';
import { routes } from '~/constants/routes';

export const GameCardRoot = ({ children }: PropsWithChildren) => {
  return <div className="column bg-white p-5">{children}</div>;
};

type GameCardProps = {
  leagueId: string;
} & Pick<GameType, 'id' | 'gameQuarter' | 'startTime'>;

const GameHeader = ({ leagueId, id: gameId, gameQuarter, startTime }: GameCardProps) => {
  return (
    <div className="row-between">
      <Badge size="sm" variant="danger">
        {gameQuarter} &middot;
      </Badge>
      <Typography className="center-y" color="var(--color-neutral-500)" fontSize={14} asChild>
        <Link href={`${routes.league}/${leagueId}/${gameId}`}>
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

const GameMenu = () => {
  return (
    <div className="row-between mt-4 gap-2.5">
      <Button className="flex-1" size="sm" color="black" variant="subtle" asChild>
        <Link href={''}>경기 진행</Link>
      </Button>
      <Button className="flex-1" size="sm" color="black" variant="subtle" asChild>
        <Link href={''}>경기 정보 수정</Link>
      </Button>
    </div>
  );
};

export const GameCard = Object.assign(GameCardRoot, {
  Header: GameHeader,
  TeamGroup: GameTeamGroup,
  Team: GameTeam,
  Menu: GameMenu,
});
