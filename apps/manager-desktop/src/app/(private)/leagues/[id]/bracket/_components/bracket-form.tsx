'use client';

import type { BracketEntryType, LeagueTeamType } from '@hcc/manager-api';

import { useUpdateBracket } from '@hcc/manager-api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { League } from '~/types';

import { Button } from '~/components/ui/button';
import { ErrorText, SelectInput } from '~/components/ui/field';
import { routes } from '~/constants/routes';
import { roundLabel, roundsUpTo } from '~/constants/sports';
import { cn } from '~/utils/cn';
import { parseHTTPError } from '~/utils/http-error';

/** 1라운드 m 번째 경기는 자리 2m-1·2m 을 가져간다. 서버 `Bracket#generate` 와 같은 규칙이다 */
const positionsOf = (matchNumber: number) => [matchNumber * 2 - 1, matchNumber * 2] as const;

type Placement = Record<number, number>;

export const BracketForm = ({
  league,
  leagueTeams,
  initialSize,
  initialPlacement,
}: {
  league: League;
  leagueTeams: LeagueTeamType[];
  initialSize: number | null;
  initialPlacement: Placement;
}) => {
  const router = useRouter();
  const { mutateAsync: saveBracket } = useUpdateBracket();

  // 예선(100)은 토너먼트 트리가 아니라 대진표를 만들 수 없다
  const sizes = roundsUpTo(league.maxRound).filter((size) => size !== 100);

  // 참가 팀이 들어가는 가장 작은 자리. sizes 는 큰 것부터라 뒤집어서 찾는다
  const fittingSize = [...sizes].reverse().find((option) => option >= leagueTeams.length);

  const [size, setSize] = useState(initialSize ?? fittingSize ?? sizes[0]);
  const [placement, setPlacement] = useState<Placement>(initialPlacement);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const placed = Object.entries(placement).filter(([position]) => Number(position) <= size);

  /** 이미 다른 자리에 있는 팀을 고르면 두 자리를 맞바꾼다 */
  const pick = (position: number, value: string) =>
    setPlacement((prev) => {
      const next = { ...prev };
      if (!value) {
        delete next[position];
        return next;
      }

      const teamId = Number(value);
      const previousSeat = Object.keys(next)
        .map(Number)
        .find((seat) => next[seat] === teamId);

      if (previousSeat !== undefined) {
        if (next[position] !== undefined) next[previousSeat] = next[position];
        else delete next[previousSeat];
      }
      next[position] = teamId;
      return next;
    });

  const autoFill = () =>
    setPlacement(
      Object.fromEntries(leagueTeams.slice(0, size).map((team, index) => [index + 1, team.teamId])),
    );

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pending || placed.length < 2) return;

    setPending(true);
    setError(null);
    try {
      const entries: BracketEntryType[] = placed.map(([position, teamId]) => ({
        position: Number(position),
        teamId,
      }));
      await saveBracket({ leagueId: league.leagueId, size, entries });
      router.push(routes.league(league.leagueId));
    } catch (e) {
      setError(await parseHTTPError(e, '대진표를 저장하지 못했어요.'));
      setPending(false);
    }
  };

  if (sizes.length === 0) {
    return (
      <p className="text-t6 rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] px-6 py-12 text-center text-[var(--color-neutral-400)]">
        예선으로 치르는 대회는 대진표를 만들 수 없어요.
      </p>
    );
  }

  if (leagueTeams.length < 2) {
    return (
      <p className="text-t6 rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] px-6 py-12 text-center text-[var(--color-neutral-400)]">
        참가 팀이 두 팀 이상이어야 대진표를 만들 수 있어요. 대회 수정에서 팀을 먼저 추가해 주세요.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex max-w-[900px] flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <label className="flex items-center gap-3">
          <span className="text-t6 text-[var(--color-neutral-500)]">첫 라운드</span>
          <SelectInput
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-32"
          >
            {sizes.map((option) => (
              <option key={option} value={option}>
                {roundLabel(option)}
              </option>
            ))}
          </SelectInput>
          <span className="text-t7 text-[var(--color-neutral-400)]">
            참가 팀 {leagueTeams.length}팀 · {size}자리
          </span>
        </label>

        <div className="flex gap-2">
          <Button size="sm" color="black" variant="outline" onClick={autoFill}>
            순서대로 채우기
          </Button>
          <Button
            size="sm"
            color="black"
            variant="ghost"
            onClick={() => setPlacement({})}
            disabled={placed.length === 0}
          >
            비우기
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {Array.from({ length: size / 2 }, (_, index) => index + 1).map((matchNumber) => (
          <div
            key={matchNumber}
            className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)]"
          >
            <div className="text-t7 border-b border-[var(--color-greyscale-50)] px-3.5 py-2 text-[var(--color-neutral-400)]">
              {roundLabel(size)} {matchNumber}경기
            </div>
            <div className="flex flex-col gap-2 p-3.5">
              {positionsOf(matchNumber).map((position) => {
                const current = placement[position];
                return (
                  <SelectInput
                    key={position}
                    value={current ?? ''}
                    onChange={(e) => pick(position, e.target.value)}
                    className={cn(!current && 'text-[var(--color-neutral-400)]')}
                  >
                    <option value="">비워 둠 (부전승)</option>
                    {leagueTeams.map((team) => (
                      <option key={team.teamId} value={team.teamId}>
                        {team.teamName}
                      </option>
                    ))}
                  </SelectInput>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="text-t7 leading-relaxed text-[var(--color-neutral-400)]">
        빈 자리는 상대 없이 다음 라운드로 올라가는 부전승이 돼요.
        {league.thirdPlaceMatchEnabled && size >= 4 && ' 3·4위전 자리는 저장할 때 함께 생겨요.'}
      </p>

      <ErrorText>{error}</ErrorText>

      <div className="flex items-center justify-end gap-2">
        <span className="text-t7 mr-auto text-[var(--color-neutral-500)]">
          <b className="tnum font-semibold">{placed.length}</b>팀 배치됨
        </span>
        <Button size="md" color="black" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
        <Button type="submit" size="md" disabled={pending || placed.length < 2}>
          {pending ? '저장 중…' : '대진표 저장'}
        </Button>
      </div>
    </form>
  );
};
