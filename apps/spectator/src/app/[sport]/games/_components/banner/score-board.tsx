import { Badge } from '@hcc/ui';
import { Sofia_Sans } from 'next/font/google';
import Image from 'next/image';

import type { GameStateType, GameTeamType } from '~/api';

import { cn } from '~/utils/cn';

interface ScoreBoardProps {
  homeTeam: GameTeamType;
  awayTeam: GameTeamType;

  gameState: GameStateType;
  quarter: string;
}

export const ScoreBoard = ({ homeTeam, awayTeam, gameState, quarter }: ScoreBoardProps) => {
  return (
    <div className="flex items-center justify-between pt-4 pb-2">
      <TeamArea src={homeTeam.logoImageUrl} teamName={homeTeam.gameTeamName} />
      <ScoreArea homeTeam={homeTeam} awayTeam={awayTeam} gameState={gameState} quarter={quarter} />
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

/* ----- ScoreArea ----- */

const Sofia = Sofia_Sans({ subsets: ['latin'] });

interface ScoreAreaProps {
  homeTeam: GameTeamType;
  awayTeam: GameTeamType;

  gameState: GameStateType;
  quarter: string;
}

const ScoreArea = ({ homeTeam, awayTeam, gameState, quarter }: ScoreAreaProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Badge size="sm" variant={gameState === 'PLAYING' ? 'danger' : 'default'}>
        {quarter}
      </Badge>

      <div className="flex items-center gap-3">
        <Score score={homeTeam.score} gameState={gameState} />
        <Colon />
        <Score score={awayTeam.score} gameState={gameState} />
      </div>
    </div>
  );
};

interface ScoreProps {
  score: number;
  gameState: GameStateType;
}

const Score = ({ score, gameState }: ScoreProps) => {
  return (
    <span
      className={cn(
        'text-4xl font-medium text-neutral-900',
        gameState === 'FINISHED' && 'text-neutral-500',
        Sofia.className,
      )}
    >
      {score}
    </span>
  );
};

const Colon = () => {
  return (
    <div className="column gap-2">
      <span className="aspect-square w-[3px] rounded-full bg-neutral-500" />
      <span className="aspect-square w-[3px] rounded-full bg-neutral-500" />
    </div>
  );
};
