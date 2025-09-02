import { formatTime } from '@hcc/toolkit';
import { Badge, colors, Typography } from '@hcc/ui';
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
        <Typography color={colors.neutral500} fontSize={12} weight="medium">
          {game.round === 2 ? '결승' : `${game.round}강`}
          {' ‧ '}
          {formatTime(game.startTime, { format: 'MM.DD. HH:mm' })}
        </Typography>
        <Badge size="sm">{game.gameQuarter}</Badge>
      </div>

      <div className="row-between">
        <div className="center-y gap-2">
          <div className="h-6 w-6 select-none overflow-hidden rounded-full">
            <Image
              src={home.logoImageUrl}
              alt={`${home.gameTeamName} 로고`}
              width={20}
              height={20}
              draggable={false}
            />
          </div>
          <Typography weight="medium">{home.gameTeamName}</Typography>
        </div>

        <div className="center-y gap-2">
          <div className="h-6 w-6 select-none overflow-hidden rounded-full">
            <Image
              src={away.logoImageUrl}
              alt={`${away.gameTeamName} 로고`}
              width={20}
              height={20}
              draggable={false}
            />
          </div>
          <Typography weight="medium">{away.gameTeamName}</Typography>
        </div>
      </div>
    </div>
  );
};
