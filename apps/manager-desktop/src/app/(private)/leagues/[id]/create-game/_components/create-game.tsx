'use client';

import { useSuspenseQueries } from '@hcc/api-base';
import { queryKeys } from '@hcc/manager-api';
import Link from 'next/link';

import { SettingsIcon } from '~/components/icons';
import { PageHeader } from '~/components/layout/page-header';
import { Button } from '~/components/ui/button';
import { routes } from '~/constants/routes';
import { toLeague } from '~/utils/convert';

import { CreateGameForm, type GamePrefill } from './create-game-form';

export const CreateGame = ({ leagueId, prefill }: { leagueId: number; prefill?: GamePrefill }) => {
  const [{ data: leagueData }, { data: leagueTeams }] = useSuspenseQueries({
    queries: [queryKeys.leagues.detail({ leagueId }), queryKeys.leagues.teams({ leagueId })],
  });

  const league = toLeague(leagueData, leagueId);
  const canCreate = leagueTeams.length >= 2;

  // 주소는 손으로 고칠 수 있다. 참가 팀이 아닌 팀을 넣으면 select 가 빈 값으로 떠서 걸러 낸다
  const validPrefill = prefill && {
    ...prefill,
    teamIds: prefill.teamIds.filter((teamId) => leagueTeams.some((team) => team.teamId === teamId)),
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="경기 생성"
        breadcrumb={[
          '대회 관리',
          { label: league.name, href: routes.league(league.leagueId) },
          '경기 생성',
        ]}
        description={
          canCreate ? `참가 팀 ${leagueTeams.length}팀 중에서 대진을 골라요.` : undefined
        }
      />
      <div className="p-6">
        {!canCreate ? (
          <div className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] px-6 py-14 text-center">
            <p className="text-t6 text-[var(--color-neutral-500)]">
              참가 팀이 두 팀 이상이어야 경기를 만들 수 있어요.
            </p>
            <Link href={routes.leagueManage(league.leagueId)}>
              <Button size="md" color="black" variant="outline">
                <SettingsIcon size={15} />
                대회 정보 수정에서 팀 추가
              </Button>
            </Link>
          </div>
        ) : (
          <CreateGameForm league={league} leagueTeams={leagueTeams} prefill={validPrefill} />
        )}
      </div>
    </div>
  );
};
