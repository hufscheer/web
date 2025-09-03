import { formatTime } from '@hcc/toolkit';
import { Badge, Button, colors, Typography } from '@hcc/ui';
import Image from 'next/image';
import type { GameListType } from '~/api';

type Props = {
  game: GameListType;
};

export const GameCard = ({ game }: Props) => {
  if (game.gameTeams.length < 2) return null;

  const home = game.gameTeams[0];
  const away = game.gameTeams[1];

  return (
    <div className="column">
      <div className="row-between">
        <Typography color={colors.neutral500} fontSize={13} weight="medium">
          {game.round === 2 ? '결승' : `${game.round}강`}
          {' ‧ '}
          {formatTime(game.startTime, { format: 'MM.DD. HH:mm' })}
        </Typography>
        <Badge size="sm">{game.gameQuarter}</Badge>
      </div>

      <div className="row-between mt-2">
        <div className="center-y flex-1 justify-end gap-1 overflow-hidden">
          <Typography
            className="overflow-hidden text-ellipsis whitespace-nowrap"
            fontSize={14}
            weight="medium"
          >
            {home.gameTeamName}
          </Typography>
          <div className="center h-7 w-7 select-none overflow-hidden rounded-full border border-neutral-100">
            <Image
              className="rounded-full object-cover"
              src={home.logoImageUrl}
              alt={`${home.gameTeamName} 로고`}
              width={28}
              height={28}
              draggable={false}
            />
          </div>
        </div>

        <div className="center min-w-18">
          <Typography weight="medium">
            {home.score} : {away.score}
          </Typography>
        </div>

        <div className="center-y flex-1 gap-1 overflow-hidden">
          <div className="center h-7 w-7 select-none overflow-hidden rounded-full border border-neutral-100">
            <Image
              className="rounded-full object-cover"
              src={away.logoImageUrl}
              alt={`${away.gameTeamName} 로고`}
              width={28}
              height={28}
              draggable={false}
            />
          </div>
          <Typography
            className="overflow-hidden text-ellipsis whitespace-nowrap"
            fontSize={14}
            weight="medium"
          >
            {away.gameTeamName}
          </Typography>
        </div>
      </div>

      <div className="center-y mt-2 gap-2 self-center">
        <Button
          className="!border !border-neutral-100 min-w-12"
          variant="ghost"
          color="black"
          size="xs"
        >
          중계
        </Button>
        <Button
          className="!border !border-neutral-100 min-w-12"
          variant="ghost"
          color="black"
          size="xs"
        >
          응원
        </Button>
      </div>
    </div>
  );
};
