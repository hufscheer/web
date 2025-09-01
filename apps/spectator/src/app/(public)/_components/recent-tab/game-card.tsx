import { formatTime } from '@hcc/toolkit';
import { Badge, colors, Typography } from '@hcc/ui';
import type { GameListType } from '~/api';

type Props = {
  game: GameListType;
};

export const GameCard = ({ game }: Props) => {
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
    </div>
  );
};
