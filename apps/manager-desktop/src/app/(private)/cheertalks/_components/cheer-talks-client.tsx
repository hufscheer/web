'use client';

import type { CheerTalkType } from '@hcc/manager-api';
import type { ReactNode } from 'react';

import {
  useSuspenseInfiniteGamesCheerTalkBlock,
  useSuspenseInfiniteGamesCheerTalkReport,
  useSuspenseInfiniteGamesCheerTalks,
  useSuspenseInfiniteLeagueCheerTalkBlock,
  useSuspenseInfiniteLeagueCheerTalkReport,
  useSuspenseInfiniteLeagueCheerTalks,
  useUpdateCheerTalkBlock,
  useUpdateCheerTalkUnblock,
} from '@hcc/manager-api';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useState } from 'react';

import type { League } from '~/types';

import { ErrorState } from '~/components/error-state';
import { CheckSmallIcon, DeleteOutlineIcon, ErrorIcon } from '~/components/icons';
import { PageHeader } from '~/components/layout/page-header';
import { Button } from '~/components/ui/button';
import { Chip, FilterBar, FilterDivider, FilterGroup, SearchInput } from '~/components/ui/table';
import { Toasts, useToasts } from '~/components/ui/toast';
import { cn } from '~/utils/cn';
import { monthDay, timeOf } from '~/utils/date';
import { parseHTTPError } from '~/utils/http-error';

type Filter = 'unblocked' | 'reported' | 'blocked';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'unblocked', label: '전체' },
  { key: 'reported', label: '신고됨' },
  { key: 'blocked', label: '차단됨' },
];

const PAGE_SIZE = 50;

/** 응원톡 대부분은 프리셋 버튼이라 자유 입력만 따로 볼 수 있게 한다 */
const PRESETS = ['가즈아🔥', '나이스👍', '까비😭️'];
const isPreset = (content: string) => PRESETS.includes(content.trim());

const formatTime = (iso: string) => `${monthDay(iso)} ${timeOf(iso)}`;

type TalkPage = {
  talks: CheerTalkType[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => unknown;
};

type TalkQuery = Omit<TalkPage, 'talks'> & { data: CheerTalkType[] };

type SourceProps = { id: number; children: (page: TalkPage) => ReactNode };

const EMPTY_PAGE: TalkPage = {
  talks: [],
  hasNextPage: false,
  isFetchingNextPage: false,
  fetchNextPage: () => undefined,
};

/** 필터마다 부르는 훅이 달라서, 훅 하나씩 감싼 컴포넌트를 key 로 갈아 끼운다 */
const source = (useTalks: (id: number) => TalkQuery) => {
  const Source = ({ id, children }: SourceProps) => {
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useTalks(id);
    return children({ talks: data, hasNextPage, isFetchingNextPage, fetchNextPage });
  };
  return Source;
};

const useLeagueAll = (leagueId: number) =>
  useSuspenseInfiniteLeagueCheerTalks({ leagueId, cursor: 0, size: PAGE_SIZE });
const useLeagueReported = (leagueId: number) =>
  useSuspenseInfiniteLeagueCheerTalkReport({ leagueId, cursor: 0, size: PAGE_SIZE });
const useLeagueBlocked = (leagueId: number) =>
  useSuspenseInfiniteLeagueCheerTalkBlock({ leagueId, cursor: 0, size: PAGE_SIZE });
const useGameAll = (gameId: number) =>
  useSuspenseInfiniteGamesCheerTalks({ gameId, cursor: 0, size: PAGE_SIZE });
const useGameReported = (gameId: number) =>
  useSuspenseInfiniteGamesCheerTalkReport({ gameId, cursor: 0, size: PAGE_SIZE });
const useGameBlocked = (gameId: number) =>
  useSuspenseInfiniteGamesCheerTalkBlock({ gameId, cursor: 0, size: PAGE_SIZE });

const SOURCES = {
  league: {
    unblocked: source(useLeagueAll),
    reported: source(useLeagueReported),
    blocked: source(useLeagueBlocked),
  },
  game: {
    unblocked: source(useGameAll),
    reported: source(useGameReported),
    blocked: source(useGameBlocked),
  },
};

type Props = {
  /** 대회를 고르게 할 때만 넘긴다. 대회·경기로 고정된 화면에서는 비운다 */
  leagues?: Pick<League, 'leagueId' | 'name' | 'leagueProgress'>[];
  scope?: { leagueId: number; gameId?: number; title: string; breadcrumb?: string[] };
};

export default function CheerTalksClient({ leagues = [], scope }: Props) {
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(
    scope?.leagueId ?? leagues[0]?.leagueId ?? null,
  );
  const [filter, setFilter] = useState<Filter>('unblocked');
  const [onlyFreeText, setOnlyFreeText] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { toasts, push, pushError } = useToasts();
  const { mutate: block } = useUpdateCheerTalkBlock();
  const { mutate: unblock } = useUpdateCheerTalkUnblock();

  const leagueId = scope?.leagueId ?? selectedLeagueId;
  const gameId = scope?.gameId;

  const toggleBlock = (talk: CheerTalkType) => {
    const unblocking = talk.isBlocked;
    // 경기 단위 전체 조회는 관객용 응답이라 leagueId 가 비어 온다. 화면이 아는 값으로 메운다
    const targetLeagueId = talk.leagueId ?? leagueId;
    if (!targetLeagueId) {
      pushError('대회를 알 수 없어 처리하지 못했어요.');
      return;
    }

    (unblocking ? unblock : block)(
      { leagueId: targetLeagueId, cheerTalkId: talk.cheerTalkId, gameId },
      {
        onSuccess: () => push(unblocking ? '차단을 해제했어요' : '응원톡을 차단했어요'),
        onError: async (error) =>
          pushError(
            await parseHTTPError(error, unblocking ? '해제하지 못했어요.' : '차단하지 못했어요.'),
          ),
      },
    );
  };

  /** 필터 막대에 불러온 응원톡 개수가 들어가서 막대와 목록을 같이 그린다. null 은 불러오는 중 */
  const body = (current: TalkPage | null) => {
    const talks = current?.talks ?? [];
    const needle = keyword.trim().toLowerCase();
    const visible = talks.filter(
      (t) =>
        (!onlyFreeText || !isPreset(t.content)) &&
        (needle === '' || t.content.toLowerCase().includes(needle)),
    );
    const freeTextCount = talks.filter((t) => !isPreset(t.content)).length;

    return (
      <div className="flex flex-col gap-4 p-6">
        <FilterBar>
          {!scope && (
            <>
              <FilterGroup label="대회">
                <select
                  aria-label="대회 선택"
                  value={selectedLeagueId ?? ''}
                  onChange={(e) => setSelectedLeagueId(Number(e.target.value))}
                  className="text-t6 h-8 min-w-44 rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] px-2.5"
                >
                  {leagues.map((league) => (
                    <option key={league.leagueId} value={league.leagueId}>
                      {league.name}
                    </option>
                  ))}
                </select>
              </FilterGroup>

              <FilterDivider />
            </>
          )}

          {/* 서버가 거르는 값이라 지금 화면에 없는 분류의 개수는 알 수 없다 */}
          <FilterGroup label="상태">
            {FILTERS.map(({ key, label }) => (
              <Chip key={key} active={filter === key} onClick={() => setFilter(key)}>
                {label}
              </Chip>
            ))}
          </FilterGroup>

          <FilterDivider />

          <label className="text-t6 flex h-8 cursor-pointer items-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)] px-3 text-[var(--color-neutral-600)]">
            <input
              type="checkbox"
              checked={onlyFreeText}
              onChange={(e) => setOnlyFreeText(e.target.checked)}
            />
            자유 입력만
            <span className="tnum text-t7 text-[var(--color-neutral-400)]">
              {freeTextCount}/{talks.length}
            </span>
          </label>

          <div className="ml-auto flex items-center gap-3">
            <SearchInput
              value={keyword}
              onValueChange={setKeyword}
              placeholder="응원톡 내용 검색"
            />
          </div>
        </FilterBar>

        <div className="border-t border-[var(--color-greyscale-50)]">
          {current === null ? (
            <p className="text-t6 px-5 py-14 text-center text-[var(--color-neutral-400)]">
              불러오는 중…
            </p>
          ) : visible.length === 0 ? (
            <p className="text-t6 px-5 py-14 text-center text-[var(--color-neutral-400)]">
              해당하는 응원톡이 없어요.
            </p>
          ) : (
            visible.map((talk) => (
              <div
                key={talk.cheerTalkId}
                className={cn(
                  'group flex h-12 items-center gap-4 border-b border-[var(--color-hairline)] px-3.5',
                  talk.isBlocked
                    ? 'bg-[var(--color-greyscale-25)]'
                    : 'hover:bg-[var(--color-greyscale-25)]',
                )}
              >
                <p
                  className={cn(
                    'text-t6 min-w-0 flex-1 truncate',
                    talk.isBlocked && 'text-[var(--color-neutral-400)] line-through',
                  )}
                  title={talk.content}
                >
                  {talk.content}
                </p>

                {!gameId && (
                  <span className="text-t7 w-40 shrink-0 truncate text-right text-[var(--color-neutral-400)]">
                    {talk.gameName ?? ''}
                  </span>
                )}
                <span className="tnum text-t7 w-28 shrink-0 text-right text-[var(--color-neutral-400)]">
                  {formatTime(talk.createdAt)}
                </span>

                {talk.isBlocked && (
                  <span className="text-t7 shrink-0 font-bold text-[var(--color-neutral-400)]">
                    차단됨
                  </span>
                )}
                {filter === 'reported' && !talk.isBlocked && (
                  <span className="text-t7 inline-flex shrink-0 items-center gap-1 rounded-[var(--radius-control)] bg-[var(--color-danger-100)] px-2 py-1 font-bold text-[var(--color-danger-700)]">
                    <ErrorIcon size={12} />
                    신고
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => toggleBlock(talk)}
                  className={cn(
                    'text-t7 inline-flex h-8 shrink-0 items-center gap-1 rounded-[var(--radius-chip)] px-2.5 font-semibold transition-colors',
                    talk.isBlocked
                      ? 'text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-neutral-800)]'
                      : 'text-[var(--color-neutral-500)] hover:bg-[var(--color-danger-100)] hover:text-[var(--color-danger-700)]',
                  )}
                >
                  {talk.isBlocked ? (
                    <>
                      <CheckSmallIcon size={14} />
                      해제
                    </>
                  ) : (
                    <>
                      <DeleteOutlineIcon size={14} />
                      차단
                    </>
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        {current?.hasNextPage && (
          <div className="flex justify-center">
            <Button
              size="sm"
              color="black"
              variant="outline"
              disabled={current.isFetchingNextPage}
              onClick={() => current.fetchNextPage()}
            >
              {current.isFetchingNextPage ? '불러오는 중…' : '더 보기'}
            </Button>
          </div>
        )}
      </div>
    );
  };

  const Source = gameId ? SOURCES.game[filter] : SOURCES.league[filter];
  const sourceId = gameId ?? leagueId;

  return (
    <div className="flex flex-col">
      <PageHeader title={scope?.title ?? '응원톡 관리'} breadcrumb={scope?.breadcrumb} />

      {sourceId === null ? (
        body(EMPTY_PAGE)
      ) : (
        <ErrorBoundary
          resetKeys={[sourceId, filter]}
          fallback={({ error }) => <ErrorState error={error} />}
        >
          <Suspense clientOnly fallback={body(null)}>
            <Source key={`${sourceId}:${filter}`} id={sourceId}>
              {body}
            </Source>
          </Suspense>
        </ErrorBoundary>
      )}

      <Toasts items={toasts} />
    </div>
  );
}
