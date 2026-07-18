import { Badge } from '@hcc/ui';
import { Sofia_Sans } from 'next/font/google';
import Image from 'next/image';

import { type GameStateType, type GameTeamType } from '~/api';
import { cn } from '~/utils/cn';

import { Time } from './time';

interface ScoreBoardProps {
  homeTeam: GameTeamType;
  awayTeam: GameTeamType;
  startTime: string;
  gameState: GameStateType;
  quarter: string;
}

export const ScoreBoard = ({
  homeTeam,
  awayTeam,
  startTime,
  gameState,
  quarter,
}: ScoreBoardProps) => {
  return (
    <div className="flex items-center justify-between pt-4 pb-2">
      <TeamArea src={homeTeam.logoImageUrl} teamName={homeTeam.gameTeamName} />
      <Score score={homeTeam.score} gameState={gameState} />
      <StatusArea quarter={quarter} gameState={gameState} startTime={startTime} />
      <Score score={awayTeam.score} gameState={gameState} />
      <TeamArea src={awayTeam.logoImageUrl} teamName={awayTeam.gameTeamName} />
    </div>
  );
};

/* ----- TeamArea ----- */

interface TeamAreaProps {
  src: string;
  teamName: string;
}

const TeamArea = ({ src, teamName }: TeamAreaProps) => {
  return (
    <div className="flex h-full max-h-16 w-full max-w-16 shrink-0 flex-col items-center justify-between">
      <Image
        src={src}
        width={40}
        height={40}
        alt={teamName}
        className="mx-3 h-10 w-10 rounded-full outline -outline-offset-1 outline-greyscale-25"
      />

      <span className="w-full overflow-hidden text-center text-sm font-medium text-ellipsis whitespace-nowrap">
        {teamName}
      </span>
    </div>
  );
};

/* ----- StatusArea ----- */

interface StatusAreaProps {
  quarter: string;
  gameState: GameStateType;
  startTime: string;
}

const StatusArea = ({ quarter, gameState, startTime }: StatusAreaProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <Badge size="sm" variant={gameState === 'PLAYING' ? 'danger' : 'default'}>
        {quarter}
      </Badge>
      <Time startTime={startTime} />
    </div>
  );
};

/* ----- Score ----- */

const Sofia = Sofia_Sans({ subsets: ['latin'] });

interface ScoreProps {
  score: number;
  gameState: GameStateType;
}

const Score = ({ score, gameState }: ScoreProps) => {
  return (
    <span
      className={cn(
        'text-[40px] font-bold text-greyscale-600',
        gameState === 'FINISHED' && 'text-neutral-500',
        Sofia.className,
      )}
    >
      {score}
    </span>
  );
};
