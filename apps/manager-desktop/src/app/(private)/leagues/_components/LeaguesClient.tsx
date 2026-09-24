'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import type { ManagerLeague, SportType } from '~/types';

import { AddIcon } from '~/components/icons';
import { Badge, LiveBadge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  Chip,
  EmptyRow,
  FilterBar,
  FilterDivider,
  FilterGroup,
  RowMenu,
  rowClass,
  ListFooterCta,
  SearchInput,
  TableShell,
  tdClass,
  Th,
} from '~/components/ui/table';
import { routes } from '~/constants/routes';
import {
  isLeagueBefore,
  isLeagueRunning,
  roundLabel,
  SportIcon,
  SportTag,
} from '~/constants/sports';
import { period } from '~/utils/date';

type SportFilter = 'ALL' | SportType;
type StatusFilter = 'ALL' | '진행 중' | '시작 전' | '종료';

const SPORT_OPTIONS: { value: SportFilter; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'SOCCER', label: '축구' },
  { value: 'BASKETBALL', label: '농구' },
];

const STATUS_OPTIONS: StatusFilter[] = ['ALL', '진행 중', '시작 전', '종료'];

// 운영 중인 대회부터, 그다음은 최근 시작 순
const ORDER: Record<string, number> = { '진행 중': 0, '시작 전': 1, 종료: 2 };

export default function LeaguesClient({ leagues }: { leagues: ManagerLeague[] }) {
  const router = useRouter();
  const [sport, setSport] = useState<SportFilter>('ALL');
  const [status, setStatus] = useState<StatusFilter>('ALL');
  const [keyword, setKeyword] = useState('');

  const matchesSport = (league: ManagerLeague, value: SportFilter) =>
    value === 'ALL' || league.sportType === value;
  const matchesStatus = (league: ManagerLeague, value: StatusFilter) =>
    value === 'ALL' || league.leagueProgress === value;

  const filtered = useMemo(() => {
    const needle = keyword.trim().toLowerCase();
    return leagues
      .filter(
        (league) =>
          matchesSport(league, sport) &&
          matchesStatus(league, status) &&
          (needle === '' || league.name.toLowerCase().includes(needle)),
      )
      .sort(
        (a, b) =>
          (ORDER[a.leagueProgress] ?? 3) - (ORDER[b.leagueProgress] ?? 3) ||
          b.startAt.localeCompare(a.startAt),
      );
  }, [leagues, sport, status, keyword]);

  // 칩 숫자는 "그 칩을 누르면 남는 개수"라 자기 축만 빼고 센다
  const sportCount = (value: SportFilter) =>
    leagues.filter((l) => matchesSport(l, value) && matchesStatus(l, status)).length;
  const statusCount = (value: StatusFilter) =>
    leagues.filter((l) => matchesSport(l, sport) && matchesStatus(l, value)).length;

  const empty = leagues.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <FilterBar>
        <FilterGroup label="종목">
          {SPORT_OPTIONS.map(({ value, label }) => (
            <Chip
              key={value}
              active={sport === value}
              count={sportCount(value)}
              onClick={() => setSport(value)}
            >
              {value !== 'ALL' && (
                <SportIcon sportType={value} size={12} colored={sport !== value} />
              )}
              {label}
            </Chip>
          ))}
        </FilterGroup>

        <FilterDivider />

        <FilterGroup label="상태">
          {STATUS_OPTIONS.map((value) => (
            <Chip
              key={value}
              active={status === value}
              count={statusCount(value)}
              onClick={() => setStatus(value)}
            >
              {value === 'ALL' ? '전체' : value}
            </Chip>
          ))}
        </FilterGroup>

        <div className="ml-auto flex items-center gap-3">
          <SearchInput value={keyword} onValueChange={setKeyword} placeholder="대회명 검색" />
        </div>
      </FilterBar>

      <TableShell>
        <thead>
          <tr>
            <Th>대회명</Th>
            <Th>종목</Th>
            <Th>기간</Th>
            <Th align="right">참가 팀</Th>
            <Th align="right">라운드</Th>
            <Th>3·4위전</Th>
            <Th>상태</Th>
            <Th />
          </tr>
        </thead>
        <tbody>
          {empty ? (
            <EmptyRow colSpan={8}>
              <span className="flex flex-col items-center gap-3">
                아직 만든 대회가 없어요.
                <Link href={routes.leagueCreate}>
                  <Button size="md">
                    <AddIcon size={15} />첫 대회 만들기
                  </Button>
                </Link>
              </span>
            </EmptyRow>
          ) : filtered.length === 0 ? (
            <EmptyRow colSpan={8}>조건에 맞는 대회가 없어요.</EmptyRow>
          ) : (
            filtered.map((league) => (
              <tr
                key={league.leagueId}
                className={rowClass}
                onClick={() => router.push(routes.league(league.leagueId))}
              >
                <td className={`${tdClass} font-semibold`}>{league.name}</td>
                <td className={tdClass}>
                  <SportTag sportType={league.sportType} soft />
                </td>
                <td className={`${tdClass} tnum text-t7 text-[var(--color-neutral-500)]`}>
                  {period(league.startAt, league.endAt)}
                </td>
                <td className={`${tdClass} tnum text-right text-[var(--color-neutral-700)]`}>
                  {league.leagueTeamCount}
                </td>
                <td className={`${tdClass} tnum text-right text-[var(--color-neutral-700)]`}>
                  {roundLabel(league.maxRound)}
                </td>
                <td className={`${tdClass} text-t7 text-[var(--color-neutral-500)]`}>
                  {league.thirdPlaceMatchEnabled ? '있음' : '없음'}
                </td>
                <td className={tdClass}>
                  {isLeagueRunning(league) ? (
                    <LiveBadge soft />
                  ) : (
                    <Badge soft variant={isLeagueBefore(league) ? 'primary' : 'default'}>
                      {league.leagueProgress}
                    </Badge>
                  )}
                </td>
                <td className={`${tdClass} w-px`}>
                  <span className="flex items-center justify-end">
                    <RowMenu
                      label={`${league.name} 관리 메뉴`}
                      actions={[
                        {
                          label: '대회 상세',
                          onSelect: () => router.push(routes.league(league.leagueId)),
                        },
                        {
                          label: '대회 수정',
                          onSelect: () => router.push(routes.leagueManage(league.leagueId)),
                        },
                        {
                          label: '대진표',
                          onSelect: () => router.push(routes.leagueBracket(league.leagueId)),
                        },
                        {
                          label: '경기 생성',
                          onSelect: () => router.push(routes.gameCreate(league.leagueId)),
                        },
                        {
                          label: '응원톡',
                          onSelect: () => router.push(routes.leagueCheertalks(league.leagueId)),
                        },
                      ]}
                    />
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </TableShell>

      {!empty && (
        <p className="text-t7 text-[var(--color-neutral-400)]">
          {status === 'ALL' && sport === 'ALL' && keyword === ''
            ? `${leagues.length}개`
            : `${filtered.length}개 / 전체 ${leagues.length}개`}
        </p>
      )}

      {/* 필터로 줄어든 것과 구분하려고 전체 개수로만 판단한다 */}
      {leagues.length > 0 && leagues.length < 4 && (
        <ListFooterCta message="대회를 더 만들면 여기에 쌓여요.">
          <Link href={routes.leagueCreate}>
            <Button size="md" color="black" variant="outline">
              <AddIcon size={15} />
              대회 생성
            </Button>
          </Link>
        </ListFooterCta>
      )}
    </div>
  );
}
