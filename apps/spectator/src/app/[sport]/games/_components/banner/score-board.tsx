import { Badge } from '@hcc/ui';
import { Sofia_Sans } from 'next/font/google';
import Image from 'next/image';

import { useSuspenseGame, type GameStateType, type GameTeamType } from '~/api';
import { cn } from '~/utils/cn';

import { Time } from './time';

interface ScoreBoardProps {
  homeTeam: GameTeamType;
  awayTeam: GameTeamType;

  gameId: number;
  gameState: GameStateType;
  quarter: string;
}

export const ScoreBoard = ({ homeTeam, awayTeam, gameId, gameState, quarter }: ScoreBoardProps) => {
  const { data } = useSuspenseGame({ gameId });

  const startTime = new Date(data.startTime);

  const matchDate = startTime.toLocaleDateString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    timeZone: 'Asia/Seoul',
  });

  const matchTime = startTime.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'Asia/Seoul',
  });

  return (
    <div className="flex items-center justify-between pt-4 pb-2">
      <TeamArea src={homeTeam.logoImageUrl} teamName={homeTeam.gameTeamName} />
      <Score score={homeTeam.score} gameState={gameState} />
      <CenterArea
        quarter={quarter}
        gameState={gameState}
        matchDate={matchDate}
        matchTime={matchTime}
      />
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

/* ----- CenterArea ----- */

interface CenterAreaProps {
  quarter: string;
  gameState: GameStateType;
  matchDate: string;
  matchTime: string;
}

const CenterArea = ({ quarter, gameState, matchDate, matchTime }: CenterAreaProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <Badge size="sm" variant={gameState === 'PLAYING' ? 'danger' : 'default'}>
        {quarter}
      </Badge>
      <Time date={matchDate} time={matchTime} />
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
