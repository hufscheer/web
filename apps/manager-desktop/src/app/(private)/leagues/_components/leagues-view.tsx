'use client';

import Link from 'next/link';

import { AddIcon } from '~/components/icons';
import { PageHeader } from '~/components/layout/page-header';
import { Button } from '~/components/ui/button';
import { routes } from '~/constants/routes';
import { isLeagueRunning } from '~/constants/sports';
import { useSuspenseMyLeagues } from '~/hooks/useMyLeagues';

import LeaguesClient from './LeaguesClient';

export const LeaguesView = () => {
  const leagues = useSuspenseMyLeagues();
  const running = leagues.filter(isLeagueRunning).length;

  return (
    <div className="flex flex-col">
      <PageHeader
        title="대회 관리"
        description={`내가 운영하는 대회 ${leagues.length}개 · 진행 중 ${running}개`}
        actions={
          <Link href={routes.leagueCreate}>
            <Button size="md">
              <AddIcon size={15} />
              대회 생성
            </Button>
          </Link>
        }
      />
      <div className="p-6">
        <LeaguesClient leagues={leagues} />
      </div>
    </div>
  );
};
