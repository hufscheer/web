'use client';

import type { NLPlayerInput, NLPlayerStatus, ParseFailedLine } from '@hcc/manager-api';

import {
  useCheckDuplicateNL,
  useExecuteNL,
  useParseNL,
  useProcessNL,
  useRegisterNL,
} from '@hcc/manager-api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { SportType } from '~/types';

import { CloseIcon, HCCBigLogo } from '~/components/icons';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { ErrorText } from '~/components/ui/field';
import { routes } from '~/constants/routes';
import { parseHTTPError } from '~/utils/http-error';

const SAMPLE = `10 김태우 202012345
7 이승희 202154321
1 박성원 202398765`;

type CheckedPlayer = NLPlayerInput & { status: NLPlayerStatus; existingPlayerId: number | null };

const STATUS: Record<NLPlayerStatus, { label: string; variant: 'primary' | 'default' }> = {
  NEW: { label: '신규', variant: 'primary' },
  EXISTS: { label: '기존 선수', variant: 'default' },
  ALREADY_IN_TEAM: { label: '이미 소속', variant: 'default' },
};

type Team = {
  name: string;
  logoImageUrl: string;
  unit: string;
  teamColor: string;
  sportType: SportType;
};

type Step = 'input' | 'review';

/** 새 팀은 /nl/parse + /nl/register-team, 이미 있는 팀은 /nl/process + /nl/execute 를 쓴다 */
export type AssistantTarget =
  | { kind: 'new-team'; team: Team }
  | {
      kind: 'existing-team';
      leagueId: number;
      teamId: number;
      teamName: string;
      sportType: SportType;
    };

export const RosterAssistant = ({
  target,
  onClose,
  onDone,
}: {
  target: AssistantTarget;
  onClose: () => void;
  onDone?: (message: string) => void;
}) => {
  const router = useRouter();
  const [step, setStep] = useState<Step>('input');
  const [text, setText] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [players, setPlayers] = useState<CheckedPlayer[]>([]);
  const [failed, setFailed] = useState<ParseFailedLine[]>([]);
  const [excluded, setExcluded] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const { mutateAsync: parseRoster } = useParseNL();
  const { mutateAsync: checkDuplicates } = useCheckDuplicateNL();
  const { mutateAsync: processRoster } = useProcessNL();
  const { mutateAsync: executeRoster } = useExecuteNL();
  const { mutateAsync: registerTeam } = useRegisterNL();

  const selected = players.filter((p) => !excluded.includes(p.studentNumber));
  const targetName = target.kind === 'existing-team' ? target.teamName : target.team.name;

  const run = async (job: () => Promise<void>) => {
    setPending(true);
    setError(null);
    try {
      await job();
    } catch (e) {
      setError(await parseHTTPError(e, '요청을 처리하지 못했어요.'));
    } finally {
      setPending(false);
    }
  };

  /** 이미 소속된 선수는 기본으로 빼 둔다 */
  const applyPreview = (checked: CheckedPlayer[]) => {
    setPlayers(checked);
    setExcluded(checked.filter((p) => p.status === 'ALREADY_IN_TEAM').map((p) => p.studentNumber));
    setStep('review');
  };

  const analyze = () =>
    run(async () => {
      if (target.kind === 'existing-team') {
        // /nl/process 는 팀을 알기 때문에 status 까지 채워 준다
        const processed = await processRoster({
          leagueId: target.leagueId,
          teamId: target.teamId,
          message: text,
          history: [],
        });
        setMessage(processed.displayMessage);

        if (!processed.preview) return;
        setFailed(processed.preview.parseFailedLines ?? []);

        const found = processed.preview.players ?? [];
        if (found.length === 0) return;

        applyPreview(found);
        return;
      }

      const parsed = await parseRoster({ message: text, history: [] });
      setMessage(parsed.displayMessage);

      if (!parsed.preview) return;
      setFailed(parsed.preview.parseFailedLines ?? []);

      const found = parsed.preview.players ?? [];
      if (found.length === 0) return;

      const checked = await checkDuplicates({ players: found });
      applyPreview(checked.players);
    });

  const register = () =>
    run(async () => {
      const payload: NLPlayerInput[] = selected.map((p) => ({
        name: p.name,
        studentNumber: p.studentNumber,
        jerseyNumber: p.jerseyNumber,
      }));

      if (target.kind === 'existing-team') {
        const result = await executeRoster({
          leagueId: target.leagueId,
          teamId: target.teamId,
          players: payload,
        });
        onDone?.(result.displayMessage);
        onClose();
        return;
      }

      const result = await registerTeam({ team: target.team, players: payload });
      router.push(routes.team(target.team.sportType, result.teamId));
    });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const toggle = (studentNumber: string) =>
    setExcluded((prev) =>
      prev.includes(studentNumber)
        ? prev.filter((s) => s !== studentNumber)
        : [...prev, studentNumber],
    );

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex justify-end bg-black/40"
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="훕치치 어시스턴트"
        className="flex h-full w-[560px] flex-col bg-[var(--color-canvas)]"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--color-greyscale-50)] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <HCCBigLogo className="h-5 w-auto" />
            <span className="text-t5 font-bold">어시스턴트</span>
          </div>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-700)]"
          >
            <CloseIcon size={22} />
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
          <p className="text-t6 text-[var(--color-neutral-600)]">
            {targetName} 명단을 붙여 넣으면 이름·학번·등번호로 끊어 드려요. 확인 후 한 번에
            등록해요.
          </p>

          {step === 'input' ? (
            <>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={SAMPLE}
                rows={12}
                className="text-t6 w-full resize-none rounded-[var(--radius-control)] border border-[var(--color-neutral-300)] p-3.5 leading-relaxed placeholder:text-[var(--color-neutral-300)]"
              />
              {message && <p className="text-t6 text-[var(--color-neutral-600)]">{message}</p>}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-t6 font-bold">
                  선수 {selected.length}명
                  {selected.length !== players.length && (
                    <span className="ml-1.5 font-normal text-[var(--color-neutral-400)]">
                      / 인식 {players.length}명
                    </span>
                  )}
                </h3>
                <Button size="xs" color="black" variant="ghost" onClick={() => setStep('input')}>
                  다시 입력
                </Button>
              </div>

              <div className="overflow-hidden rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)]">
                {players.map((player) => {
                  const on = !excluded.includes(player.studentNumber);
                  return (
                    <label
                      key={player.studentNumber}
                      className="flex cursor-pointer items-center gap-3 border-b border-[var(--color-hairline)] px-4 py-2.5 last:border-b-0"
                    >
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggle(player.studentNumber)}
                        className="size-4.5"
                      />
                      <span className="tnum text-t6 w-10 shrink-0 text-[var(--color-neutral-500)]">
                        {player.jerseyNumber ?? '-'}
                      </span>
                      <span className="text-t6 min-w-0 flex-1 truncate font-medium">
                        {player.name}
                      </span>
                      <span className="tnum text-t7 text-[var(--color-neutral-400)]">
                        {player.studentNumber}
                      </span>
                      <Badge variant={STATUS[player.status].variant}>
                        {STATUS[player.status].label}
                      </Badge>
                    </label>
                  );
                })}
              </div>

              {failed.length > 0 && (
                <div className="rounded-[var(--radius-control)] border border-[var(--color-danger-200)] bg-[var(--color-danger-50)] px-4 py-3">
                  <p className="text-t7 font-bold text-[var(--color-danger-700)]">
                    못 읽은 줄 {failed.length}개
                  </p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {failed.map((line) => (
                      <li key={line.index} className="text-t7 text-[var(--color-danger-700)]">
                        {line.name ?? line.studentNumber ?? `${line.index + 1}번째 줄`} —{' '}
                        {line.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          <ErrorText>{error}</ErrorText>
        </div>

        <footer className="flex shrink-0 gap-2 border-t border-[var(--color-greyscale-50)] px-6 py-4">
          <Button className="flex-1" size="md" color="black" variant="outline" onClick={onClose}>
            취소
          </Button>
          {step === 'input' ? (
            <Button
              className="flex-1"
              size="md"
              disabled={pending || !text.trim()}
              onClick={analyze}
            >
              {pending ? '읽는 중…' : '명단 읽기'}
            </Button>
          ) : (
            <Button
              className="flex-1"
              size="md"
              disabled={pending || selected.length === 0}
              onClick={register}
            >
              {pending ? '등록 중…' : `${selected.length}명 등록`}
            </Button>
          )}
        </footer>
      </aside>
    </div>
  );
};
