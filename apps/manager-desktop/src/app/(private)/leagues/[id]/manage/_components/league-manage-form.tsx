'use client';

import { useDeleteLeagueTeams, useUpdateLeagues, useUpdateLeagueTeams } from '@hcc/manager-api';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import type { League, Team } from '~/types';

import { CheckSmallIcon } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { ErrorText, Field, FormCard, SelectInput, TextInput } from '~/components/ui/field';
import { Toasts, useToasts } from '~/components/ui/toast';
import { routes } from '~/constants/routes';
import { parseHTTPError } from '~/utils/http-error';

const ROUND_OPTIONS = [
  { value: 100, label: '예선' },
  { value: 16, label: '16강' },
  { value: 8, label: '8강' },
  { value: 4, label: '준결승' },
  { value: 2, label: '결승' },
];

/** 서버가 LocalDateTime 을 주므로 앞 10자리가 곧 날짜다. 타임존 변환을 끼우면 하루씩 밀린다 */
const toDateInput = (value: string) => value.slice(0, 10);

/** 날짜를 안 건드렸으면 원본의 시각을 그대로 둔다 */
const toDateTime = (input: string, original: string, time: string) =>
  input === toDateInput(original) ? original : `${input}T${time}`;

type Props = {
  leagueId: number;
  league: League;
  registeredTeamIds: number[];
  candidateTeams: Team[];
};

export const LeagueManageForm = ({
  leagueId,
  league,
  registeredTeamIds,
  candidateTeams,
}: Props) => {
  const router = useRouter();
  const { toasts, push } = useToasts();
  const { mutateAsync: updateLeague } = useUpdateLeagues();
  const { mutateAsync: addLeagueTeams } = useUpdateLeagueTeams();
  const { mutateAsync: removeLeagueTeams } = useDeleteLeagueTeams();

  const [name, setName] = useState(league.name);
  const [startAt, setStartAt] = useState(toDateInput(league.startAt));
  const [endAt, setEndAt] = useState(toDateInput(league.endAt));
  const [maxRound, setMaxRound] = useState(league.maxRound);
  const [thirdPlace, setThirdPlace] = useState(league.thirdPlaceMatchEnabled);
  const [selected, setSelected] = useState<number[]>(registeredTeamIds);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const diff = useMemo(() => {
    const before = new Set(registeredTeamIds);
    const after = new Set(selected);
    return {
      added: selected.filter((id) => !before.has(id)),
      removed: registeredTeamIds.filter((id) => !after.has(id)),
    };
  }, [registeredTeamIds, selected]);

  const invalid = !name.trim() || !startAt || !endAt || startAt > endAt;
  // 3·4위전은 준결승에서 진 두 팀이 겨루므로 4강 이상인 대회에만 열어 준다
  const thirdPlaceAllowed = maxRound >= 4 && maxRound !== 100;

  const toggleTeam = (teamId: number) =>
    setSelected((prev) =>
      prev.includes(teamId) ? prev.filter((id) => id !== teamId) : [...prev, teamId],
    );

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pending || invalid) return;

    setPending(true);
    setError(null);
    try {
      await updateLeague({
        leagueId,
        name: name.trim(),
        maxRound,
        startAt: toDateTime(startAt, league.startAt, '00:00:00'),
        // 종료일은 그날 끝까지다. 00:00 이면 마지막 날 0시에 대회가 종료로 바뀐다
        endAt: toDateTime(endAt, league.endAt, '23:59:59'),
        thirdPlaceMatchEnabled: thirdPlaceAllowed && thirdPlace,
      });

      if (diff.added.length) await addLeagueTeams({ leagueId, teamIds: diff.added });
      if (diff.removed.length) await removeLeagueTeams({ leagueId, teamIds: diff.removed });

      push('대회 정보가 수정되었어요');
      router.push(routes.league(leagueId));
    } catch (e) {
      setError(await parseHTTPError(e, '대회를 수정하지 못했어요.'));
      setPending(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex max-w-[1260px] flex-col gap-5">
      <div className="flex flex-wrap items-start gap-6">
        <FormCard title="기본 정보" className="w-[560px] shrink-0">
          <Field label="대회 이름">
            <TextInput value={name} onChange={(e) => setName(e.target.value)} required />
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
            {startAt > endAt && <ErrorText>종료일이 시작일보다 빨라요.</ErrorText>}
          </Field>

          <Field label="최대 라운드" hint="대회가 어느 라운드까지 진행되는지 정해요.">
            <SelectInput value={maxRound} onChange={(e) => setMaxRound(Number(e.target.value))}>
              {ROUND_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectInput>
          </Field>

          <Field
            label="3·4위전"
            hint={
              thirdPlaceAllowed
                ? '준결승에서 진 두 팀이 겨루는 경기예요. 대진표 트리 밖에 따로 표시돼요.'
                : '준결승이 있는 대회에서만 열 수 있어요.'
            }
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

        <FormCard
          title={`참가 팀 ${selected.length}팀`}
          className="min-w-0 flex-1"
          actions={
            diff.added.length || diff.removed.length ? (
              <span className="text-t7 font-medium text-[var(--color-primary-600)]">
                +{diff.added.length} / -{diff.removed.length}
              </span>
            ) : null
          }
        >
          {candidateTeams.length === 0 ? (
            <p className="text-t6 px-6 py-12 text-center text-[var(--color-neutral-400)]">
              같은 종목의 팀이 없어요. 팀 관리에서 먼저 만들어 주세요.
            </p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-px bg-[var(--color-hairline)]">
              {candidateTeams.map((team) => {
                const on = selected.includes(team.teamId);
                return (
                  <button
                    key={team.teamId}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleTeam(team.teamId)}
                    className={[
                      'flex items-center gap-3 px-5 py-3 text-left transition-colors',
                      on
                        ? 'bg-[var(--color-primary-50)]'
                        : 'bg-[var(--color-canvas)] hover:bg-[var(--color-neutral-50)]',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'flex size-5 shrink-0 items-center justify-center rounded border',
                        on
                          ? 'border-[var(--color-neutral-900)] bg-[var(--color-neutral-900)] text-white'
                          : 'border-[var(--color-neutral-300)]',
                      ].join(' ')}
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
        <Button
          type="button"
          size="md"
          color="black"
          variant="outline"
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button type="submit" size="md" disabled={pending || invalid}>
          {pending ? '저장 중…' : '완료'}
        </Button>
      </div>

      <Toasts items={toasts} />
    </form>
  );
};
