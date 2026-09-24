import Link from 'next/link';
import { Fragment } from 'react';

import type { Bracket, BracketMatch, BracketTeam, Game, SportType } from '~/types';

import { AddIcon, TrophyIcon } from '~/components/icons';
import { routes } from '~/constants/routes';
import { roundLabel } from '~/constants/sports';
import { cn } from '~/utils/cn';
import { monthDay, timeOf } from '~/utils/date';

const formatDate = (iso: string | null) => (iso ? `${monthDay(iso)} ${timeOf(iso)}` : '');

/** 본 점수와 승부차기 점수. 경기가 없거나 아직 안 치렀으면 null */
type Tally = { score: number; pk: number | null } | null;

const TeamRow = ({
  team,
  tally,
  isWinner,
  decided,
}: {
  team: BracketTeam | null;
  tally: Tally;
  isWinner: boolean;
  decided: boolean;
}) => (
  <div
    className={cn('flex items-center gap-2.5 px-3.5 py-2.5', decided && !isWinner && 'opacity-55')}
  >
    {team?.logoImageUrl ? (
      <img
        src={team.logoImageUrl}
        alt=""
        className="size-6 shrink-0 rounded-full bg-[var(--color-greyscale-25)] object-cover"
      />
    ) : (
      <span
        className={cn(
          'size-6 shrink-0 rounded-full',
          team ? 'bg-[var(--color-greyscale-50)]' : 'bg-transparent',
        )}
      />
    )}

    <span
      className={cn(
        'text-t6 min-w-0 flex-1 truncate',
        team ? (isWinner ? 'font-bold' : 'font-medium') : 'text-[var(--color-neutral-300)]',
      )}
    >
      {team?.name ?? '미정'}
    </span>

    {tally && (
      <span className="flex shrink-0 items-baseline gap-1">
        <span className={cn('tnum text-t5', isWinner ? 'font-bold' : 'font-medium')}>
          {tally.score}
        </span>
        {tally.pk !== null && (
          <span className="tnum text-t8 font-medium text-[var(--color-neutral-400)]">
            ({tally.pk})
          </span>
        )}
      </span>
    )}
  </div>
);

const MatchCard = ({
  match,
  game,
  round,
  thirdPlace,
  leagueId,
  sportType,
}: {
  match: BracketMatch;
  game: Game | undefined;
  round: number;
  thirdPlace: boolean;
  leagueId: number;
  sportType: SportType;
}) => {
  const decided = match.winnerTeamId !== null;
  const live = match.gameState === 'PLAYING';

  // isPkTaken 은 승부차기 쿼터를 거쳤다는 표시일 뿐이다. 본 점수가 같을 때만 승부차기로 갈린 것이다
  const pkDecided = !!game && game.isPkTaken && game.gameTeams[0].score === game.gameTeams[1].score;

  // 대진표 응답에는 점수가 없어 경기 목록에서 붙인다. teamId 가 없는 경기팀은 이름으로 맞춘다
  const tallyOf = (team: BracketTeam | null): Tally => {
    if (!team || !game || game.state === 'SCHEDULED') return null;
    const matched =
      game.gameTeams.find((t) => t.teamId !== null && t.teamId === team.teamId) ??
      game.gameTeams.find((t) => t.gameTeamName === team.name);
    if (!matched) return null;
    return { score: matched.score, pk: pkDecided ? matched.pkScore : null };
  };

  // 두 팀이 정해졌는데 경기가 없는 칸. 승자는 경기 없이도 정해질 수 있어 decided 는 뺀다
  const toCreate =
    !match.gameId && !decided && match.team1 && match.team2
      ? routes.gameCreate(leagueId, {
          round,
          thirdPlace,
          teamIds: [match.team1.teamId, match.team2.teamId],
        })
      : null;

  const body = (
    <div
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-[var(--radius-card)] border bg-[var(--color-canvas)] transition-colors',
        live ? 'border-[var(--color-danger-200)]' : 'border-[var(--color-greyscale-50)]',
        (match.gameId || toCreate) && 'hover:border-[var(--color-neutral-300)]',
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-greyscale-50)] px-3.5 py-2">
        <span className="text-t7 truncate text-[var(--color-neutral-400)]">
          {formatDate(match.gameStartTime) || '일정 미정'}
        </span>

        {live ? (
          <span className="text-t7 flex shrink-0 items-center gap-1 font-bold text-[var(--color-danger-600)]">
            <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-danger-600)] motion-reduce:animate-none" />
            진행 중
          </span>
        ) : toCreate ? (
          <span className="text-t7 flex shrink-0 items-center gap-0.5 font-semibold text-[var(--color-primary-600)]">
            <AddIcon className="size-3.5" />
            경기 생성
          </span>
        ) : (
          pkDecided && (
            <span className="text-t7 shrink-0 text-[var(--color-neutral-400)]">승부차기</span>
          )
        )}
      </div>

      <TeamRow
        team={match.team1}
        tally={tallyOf(match.team1)}
        isWinner={decided && match.winnerTeamId === match.team1?.teamId}
        decided={decided}
      />
      <div className="mx-3.5 h-px bg-[var(--color-hairline)]" />
      <TeamRow
        team={match.team2}
        tally={tallyOf(match.team2)}
        isWinner={decided && match.winnerTeamId === match.team2?.teamId}
        decided={decided}
      />
    </div>
  );

  const href = match.gameId ? routes.gameTimeline(leagueId, match.gameId, sportType) : toCreate;

  if (!href) return <div className="w-full">{body}</div>;

  return (
    <Link href={href} className="w-full">
      {body}
    </Link>
  );
};

/**
 * 라운드 사이 ⊐ 모양 선. 두 열이 칸을 똑같이 나눠 가져서 앞 라운드 두 칸의 중심이 25%·75% 에 온다.
 * 경기 수가 정확히 두 배가 아니면(부전승 등) 이 계산이 깨져서 그리지 않는다.
 */
const Connectors = ({ count }: { count: number }) => (
  <div className="flex w-12 shrink-0 flex-col gap-4">
    <div aria-hidden className="text-t6 font-bold opacity-0 select-none">
      ·
    </div>
    <div className="flex flex-1 flex-col">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="relative flex-1">
          <span className="absolute top-1/4 left-0 h-px w-1/2 bg-[var(--color-greyscale-50)]" />
          <span className="absolute bottom-1/4 left-0 h-px w-1/2 bg-[var(--color-greyscale-50)]" />
          <span className="absolute top-1/4 left-1/2 h-1/2 w-px bg-[var(--color-greyscale-50)]" />
          <span className="absolute top-1/2 left-1/2 h-px w-1/2 bg-[var(--color-greyscale-50)]" />
        </div>
      ))}
    </div>
  </div>
);

// 열끼리 폭을 나눠 갖는다. 연결선을 열 안에 넣으면 그 열만 좁아져서 열 사이 형제로 둔다
const RoundColumn = ({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex min-w-[168px] flex-1 flex-col gap-4">
    <div className="text-t6 text-center font-bold text-[var(--color-neutral-500)]">{label}</div>
    <div className="flex flex-1 flex-col">{children}</div>
  </div>
);

export const BracketView = ({
  bracket,
  games,
  leagueId,
  sportType,
}: {
  bracket: Bracket;
  games: Game[];
  leagueId: number;
  sportType: SportType;
}) => {
  const rounds = [...bracket.rounds]
    .sort((a, b) => b.round - a.round)
    .map((round) => ({
      ...round,
      matches: [...round.matches].sort((a, b) => a.matchNumber - b.matchNumber),
    }));

  const gameById = new Map(games.map((g) => [g.gameId, g]));
  const gameOf = (match: BracketMatch) => (match.gameId ? gameById.get(match.gameId) : undefined);

  const final = rounds.at(-1);
  const finalMatch = final?.matches.length === 1 ? final.matches[0] : undefined;
  const champion =
    finalMatch?.winnerTeamId != null
      ? ([finalMatch.team1, finalMatch.team2].find((t) => t?.teamId === finalMatch.winnerTeamId) ??
        null)
      : null;

  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex items-stretch">
        {rounds.map((round, index) => {
          const next = rounds[index + 1];
          return (
            <Fragment key={round.round}>
              <RoundColumn label={roundLabel(round.round)}>
                {round.matches.map((match) => (
                  <div key={match.id} className="flex flex-1 items-center py-2">
                    <MatchCard
                      match={match}
                      game={gameOf(match)}
                      round={round.round}
                      thirdPlace={false}
                      leagueId={leagueId}
                      sportType={sportType}
                    />
                  </div>
                ))}
              </RoundColumn>

              {next &&
                (round.matches.length === next.matches.length * 2 ? (
                  <Connectors count={next.matches.length} />
                ) : (
                  <div className="w-12 shrink-0" />
                ))}
            </Fragment>
          );
        })}

        {champion && (
          <>
            <Connectors count={1} />
            <RoundColumn label={<span className="text-[var(--color-primary-700)]">우승</span>}>
              <div className="flex flex-1 items-center py-2">
                <div className="flex w-44 flex-col items-center gap-2.5 rounded-[var(--radius-card)] border border-[var(--color-primary-200)] bg-[var(--color-primary-50)] px-4 py-5">
                  <TrophyIcon className="size-6 text-[var(--color-primary-600)]" />
                  {champion.logoImageUrl ? (
                    <img
                      src={champion.logoImageUrl}
                      alt=""
                      className="size-10 rounded-full bg-[var(--color-canvas)] object-cover"
                    />
                  ) : null}
                  <span className="text-t5 w-full truncate text-center font-bold">
                    {champion.name}
                  </span>
                </div>
              </div>
            </RoundColumn>
          </>
        )}

        {bracket.thirdPlaceMatch && (
          <>
            <div
              aria-hidden
              className="mx-6 w-px shrink-0 border-l border-dashed border-[var(--color-greyscale-50)]"
            />
            <RoundColumn
              label={
                <>
                  3·4위전
                  <span className="text-t8 ml-1.5 font-medium text-[var(--color-neutral-400)]">
                    준결승 패자
                  </span>
                </>
              }
            >
              <div className="flex flex-1 items-center py-2">
                <MatchCard
                  match={bracket.thirdPlaceMatch}
                  game={gameOf(bracket.thirdPlaceMatch)}
                  round={2}
                  thirdPlace
                  leagueId={leagueId}
                  sportType={sportType}
                />
              </div>
            </RoundColumn>
          </>
        )}
      </div>
    </div>
  );
};
