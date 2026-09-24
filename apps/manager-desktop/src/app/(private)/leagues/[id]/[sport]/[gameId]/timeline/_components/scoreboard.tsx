import type { QuarterScoreType } from '@hcc/manager-api';

import Link from 'next/link';

import type { Game } from '~/types';

import { SmsIcon } from '~/components/icons';
import { Badge, LiveBadge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { routes } from '~/constants/routes';
import { roundLabelOf, SportIcon } from '~/constants/sports';

import { QuarterScores } from './quarter-scores';

type Props = {
  game: Game;
  homeScore: number;
  awayScore: number;
  quarterLabel: string;
  quarterScores: QuarterScoreType[];
};

const Side = ({
  team,
  label,
  reversed,
}: {
  team: Game['gameTeams'][number];
  label: string;
  reversed?: boolean;
}) => (
  <div className={`flex items-center gap-2.5 ${reversed ? 'flex-row-reverse' : ''}`}>
    {team.logoImageUrl ? (
      <img
        src={team.logoImageUrl}
        alt=""
        className="size-9 shrink-0 rounded-full bg-[var(--color-greyscale-25)] object-cover"
      />
    ) : (
      <span
        className="text-t8 grid size-9 shrink-0 place-items-center rounded-full font-bold text-white"
        style={{ background: team.teamColor }}
      >
        {team.gameTeamName.slice(0, 2)}
      </span>
    )}
    <div className={`min-w-0 ${reversed ? 'text-right' : ''}`}>
      <div className="text-t5 truncate font-semibold">{team.gameTeamName}</div>
      <div className="text-t8 text-[var(--color-neutral-400)]">{label}</div>
    </div>
  </div>
);

export const Scoreboard = ({ game, homeScore, awayScore, quarterLabel, quarterScores }: Props) => {
  const [home, away] = game.gameTeams;
  /** 승부차기는 본 점수와 따로 적는다 — 2:2 (5:4) 처럼 */
  const hasPk = game.isPkTaken || home.pkScore > 0 || away.pkScore > 0;

  return (
    <div className="border-b border-[var(--color-greyscale-50)]">
      <header className="flex h-(--spacing-topbar) items-center gap-1.5 border-b border-[var(--color-greyscale-50)] px-4">
        <Link
          href={routes.leagues}
          className="text-t6 text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-700)]"
        >
          대회 관리
        </Link>
        <span className="text-[var(--color-neutral-300)]">/</span>
        <Link
          href={routes.league(game.leagueId)}
          className="text-t6 max-w-40 truncate text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-700)]"
        >
          {game.leagueName}
        </Link>
        <span className="text-[var(--color-neutral-300)]">/</span>
        <h1 className="text-t4 truncate font-bold text-[var(--color-neutral-900)]">
          {game.gameName}
        </h1>
        <span className="text-t7 hidden items-center gap-1.5 border-l border-[var(--color-greyscale-50)] pl-2.5 text-[var(--color-neutral-400)] lg:flex">
          <SportIcon sportType={game.sportType} size={12} />
          {roundLabelOf(game)}
        </span>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <Link href={routes.gameCheertalks(game.leagueId, game.gameId, game.sportType)}>
            <Button size="md" color="black" variant="ghost">
              <SmsIcon size={13} />이 경기 응원톡
            </Button>
          </Link>
          <Link href={routes.game(game.leagueId, game.gameId, game.sportType)}>
            <Button size="md" color="black" variant="outline">
              경기 정보 수정
            </Button>
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 px-4 py-3">
        <Side team={home} label="홈" />

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="tnum text-score flex min-w-9 items-baseline justify-center gap-1 font-semibold tracking-tight">
              {homeScore}
              {hasPk && (
                <span className="text-t4 font-semibold text-[var(--color-neutral-400)]">
                  ({home.pkScore})
                </span>
              )}
            </span>
            <div className="flex flex-col items-center gap-1.5">
              {game.state === 'PLAYING' ? (
                <LiveBadge className="text-t5" />
              ) : (
                <Badge
                  className="text-t5"
                  variant={game.state === 'FINISHED' ? 'default' : 'primary'}
                >
                  {game.state === 'FINISHED' ? '종료' : '예정'}
                </Badge>
              )}
              {game.state === 'PLAYING' && (
                <span className="text-t7 text-[var(--color-neutral-500)]">{quarterLabel}</span>
              )}
            </div>
            <span className="tnum text-score flex min-w-9 items-baseline justify-center gap-1 font-semibold tracking-tight">
              {awayScore}
              {hasPk && (
                <span className="text-t4 font-semibold text-[var(--color-neutral-400)]">
                  ({away.pkScore})
                </span>
              )}
            </span>
          </div>
          <QuarterScores game={game} quarterScores={quarterScores} />
        </div>

        <Side team={away} label="원정" reversed />
      </div>
    </div>
  );
};
