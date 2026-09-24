'use client';

import type { CheckDuplicateNLResponse } from '@hcc/manager-api';

import { useQueryClient } from '@hcc/api-base';
import { postPlayers, queryKeys, useCheckDuplicateNL, useParseNL } from '@hcc/manager-api';
import { useEffect, useState } from 'react';

import { HCCBigLogo } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Toasts, useToasts } from '~/components/ui/toast';
import { cn } from '~/utils/cn';
import { parseHTTPError } from '~/utils/http-error';

type Props = { onClose: () => void };

type CheckedPlayer = CheckDuplicateNLResponse['players'][number];

/**
 * 선수만 일괄로 넣는 엔드포인트가 없다. 파싱(/nl/parse)과 중복 대조(/nl/check-duplicates)만 쓰고
 * 저장은 POST /players 를 한 명씩 부른다.
 */
export const PlayerRosterAssistant = ({ onClose }: Props) => {
  const qc = useQueryClient();
  const { toasts, push, pushError } = useToasts();
  const { mutateAsync: parseRoster } = useParseNL();
  const { mutateAsync: checkDuplicates } = useCheckDuplicateNL();

  const [text, setText] = useState('');
  const [checked, setChecked] = useState<CheckedPlayer[] | null>(null);
  const [failed, setFailed] = useState<{ index: number; reason: string }[]>([]);
  const [excluded, setExcluded] = useState<string[]>([]);
  const [parsing, setParsing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !saving) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, saving]);

  const analyze = async () => {
    if (!text.trim() || parsing) return;
    setParsing(true);
    try {
      const parsed = await parseRoster({ message: text, history: [] });
      const players = parsed.preview?.players ?? [];
      setFailed(
        (parsed.preview?.parseFailedLines ?? []).map((l) => ({ index: l.index, reason: l.reason })),
      );

      if (players.length === 0) {
        setChecked([]);
        push('명단에서 선수를 찾지 못했어요');
        return;
      }

      const result = await checkDuplicates({ players });
      setChecked(result.players);
      // 이미 있는 선수는 처음부터 빼 둔다. 넣어도 서버가 학번 중복으로 막는다
      setExcluded(result.players.filter((p) => p.status !== 'NEW').map((p) => p.studentNumber));
    } catch (e) {
      pushError(await parseHTTPError(e, '명단을 읽지 못했어요'));
    } finally {
      setParsing(false);
    }
  };

  const targets = (checked ?? []).filter((p) => !excluded.includes(p.studentNumber));

  const save = async () => {
    if (targets.length === 0 || saving) return;
    setSaving(true);
    setProgress({ done: 0, total: targets.length });

    const failures: string[] = [];
    for (const [i, player] of targets.entries()) {
      try {
        await postPlayers({ name: player.name, studentNumber: player.studentNumber });
      } catch (e) {
        failures.push(
          `${player.name}(${player.studentNumber}) — ${await parseHTTPError(e, '실패')}`,
        );
      }
      setProgress({ done: i + 1, total: targets.length });
    }

    setSaving(false);
    setProgress(null);
    // 한 명씩 다시 불러오지 않고 끝나고 한 번만 갱신한다
    void qc.invalidateQueries({ queryKey: queryKeys.players._def });

    if (failures.length === 0) {
      push(`${targets.length}명 등록했어요`);
      onClose();
      return;
    }
    // 성공한 선수는 이미 저장됐다. 실패한 선수만 남긴다
    pushError(`${targets.length - failures.length}명 등록, ${failures.length}명 실패`);
    setChecked((prev) =>
      (prev ?? []).filter((p) => failures.some((f) => f.includes(p.studentNumber))),
    );
    setExcluded([]);
  };

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
      onClick={() => !saving && onClose()}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="명단으로 선수 등록"
        className="flex h-full w-[560px] flex-col bg-[var(--color-canvas)]"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--color-greyscale-50)] px-6 py-4">
          <span className="flex items-center gap-2.5">
            <HCCBigLogo className="h-5 w-auto" />
            <span className="text-t5 font-bold">명단으로 선수 등록</span>
          </span>
          <Button size="sm" color="black" variant="outline" onClick={onClose} disabled={saving}>
            닫기
          </Button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="roster" className="text-t6 font-semibold">
              명단 붙여넣기
            </label>
            <textarea
              id="roster"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={7}
              placeholder={'김태우 202012345\n이하늘 202154321\n…'}
              className="text-t6 w-full rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] p-3 leading-relaxed"
            />
            <p className="text-t7 text-[var(--color-neutral-400)]">
              한 줄에 한 명씩. 이름과 학번 순서는 상관없어요.
            </p>
          </div>

          <Button size="md" onClick={analyze} disabled={parsing || saving || !text.trim()}>
            {parsing ? '읽는 중…' : '명단 분석'}
          </Button>

          {failed.length > 0 && (
            <div className="text-t7 rounded-[var(--radius-control)] border border-[var(--color-danger-200)] bg-[var(--color-danger-50)] px-4 py-3 leading-relaxed">
              <b className="font-semibold">읽지 못한 줄 {failed.length}개</b>
              {failed.slice(0, 5).map((f) => (
                <p key={f.index}>
                  {f.index + 1}번째 줄 — {f.reason}
                </p>
              ))}
            </div>
          )}

          {checked && checked.length > 0 && (
            <div className="rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)]">
              <p className="text-t7 border-b border-[var(--color-greyscale-50)] px-4 py-2.5 font-semibold text-[var(--color-neutral-500)]">
                {checked.length}명 중 <b className="tnum">{targets.length}</b>명 등록 예정 · 이미
                있는 선수는 빼 뒀어요
              </p>
              {checked.map((p) => {
                const on = !excluded.includes(p.studentNumber);
                return (
                  <label
                    key={p.studentNumber}
                    className="flex cursor-pointer items-center gap-3 border-b border-[var(--color-hairline)] px-4 py-2.5 last:border-b-0"
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggle(p.studentNumber)}
                      disabled={saving}
                    />
                    <span
                      className={cn(
                        'text-t6 font-medium',
                        !on && 'text-[var(--color-neutral-300)]',
                      )}
                    >
                      {p.name}
                    </span>
                    <span className="tnum text-t7 text-[var(--color-neutral-400)]">
                      {p.studentNumber}
                    </span>
                    {p.status !== 'NEW' && (
                      <span className="text-t7 ml-auto text-[var(--color-neutral-400)]">
                        이미 등록됨
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          )}

          {checked && checked.length === 0 && (
            <p className="text-t6 text-[var(--color-neutral-400)]">읽어 낸 선수가 없어요.</p>
          )}
        </div>

        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-[var(--color-greyscale-50)] px-6 py-4">
          <span className="text-t7 text-[var(--color-neutral-500)]">
            {progress
              ? `${progress.done} / ${progress.total} 등록 중…`
              : `${targets.length}명 선택됨`}
          </span>
          <Button size="md" onClick={save} disabled={saving || targets.length === 0}>
            {saving ? '등록 중…' : `${targets.length}명 등록`}
          </Button>
        </footer>

        <Toasts items={toasts} />
      </aside>
    </div>
  );
};
