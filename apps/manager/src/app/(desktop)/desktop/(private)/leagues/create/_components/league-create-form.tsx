'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import type { SportType } from '~/desktop/types';

import { useCreateLeagues, useSuspenseManagerAllTeams } from '~/api';
import { CheckSmallIcon } from '~/desktop/components/icons';
import { Button } from '~/desktop/components/ui/button';
import { ConfirmDialog } from '~/desktop/components/ui/confirm-dialog';
import { ErrorText, Field, FormCard, SelectInput, TextInput } from '~/desktop/components/ui/field';
import { Toasts, useToasts } from '~/desktop/components/ui/toast';
import { routes } from '~/desktop/constants/routes';
import { roundLabel, SPORT_LABEL } from '~/desktop/constants/sports';
import { cn } from '~/desktop/utils/cn';
import { toTeam } from '~/desktop/utils/convert';
import { parseHTTPError } from '~/desktop/utils/http-error';

const ROUND_OPTIONS = [100, 16, 8, 4, 2];
const SPORTS: SportType[] = ['SOCCER', 'BASKETBALL'];

export const LeagueCreateForm = () => {
  const router = useRouter();
  const { toasts, push } = useToasts();
  const { data: rawTeams } = useSuspenseManagerAllTeams();
  const teams = useMemo(() => rawTeams.map(toTeam), [rawTeams]);
  const { mutate: createLeague, isPending: pending } = useCreateLeagues();

  const [name, setName] = useState('');
  const [sportType, setSportType] = useState<SportType>('SOCCER');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [maxRound, setMaxRound] = useState(100);
  const [thirdPlace, setThirdPlace] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [confirming, setConfirming] = useState(false);

  // 3·4위전은 준결승에서 진 두 팀이 겨루므로 4강 이상인 대회에만 열어 준다
  const thirdPlaceAllowed = maxRound >= 4;
  const candidates = teams.filter((team) => team.sportType === sportType);
  const needle = keyword.trim().toLowerCase();
  // 검색은 보이는 목록만 거른다. 선택(selected)은 그대로 둔다
  const visibleTeams = needle
    ? candidates.filter(
        (team) =>
          team.name.toLowerCase().includes(needle) ||
          (team.unitName ?? '').toLowerCase().includes(needle),
      )
    : candidates;
  const invalid = !name.trim() || !startAt || !endAt || startAt > endAt;

  const pickSport = (next: SportType) => {
    setSportType(next);
    // 종목이 다른 팀은 서버가 400 을 준다. 바꿀 때 선택을 비운다
    setSelected([]);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (pending || invalid) return;
    // 예선(100)은 팀 수 제한이 없다. 그 외에는 라운드 수보다 팀이 적으면 한 번 더 묻는다
    if (maxRound !== 100 && selected.length < maxRound) {
      setConfirming(true);
      return;
    }
    create();
  };

  const create = () => {
    setConfirming(false);
    setError(null);
    createLeague(
      {
        name: name.trim(),
        sportType,
        maxRound,
        startAt: `${startAt}T00:00:00`,
        // 종료일은 그날 끝까지다. 00:00 이면 마지막 날 0시에 대회가 종료로 바뀐다
        endAt: `${endAt}T23:59:59`,
        thirdPlaceMatchEnabled: thirdPlaceAllowed && thirdPlace,
        teamIds: selected,
        bracketEnabled: false,
      },
      {
        onSuccess: () => {
          push('대회가 생성되었어요');
          router.push(routes.leagues);
        },
        onError: async (e) => setError(await parseHTTPError(e, '대회를 생성하지 못했어요.')),
      },
    );
  };

  return (
    <form onSubmit={submit} className="flex max-w-[1260px] flex-col gap-5">
      <div className="flex flex-wrap items-start gap-6">
        <FormCard title="기본 정보" className="w-[560px] shrink-0">
          <Field label="종목">
            <div className="flex gap-1.5">
              {SPORTS.map((sport) => (
                <button
                  key={sport}
                  type="button"
                  aria-pressed={sportType === sport}
                  onClick={() => pickSport(sport)}
                  className={cn(
                    'text-t6 h-8 rounded-[var(--radius-control)] border px-3 font-medium transition-colors',
                    sportType === sport
                      ? 'border-[var(--color-neutral-900)] bg-[var(--color-neutral-900)] text-white'
                      : 'border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] text-[var(--color-neutral-600)] hover:bg-[var(--color-greyscale-25)]',
                  )}
                >
                  {sport === 'SOCCER' ? '⚽ 축구' : '🏀 농구'}
                </button>
              ))}
            </div>
          </Field>

          <Field label="대회 이름">
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예) 2026 고황컵"
              required
            />
          </Field>

          <Field label="기간">
            <div className="flex items-center gap-2">
              <TextInput
                type="date"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
                className="tnum min-w-0"
                required
              />
              <span className="shrink-0 text-[var(--color-neutral-400)]">~</span>
              <TextInput
                type="date"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
                className="tnum min-w-0"
                required
              />
            </div>
            {startAt && endAt && startAt > endAt && (
              <ErrorText>종료일이 시작일보다 빨라요.</ErrorText>
            )}
          </Field>

          <Field label="최대 라운드">
            <SelectInput value={maxRound} onChange={(e) => setMaxRound(Number(e.target.value))}>
              {ROUND_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {roundLabel(option)}
                </option>
              ))}
            </SelectInput>
          </Field>

          <Field
            label="3·4위전"
            hint={thirdPlaceAllowed ? undefined : '준결승이 있는 대회에서만 열 수 있어요.'}
          >
            <label className="flex w-fit cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={thirdPlaceAllowed && thirdPlace}
                disabled={!thirdPlaceAllowed}
                onChange={(e) => setThirdPlace(e.target.checked)}
                className="size-4.5"
              />
              <span className="text-t6">3·4위전 진행</span>
            </label>
          </Field>
        </FormCard>

        <FormCard title={`참가 팀 ${selected.length}팀`} className="min-w-0 flex-1">
          {candidates.length > 0 && (
            <div className="border-b border-[var(--color-hairline)] px-4 py-2.5">
              <TextInput
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="팀 검색"
                aria-label="팀 검색"
              />
            </div>
          )}
          {candidates.length === 0 ? (
            <p className="text-t6 px-6 py-12 text-center text-[var(--color-neutral-400)]">
              {SPORT_LABEL[sportType]} 팀이 없어요.
            </p>
          ) : visibleTeams.length === 0 ? (
            <p className="text-t6 px-6 py-12 text-center text-[var(--color-neutral-400)]">
              검색 결과가 없어요.
            </p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-px bg-[var(--color-hairline)]">
              {visibleTeams.map((team) => {
                const on = selected.includes(team.teamId);
                return (
                  <button
                    key={team.teamId}
                    type="button"
                    aria-pressed={on}
                    onClick={() =>
                      setSelected((prev) =>
                        on ? prev.filter((id) => id !== team.teamId) : [...prev, team.teamId],
                      )
                    }
                    className={cn(
                      'flex items-center gap-3 px-5 py-3 text-left transition-colors',
                      on
                        ? 'bg-[var(--color-primary-50)]'
                        : 'bg-[var(--color-canvas)] hover:bg-[var(--color-neutral-50)]',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded border',
                        on
                          ? 'border-[var(--color-neutral-900)] bg-[var(--color-neutral-900)] text-white'
                          : 'border-[var(--color-neutral-300)]',
                      )}
                    >
                      {on && <CheckSmallIcon size={16} />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="text-t6 block truncate font-medium">{team.name}</span>
                      <span className="text-t7 block truncate text-[var(--color-neutral-400)]">
                        {team.unitName}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </FormCard>
      </div>

      <ErrorText>{error}</ErrorText>

      <div className="flex justify-end gap-2">
        <Button size="md" color="black" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
        <Button type="submit" size="md" disabled={pending || invalid}>
          {pending ? '생성 중…' : '대회 생성'}
        </Button>
      </div>

      <ConfirmDialog
        open={confirming}
        title="아직 모든 팀이 등록되지 않았어요"
        description="정말 생성할까요?"
        confirmLabel="확인"
        confirmColor="primary"
        onConfirm={create}
        onClose={() => setConfirming(false)}
      />

      <Toasts items={toasts} />
    </form>
  );
};
