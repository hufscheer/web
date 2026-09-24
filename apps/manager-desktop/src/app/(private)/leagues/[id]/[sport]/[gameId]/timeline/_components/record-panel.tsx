'use client';

import type { ProgressAvailableAction } from '@hcc/manager-api';

import {
  useCreateTimelineFoul,
  useCreateTimelinePK,
  useCreateTimelineScore,
  useCreateTimelinesProgress,
  useCreateTimelinesReplace,
  useCreateTimelinesWarning,
} from '@hcc/manager-api';
import { useMemo, useState, useTransition } from 'react';

import type { Game, Lineup, LineupPlayer, TimelineRecord } from '~/types';

import { AddCircleIcon, ErrorIcon, FoulIcon, SettingsIcon, TradeIcon } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { cn } from '~/utils/cn';
import { parseHTTPError } from '~/utils/http-error';

type NewRecord = Omit<TimelineRecord, 'recordId' | 'recordedQuarter'>;

type Props = {
  game: Game;
  lineups: [Lineup, Lineup];
  quarterLabel: string;
  onAddRecord: (record: NewRecord) => void;
  onSubstitute: (teamIndex: 0 | 1, outId: number, inId: number) => void;
  onFoul: (teamIndex: 0 | 1, lineupPlayerId: number) => void;
  /** 지금 기록할 수 있는 진행 동작. 쿼터 목록을 화면에 박아 두면 상태 머신을 건너뛴 전환이 눌려 400 이 난다 */
  progressActions: ProgressAvailableAction[];
  onToast: (message: string) => void;
  onError: (message: string) => void;
  onSaved: (saved: boolean) => void;
};

type Tab = 'score' | 'sub' | 'sanction' | 'pk' | 'progress';

const label = (player: LineupPlayer) => `${player.jerseyNumber} ${player.playerName}`;

/** "경고를" / "퇴장을" — 받침 유무로 목적격 조사를 고른다 */
const withObjectParticle = (word: string) => {
  const code = word.charCodeAt(word.length - 1);
  const hasFinalConsonant = code >= 0xac00 && code <= 0xd7a3 && (code - 0xac00) % 28 !== 0;
  return `${word}${hasFinalConsonant ? '을' : '를'}`;
};

const Field = ({
  children,
  htmlFor,
  text,
}: {
  children: React.ReactNode;
  htmlFor: string;
  text: string;
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={htmlFor} className="text-t7 font-semibold text-[var(--color-neutral-600)]">
      {text}
    </label>
    {children}
  </div>
);

const selectClass =
  'h-9 w-full rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] px-2 text-t6 shadow-[0_1px_1px_rgba(23,24,28,0.03)] transition-colors hover:border-[var(--color-neutral-300)]';

export const RecordPanel = ({
  game,
  lineups,
  quarterLabel,
  onAddRecord,
  onSubstitute,
  onFoul,
  progressActions,
  onToast,
  onError,
  onSaved,
}: Props) => {
  const [saving, startSaving] = useTransition();
  const byGame = { gameId: game.gameId };
  const { mutateAsync: createScore } = useCreateTimelineScore(byGame);
  const { mutateAsync: createReplacement } = useCreateTimelinesReplace(byGame);
  const { mutateAsync: createFoul } = useCreateTimelineFoul(byGame);
  const { mutateAsync: createWarning } = useCreateTimelinesWarning(byGame);
  const { mutateAsync: createPk } = useCreateTimelinePK(byGame);
  const { mutateAsync: createProgress } = useCreateTimelinesProgress(byGame);

  const base = {
    gameId: game.gameId,
    sportType: game.sportType,
    recordedQuarter: quarterLabel,
    recordedAt: 0,
  };

  /**
   * 누르자마자 화면에 먼저 반영한다. 점수판이 그대로면 매니저가 다시 눌러 기록이 겹친다.
   * 저장이 끝나면 성공이든 실패든 onSaved 로 덧씌운 값을 걷고 서버 값을 그린다.
   */
  const save = (run: () => Promise<unknown>, optimistic: () => void, done: string) => {
    optimistic();
    startSaving(async () => {
      try {
        await run();
        onToast(done);
        onSaved(true);
      } catch (error) {
        onError(await parseHTTPError(error, '기록을 저장하지 못했어요.'));
        onSaved(false);
      }
    });
  };
  const isBasketball = game.sportType === 'BASKETBALL';
  // 서버가 막지 않는다. 시작 전에 득점이 들어가면 관객 화면은 "예정"인 채로 점수만 붙는다
  const notStarted = game.gameQuarter.key === 'PRE_GAME';
  const [tab, setTab] = useState<Tab>(notStarted ? 'progress' : 'score');
  const [teamIndex, setTeamIndex] = useState<0 | 1>(0);
  const [minuteInput, setMinuteInput] = useState('0');
  const [scoreValue, setScoreValue] = useState(isBasketball ? 2 : 1);
  const [scorerId, setScorerId] = useState('');
  const [assistId, setAssistId] = useState('');
  const [outId, setOutId] = useState('');
  const [inId, setInId] = useState('');
  const [isFoulOut, setIsFoulOut] = useState(false);
  const [sanctionId, setSanctionId] = useState('');
  const [cardType, setCardType] = useState<'경고' | '퇴장'>('경고');
  const [kickerId, setKickerId] = useState('');
  const [pkSuccess, setPkSuccess] = useState(true);

  const team = lineups[teamIndex];
  const playing = useMemo(
    () => [...team.starterPlayers, ...team.candidatePlayers].filter((p) => p.isPlaying),
    [team],
  );
  const bench = useMemo(
    () => [...team.starterPlayers, ...team.candidatePlayers].filter((p) => !p.isPlaying),
    [team],
  );

  const find = (id: string) =>
    [...team.starterPlayers, ...team.candidatePlayers].find((p) => String(p.lineupPlayerId) === id);

  const tabs: { key: Tab; label: string; accent: string; Icon: typeof AddCircleIcon }[] = [
    { key: 'score', label: '득점', accent: 'var(--color-rec-score)', Icon: AddCircleIcon },
    { key: 'sub', label: '교체', accent: 'var(--color-rec-swap)', Icon: TradeIcon },
    {
      key: 'sanction',
      label: isBasketball ? '파울' : '경고',
      accent: isBasketball ? 'var(--color-rec-foul)' : 'var(--color-rec-warning)',
      Icon: isBasketball ? FoulIcon : ErrorIcon,
    },
    ...(isBasketball
      ? []
      : [
          {
            key: 'pk' as Tab,
            label: '승부차기',
            accent: 'var(--color-rec-score)',
            Icon: AddCircleIcon,
          },
        ]),
    { key: 'progress', label: '진행', accent: 'var(--color-neutral-700)', Icon: SettingsIcon },
  ];

  const submitScore = () => {
    const scorer = find(scorerId) ?? playing[0];
    if (!scorer) return onError('출전 중인 선수가 없어요');
    const assist = find(assistId);
    const minute = Number(minuteInput) || 0;

    save(
      () =>
        createScore({
          ...base,
          recordedAt: minute,
          gameTeamId: team.gameTeamId,
          scoreLineupPlayerId: scorer.lineupPlayerId,
          assistLineupPlayerId: assist?.lineupPlayerId ?? null,
          ...(isBasketball ? { score: scoreValue } : { isOwnGoal: false }),
        }),
      () =>
        onAddRecord({
          type: 'SCORE',
          recordedAt: minute,
          gameTeamId: team.gameTeamId,
          title: isBasketball
            ? `${scorer.playerName} ${scoreValue}점`
            : `${scorer.playerName} 득점`,
          subtitle: isBasketball
            ? team.teamName
            : `어시스트 ${assist ? assist.playerName : '없음'}`,
          snapshot: null,
          scoreValue,
          deletable: true,
          undeletableReason: null,
          undeletableReasonCode: null,
        }),
      '득점을 기록했어요',
    );
  };

  const submitSub = () => {
    const out = find(outId) ?? playing[0];
    const incoming = find(inId) ?? bench[0];
    if (!out || !incoming) return onError('교체할 선수를 선택해 주세요');
    const minute = Number(minuteInput) || 0;

    save(
      () =>
        createReplacement({
          ...base,
          recordedAt: minute,
          gameTeamId: team.gameTeamId,
          originLineupPlayerId: out.lineupPlayerId,
          replacementLineupPlayerId: incoming.lineupPlayerId,
          isFoulOut,
        }),
      () => {
        onSubstitute(teamIndex, out.lineupPlayerId, incoming.lineupPlayerId);
        onAddRecord({
          type: isBasketball ? 'BASKETBALL_REPLACEMENT' : 'SOCCER_REPLACEMENT',
          recordedAt: minute,
          gameTeamId: team.gameTeamId,
          title: `${incoming.playerName} 교체 투입`,
          subtitle: isBasketball && isFoulOut ? '5반칙 퇴장' : team.teamName,
          snapshot: null,
          deletable: true,
          undeletableReason: null,
          undeletableReasonCode: null,
        });
      },
      '교체를 기록했어요',
    );
  };

  /** 실패한 시도도 남겨야 몇 번째 키커까지 찼는지 알 수 있다. 서버는 성공만 pkScore 에 더한다 */
  const submitPk = () => {
    const kicker = find(kickerId) ?? playing[0];
    if (!kicker) return onError('출전 중인 선수가 없어요');

    save(
      () =>
        createPk({
          ...base,
          recordedAt: 0,
          gameTeamId: team.gameTeamId,
          scorerId: kicker.lineupPlayerId,
          isSuccess: pkSuccess,
        }),
      () =>
        onAddRecord({
          type: 'PK',
          recordedAt: 0,
          gameTeamId: team.gameTeamId,
          title: `${kicker.playerName} 승부차기 ${pkSuccess ? '성공' : '실패'}`,
          subtitle: team.teamName,
          snapshot: null,
          deletable: true,
          undeletableReason: null,
          undeletableReasonCode: null,
        }),
      `승부차기 ${withObjectParticle(pkSuccess ? '성공' : '실패')} 기록했어요`,
    );
  };

  const submitSanction = () => {
    const target = find(sanctionId) ?? playing[0];
    if (!target) return onError('선수를 선택해 주세요');
    const minute = Number(minuteInput) || 0;

    if (isBasketball) {
      save(
        () =>
          createFoul({
            ...base,
            recordedAt: minute,
            gameTeamId: team.gameTeamId,
            offenderLineupPlayerId: target.lineupPlayerId,
          }),
        () => {
          onFoul(teamIndex, target.lineupPlayerId);
          onAddRecord({
            type: 'FOUL',
            recordedAt: minute,
            gameTeamId: team.gameTeamId,
            title: `${target.playerName} 파울`,
            subtitle: `누적 ${(target.foulCount ?? 0) + 1}`,
            snapshot: null,
            deletable: true,
            undeletableReason: null,
            undeletableReasonCode: null,
          });
        },
        '파울을 기록했어요',
      );
      return;
    }

    save(
      () =>
        createWarning({
          ...base,
          recordedAt: minute,
          gameTeamId: team.gameTeamId,
          warnedLineupPlayerId: target.lineupPlayerId,
          cardType: cardType === '경고' ? 'YELLOW' : 'RED',
        }),
      () =>
        onAddRecord({
          type: 'WARNING_CARD',
          recordedAt: minute,
          gameTeamId: team.gameTeamId,
          title: `${target.playerName} ${cardType}`,
          subtitle: team.teamName,
          snapshot: null,
          deletable: true,
          undeletableReason: null,
          undeletableReasonCode: null,
        }),
      `${withObjectParticle(cardType)} 기록했어요`,
    );
  };

  // 득점·교체·경고가 같은 시각 값을 쓴다. 입력칸이 득점 탭에만 있으면 다른 기록은 그 값을 말없이 가져간다
  const minuteField = (
    <Field htmlFor="min" text="기록 시간(분)">
      <input
        id="min"
        type="number"
        min={0}
        className={selectClass}
        value={minuteInput}
        onChange={(e) => setMinuteInput(e.target.value)}
      />
    </Field>
  );

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)]">
      <header className="flex h-11 shrink-0 items-center justify-between border-b border-[var(--color-greyscale-50)] px-4">
        <h2 className="text-t6 font-semibold text-[var(--color-neutral-900)]">기록 입력</h2>
        <span className="text-t7 text-[var(--color-neutral-400)]">{quarterLabel}</span>
      </header>

      <div className="flex flex-col gap-4 overflow-y-auto p-5">
        <div
          className={cn(
            'grid divide-x divide-[var(--color-greyscale-50)] overflow-hidden rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)]',
            isBasketball ? 'grid-cols-4' : 'grid-cols-5',
          )}
        >
          {tabs.map(({ key, label: text, accent }) => {
            const locked = notStarted && key !== 'progress';
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                disabled={locked}
                title={locked ? '경기를 시작한 뒤에 기록할 수 있어요' : undefined}
                aria-pressed={tab === key}
                style={tab === key ? { backgroundColor: accent } : undefined}
                className={cn(
                  'flex h-9 items-center justify-center px-1 text-[12px] font-semibold whitespace-nowrap transition-colors',
                  tab === key && 'text-white',
                  tab !== key &&
                    !locked &&
                    'text-[var(--color-neutral-600)] hover:bg-[var(--color-greyscale-25)] hover:text-[var(--color-neutral-900)]',
                  locked && 'cursor-not-allowed text-[var(--color-neutral-300)]',
                )}
              >
                {text}
              </button>
            );
          })}
        </div>

        {notStarted && (
          <p className="text-t7 leading-snug text-[var(--color-neutral-400)]">
            경기를 시작해야 기록할 수 있어요.
          </p>
        )}

        {tab !== 'progress' && (
          <Field htmlFor="team" text="팀">
            <div className="flex gap-1.5">
              {lineups.map((l, i) => (
                <button
                  key={l.gameTeamId}
                  type="button"
                  onClick={() => setTeamIndex(i as 0 | 1)}
                  aria-pressed={teamIndex === i}
                  className={cn(
                    'text-t7 h-9 flex-1 rounded-[var(--radius-control)] border font-medium transition-colors',
                    teamIndex === i
                      ? 'border-[var(--color-neutral-900)] bg-[var(--color-neutral-900)] text-white'
                      : 'border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] text-[var(--color-neutral-600)] hover:bg-[var(--color-greyscale-25)]',
                  )}
                >
                  {l.teamName}
                </button>
              ))}
            </div>
          </Field>
        )}

        {tab === 'score' && (
          <>
            {isBasketball && (
              <Field htmlFor="pts" text="득점">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setScoreValue(v)}
                      aria-pressed={scoreValue === v}
                      className={cn(
                        'text-t7 h-9 flex-1 rounded-[var(--radius-control)] border font-medium transition-colors',
                        scoreValue === v
                          ? 'border-[var(--color-neutral-900)] bg-[var(--color-neutral-900)] text-white'
                          : 'border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] text-[var(--color-neutral-600)] hover:bg-[var(--color-greyscale-25)]',
                      )}
                    >
                      {v}점
                    </button>
                  ))}
                </div>
              </Field>
            )}

            <Field htmlFor="scorer" text="득점 선수">
              <select
                id="scorer"
                className={selectClass}
                value={scorerId}
                onChange={(e) => setScorerId(e.target.value)}
              >
                {playing.map((p) => (
                  <option key={p.lineupPlayerId} value={p.lineupPlayerId}>
                    {label(p)}
                  </option>
                ))}
              </select>
            </Field>

            {!isBasketball && (
              <Field htmlFor="assist" text="어시스트">
                <select
                  id="assist"
                  className={selectClass}
                  value={assistId}
                  onChange={(e) => setAssistId(e.target.value)}
                >
                  <option value="">없음</option>
                  {playing.map((p) => (
                    <option key={p.lineupPlayerId} value={p.lineupPlayerId}>
                      {label(p)}
                    </option>
                  ))}
                </select>
              </Field>
            )}

            {minuteField}

            <Button size="md" disabled={saving} onClick={submitScore}>
              득점 기록
            </Button>
          </>
        )}

        {tab === 'sub' && (
          <>
            <Field htmlFor="out" text="나가는 선수">
              <select
                id="out"
                className={selectClass}
                value={outId}
                onChange={(e) => setOutId(e.target.value)}
              >
                {playing.map((p) => (
                  <option key={p.lineupPlayerId} value={p.lineupPlayerId}>
                    {label(p)}
                  </option>
                ))}
              </select>
            </Field>

            <Field htmlFor="in" text="들어오는 선수">
              <select
                id="in"
                className={selectClass}
                value={inId}
                onChange={(e) => setInId(e.target.value)}
              >
                {bench.map((p) => (
                  <option key={p.lineupPlayerId} value={p.lineupPlayerId}>
                    {label(p)}
                  </option>
                ))}
              </select>
            </Field>

            {isBasketball && (
              <label className="text-t7 flex items-center gap-2 text-[var(--color-neutral-600)]">
                <input
                  type="checkbox"
                  checked={isFoulOut}
                  onChange={(e) => setIsFoulOut(e.target.checked)}
                />
                5반칙 퇴장으로 교체
              </label>
            )}

            {bench.length === 0 && (
              <p className="text-t7 text-[var(--color-neutral-400)]">후보가 없어요.</p>
            )}

            {minuteField}

            <Button size="md" disabled={saving || bench.length === 0} onClick={submitSub}>
              교체 기록
            </Button>
          </>
        )}

        {tab === 'sanction' && (
          <>
            {!isBasketball && (
              <Field htmlFor="card" text="카드">
                <div className="flex gap-1.5">
                  {(['경고', '퇴장'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCardType(c)}
                      aria-pressed={cardType === c}
                      className={cn(
                        'text-t7 h-9 flex-1 rounded-[var(--radius-control)] border font-medium transition-colors',
                        cardType === c
                          ? 'border-[var(--color-danger-600)] bg-[var(--color-danger-600)] text-white'
                          : 'border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] text-[var(--color-neutral-600)] hover:bg-[var(--color-greyscale-25)]',
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </Field>
            )}

            <Field htmlFor="target" text="선수">
              <select
                id="target"
                className={selectClass}
                value={sanctionId}
                onChange={(e) => setSanctionId(e.target.value)}
              >
                {playing.map((p) => (
                  <option key={p.lineupPlayerId} value={p.lineupPlayerId}>
                    {label(p)}
                    {isBasketball ? ` · ${p.foulCount ?? 0}반칙` : ''}
                  </option>
                ))}
              </select>
            </Field>

            {minuteField}

            <Button size="md" color="danger" disabled={saving} onClick={submitSanction}>
              {isBasketball ? '파울 기록' : `${cardType} 기록`}
            </Button>
          </>
        )}

        {tab === 'pk' && (
          <>
            <Field htmlFor="kicker" text="키커">
              <select
                id="kicker"
                className={selectClass}
                value={kickerId}
                onChange={(e) => setKickerId(e.target.value)}
              >
                {playing.map((p) => (
                  <option key={p.lineupPlayerId} value={p.lineupPlayerId}>
                    {label(p)}
                  </option>
                ))}
              </select>
            </Field>

            <Field htmlFor="pk-result" text="결과">
              <div className="flex gap-1.5">
                {[
                  { ok: true, text: '성공' },
                  { ok: false, text: '실패' },
                ].map(({ ok, text }) => (
                  <button
                    key={text}
                    type="button"
                    onClick={() => setPkSuccess(ok)}
                    aria-pressed={pkSuccess === ok}
                    className={cn(
                      'text-t7 h-9 flex-1 rounded-[var(--radius-control)] border font-medium transition-colors',
                      pkSuccess === ok
                        ? ok
                          ? 'border-[var(--color-rec-score)] bg-[var(--color-rec-score)] text-white'
                          : 'border-[var(--color-neutral-500)] bg-[var(--color-neutral-500)] text-white'
                        : 'border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] text-[var(--color-neutral-600)] hover:bg-[var(--color-greyscale-25)]',
                    )}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </Field>

            <Button size="md" disabled={saving} onClick={submitPk}>
              승부차기 기록
            </Button>
          </>
        )}

        {tab === 'progress' && (
          <div className="flex flex-col gap-1.5">
            {progressActions.length === 0 ? (
              <p className="text-t7 rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)] px-3 py-4 text-center text-[var(--color-neutral-400)]">
                지금 기록할 수 있는 진행이 없어요.
              </p>
            ) : (
              progressActions.map((action) => {
                const isEnd = action.gameProgressType === 'GAME_END';
                return (
                  <Button
                    key={`${action.quarter}-${action.gameProgressType}`}
                    size="md"
                    color={isEnd ? 'danger' : 'black'}
                    variant="outline"
                    disabled={saving}
                    onClick={() =>
                      save(
                        () =>
                          createProgress({
                            ...base,
                            recordedQuarter: action.quarter,
                            gameProgressType: action.gameProgressType,
                          }),
                        () =>
                          onAddRecord({
                            type: 'GAME_PROGRESS',
                            recordedAt: 0,
                            gameTeamId: 0,
                            title: action.displayName,
                            subtitle: '',
                            snapshot: null,
                            deletable: true,
                            undeletableReason: null,
                            undeletableReasonCode: null,
                          }),
                        `${action.displayName} 기록했어요`,
                      )
                    }
                  >
                    {action.displayName}
                  </Button>
                );
              })
            )}
          </div>
        )}
      </div>
    </section>
  );
};
