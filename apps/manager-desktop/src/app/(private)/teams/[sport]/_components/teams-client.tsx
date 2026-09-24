'use client';

import { useQuery } from '@hcc/api-base';
import { queryKeys, useSuspenseManagerAllTeams } from '@hcc/manager-api';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { SportType, Team } from '~/types';

import { AddIcon, SettingsIcon } from '~/components/icons';
import { PageHeader } from '~/components/layout/page-header';
import { Button } from '~/components/ui/button';
import { SearchInput } from '~/components/ui/table';
import { routes } from '~/constants/routes';
import { SPORT_COLOR, SPORT_COLOR_SOFT, SportIcon } from '~/constants/sports';
import { toTeam, toTeamPlayerRows } from '~/utils/convert';

const SPORT_TABS: { value: SportType; label: string }[] = [
  { value: 'SOCCER', label: '축구' },
  { value: 'BASKETBALL', label: '농구' },
];

export default function TeamsClient({ initialSport = 'SOCCER' }: { initialSport?: SportType }) {
  const { data } = useSuspenseManagerAllTeams();
  const teams = useMemo(() => data.map(toTeam), [data]);
  const [sport, setSport] = useState<SportType>(initialSport);
  const [keyword, setKeyword] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(
    () => teams.find((t) => t.sportType === initialSport) ?? null,
  );

  const needle = keyword.trim().toLowerCase();
  const filteredTeams = teams.filter(
    (t) =>
      t.sportType === sport &&
      (needle === '' ||
        t.name.toLowerCase().includes(needle) ||
        (t.unitName ?? '').toLowerCase().includes(needle)),
  );

  // 팀마다 키가 달라서, 팀을 바꾼 직후 이전 팀 선수가 남지 않는다
  const { data: roster } = useQuery({
    ...queryKeys.teams.teamplayers({ id: selectedTeam?.teamId ?? 0 }),
    enabled: selectedTeam !== null,
  });
  const teamPlayers = selectedTeam ? toTeamPlayerRows(roster) : [];

  const handleSportChange = (nextSport: SportType) => {
    setSport(nextSport);
    setSelectedTeam(teams.find((t) => t.sportType === nextSport) ?? null);
  };

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team);
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="팀 관리"
        actions={
          <Link href={routes.teamCreate(sport)}>
            <Button size="md">
              <AddIcon size={16} />팀 추가
            </Button>
          </Link>
        }
      />

      <div className="shrink-0 border-b border-[var(--color-greyscale-50)] px-4">
        <div className="flex gap-1">
          {SPORT_TABS.map((tab) => {
            const on = sport === tab.value;
            const count = teams.filter((t) => t.sportType === tab.value).length;

            return (
              <button
                key={tab.value}
                type="button"
                aria-current={on ? 'page' : undefined}
                onClick={() => handleSportChange(tab.value)}
                className={[
                  '-mb-px flex items-center gap-2 border-b-2 px-3.5 py-3 text-t5 transition-colors',
                  on
                    ? 'font-bold text-[var(--color-neutral-900)]'
                    : 'border-transparent font-medium text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-700)]',
                ].join(' ')}
                style={on ? { borderBottomColor: SPORT_COLOR[tab.value] } : undefined}
              >
                <SportIcon sportType={tab.value} size={17} colored={on} />
                {tab.label}
                <span
                  className={[
                    'tnum rounded-[var(--radius-chip)] px-1.5 py-0.5 text-t8 font-semibold',
                    on ? 'text-[var(--color-neutral-700)]' : 'text-[var(--color-neutral-400)]',
                  ].join(' ')}
                  style={on ? { backgroundColor: SPORT_COLOR_SOFT[tab.value] } : undefined}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="flex w-64 shrink-0 flex-col border-r border-[var(--color-greyscale-50)]">
          <div className="shrink-0 border-b border-[var(--color-greyscale-50)] p-2.5">
            <SearchInput value={keyword} onValueChange={setKeyword} placeholder="팀 검색" />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {filteredTeams.length === 0 ? (
              <div className="text-t6 flex h-full items-center justify-center px-4 text-center text-[var(--color-neutral-400)]">
                {needle ? '검색 결과가 없어요.' : '팀이 없어요.'}
              </div>
            ) : (
              filteredTeams.map((team) => (
                <button
                  key={team.teamId}
                  type="button"
                  onClick={() => handleTeamClick(team)}
                  className={[
                    'flex w-full items-center gap-3 border-b border-[var(--color-hairline)] px-5 py-3 text-left transition-colors',
                    selectedTeam?.teamId === team.teamId
                      ? 'bg-[var(--color-neutral-200)]'
                      : 'hover:bg-[var(--color-neutral-100)]',
                  ].join(' ')}
                >
                  {team.logoImageUrl ? (
                    <img
                      src={team.logoImageUrl}
                      alt=""
                      className="size-8 shrink-0 rounded-full bg-[var(--color-greyscale-25)] object-cover"
                    />
                  ) : (
                    <span
                      className="size-8 shrink-0 rounded-full"
                      style={{ backgroundColor: team.logoColor }}
                    />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="text-t6 block truncate font-semibold">{team.name}</span>
                    <span className="text-t7 block truncate text-[var(--color-neutral-400)]">
                      {team.unitName}
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {selectedTeam ? (
            <>
              <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-greyscale-50)] px-4 py-2.5">
                <div>
                  <h2 className="text-t6 font-semibold">{selectedTeam.name}</h2>
                  <p className="text-t7 mt-0.5 text-[var(--color-neutral-400)]">
                    {selectedTeam.unitName} · {teamPlayers.length}명
                  </p>
                </div>
                <Link href={routes.team(selectedTeam.sportType, selectedTeam.teamId)}>
                  <Button size="xs" variant="outline" color="black">
                    <SettingsIcon size={14} />팀 수정
                  </Button>
                </Link>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {teamPlayers.length === 0 ? (
                  <div className="text-t6 flex h-full items-center justify-center text-[var(--color-neutral-400)]">
                    등록된 선수가 없어요.
                  </div>
                ) : (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
                    {teamPlayers.map((player) => (
                      <div
                        key={player.playerId}
                        className="flex items-center gap-2.5 rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)] px-3 py-1.5"
                      >
                        <span className="tnum text-t5 w-8 shrink-0 font-bold text-[var(--color-neutral-300)]">
                          {player.jerseyNumber ?? '-'}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="text-t6 block truncate font-semibold">
                            {player.name}
                          </span>
                          <span className="tnum text-t7 block truncate text-[var(--color-neutral-400)]">
                            {player.studentNumber}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-t6 flex flex-1 items-center justify-center text-[var(--color-neutral-400)]">
              팀을 선택해 주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
