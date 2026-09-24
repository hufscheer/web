'use client';

import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import { queryKeys } from '@hcc/manager-api';
import { HTTPError } from 'ky';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { Player, SportType } from '~/types';

import { AddIcon, ChevronForwardIcon } from '~/components/icons';
import { PageHeader } from '~/components/layout/page-header';
import { Button } from '~/components/ui/button';
import { Chip, FilterBar, FilterGroup, SearchInput } from '~/components/ui/table';
import { routes } from '~/constants/routes';
import { SportIcon } from '~/constants/sports';
import { useDebounce } from '~/hooks/useDebounce';
import { toPlayer } from '~/utils/convert';

const FILTERS: { value: 'ALL' | SportType | 'NONE'; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'SOCCER', label: '축구' },
  { value: 'BASKETBALL', label: '농구' },
  { value: 'NONE', label: '소속 없음' },
];

const searchOf = (keyword: string) =>
  /^\d+$/.test(keyword) ? { studentNumber: keyword, size: 50 } : { name: keyword, size: 50 };

const searchErrorOf = (error: unknown) =>
  error instanceof HTTPError
    ? `선수를 불러오지 못했어요. (${error.response.status})`
    : '선수를 불러오지 못했어요.';

export default function PlayersClient() {
  const [query, setQuery] = useState('');
  const keyword = useDebounce(query).trim();
  const [sport, setSport] = useState<'ALL' | SportType | 'NONE'>('ALL');

  const { data: firstPage } = useSuspenseQuery(queryKeys.players.search({ size: 100 }));
  const players = useMemo(() => firstPage.content.map(toPlayer), [firstPage]);

  // 서버가 이름·학번 검색을 지원한다. 첫 페이지만 받아 두고 거르면 뒤쪽 선수가 안 잡힌다
  const searching = keyword !== '';
  const search = useQuery({ ...queryKeys.players.search(searchOf(keyword)), enabled: searching });
  const searched = useMemo(() => (search.data?.content ?? []).map(toPlayer), [search.data]);

  // 검색 실패를 "결과 없음"으로 보여 주면 없는 선수를 또 만들게 된다
  const errorMessage = searching && search.isError ? searchErrorOf(search.error) : null;
  const loading = searching && search.isPending;
  const base: Player[] = searching ? searched : players;

  // 서버가 페이지 단위로 준다. 잘렸으면 "이게 전부"라고 말하면 안 된다
  const truncated = searching ? Boolean(search.data?.hasNext) : Boolean(firstPage.hasNext);

  const matches = (player: Player, value: typeof sport) =>
    value === 'ALL'
      ? true
      : value === 'NONE'
        ? player.teams.length === 0
        : player.teams.some((team) => team.sportType === value);
  const countOf = (value: typeof sport) => base.filter((player) => matches(player, value)).length;

  const rows = base.filter((player) => {
    if (sport === 'ALL') return true;
    if (sport === 'NONE') return player.teams.length === 0;
    return player.teams.some((team) => team.sportType === sport);
  });

  return (
    <div className="flex flex-col">
      <PageHeader
        title="선수 관리"
        actions={
          <Link href={routes.playerCreate}>
            <Button size="md">
              <AddIcon size={13} />
              선수 등록
            </Button>
          </Link>
        }
      />

      <div className="flex flex-col gap-4 p-6">
        <FilterBar>
          <FilterGroup label="소속">
            {FILTERS.map(({ value, label }) => (
              <Chip
                key={value}
                active={sport === value}
                count={countOf(value)}
                onClick={() => setSport(value)}
              >
                {value === 'SOCCER' || value === 'BASKETBALL' ? (
                  <SportIcon sportType={value} size={12} colored={sport !== value} />
                ) : null}
                {label}
              </Chip>
            ))}
          </FilterGroup>

          <div className="ml-auto flex items-center gap-3">
            <span className="tnum text-t7 text-[var(--color-neutral-400)]">
              {loading ? '검색 중…' : truncated ? `${rows.length}명 이상` : `${rows.length}명`}
            </span>
            <SearchInput value={query} onValueChange={setQuery} placeholder="이름 또는 학번" />
          </div>
        </FilterBar>

        {errorMessage && (
          <p className="text-t7 rounded-[var(--radius-control)] border border-[var(--color-danger-200)] bg-[var(--color-danger-50)] px-3 py-1.5 text-[var(--color-danger-700)]">
            {errorMessage}
          </p>
        )}

        {!errorMessage && truncated && (
          <p className="text-t7 rounded-[var(--radius-control)] border border-[var(--color-primary-200)] bg-[var(--color-primary-50)] px-3 py-1.5 text-[var(--color-primary-700)]">
            선수가 더 있어요. 이름이나 학번으로 검색해서 좁혀 주세요.
          </p>
        )}

        <div>
          <div
            aria-hidden
            className="text-t7 flex h-9 items-center gap-4 border-b border-[var(--color-greyscale-50)] px-3.5 font-medium text-[var(--color-neutral-400)]"
          >
            <span className="w-28 shrink-0">이름</span>
            <span className="w-28 shrink-0">학번</span>
            <span className="min-w-0 flex-1">소속 팀</span>
          </div>
          {rows.length === 0 ? (
            <p className="text-t6 py-10 text-center text-[var(--color-neutral-400)]">
              {errorMessage
                ? '검색에 실패했어요.'
                : searching
                  ? '검색 결과가 없어요.'
                  : '등록된 선수가 없어요.'}
            </p>
          ) : (
            rows.map((player) => (
              <Link
                key={player.playerId}
                href={routes.player(player.playerId)}
                className="flex h-12 items-center gap-4 border-b border-[var(--color-hairline)] px-3.5 hover:bg-[var(--color-greyscale-25)]"
              >
                <span className="text-t5 w-28 shrink-0 truncate font-medium">{player.name}</span>
                <span className="tnum text-t6 w-28 shrink-0 text-[var(--color-neutral-500)]">
                  {player.studentNumber}
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-4 overflow-hidden">
                  {player.teams.length === 0 ? (
                    <span className="text-t6 text-[var(--color-neutral-400)]">소속 팀 없음</span>
                  ) : (
                    player.teams.map((team) => (
                      <span
                        key={team.teamId}
                        className="text-t6 flex shrink-0 items-center gap-1.5 text-[var(--color-neutral-700)]"
                      >
                        <SportIcon sportType={team.sportType} size={12} colored />
                        {team.teamName}
                      </span>
                    ))
                  )}
                </span>
                <ChevronForwardIcon
                  size={16}
                  className="shrink-0 text-[var(--color-neutral-300)]"
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
