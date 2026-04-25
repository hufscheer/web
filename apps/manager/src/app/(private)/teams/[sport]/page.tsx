'use client';

import { AddIcon } from '@hcc/icons';
import { Button, Spinner, Typography } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import Link from 'next/link';
import { notFound, useParams, useSearchParams } from 'next/navigation';

import type { SportType } from '~/api/types';

import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';

import { SportTabs } from '../_components/sport-tabs';
import { TeamList } from '../_components/team-list';

const SPORT_MAP: Record<string, SportType> = {
  soccer: 'SOCCER',
  basketball: 'BASKETBALL',
};

const TeamEditMenu = ({ edit }: { edit: boolean }) => {
  return (
    <Typography color="var(--color-neutral-500)" weight="semibold" asChild>
      <Link href={`?edit=${edit ? 'false' : 'true'}`} replace>
        {edit ? '완료' : '편집'}
      </Link>
    </Typography>
  );
};

const Page = () => {
  const { sport } = useParams<{ sport: string }>();
  const searchParams = useSearchParams();
  const edit = searchParams.get('edit') === 'true';

  const sportType = SPORT_MAP[sport];
  if (!sportType) notFound();

  return (
    <>
      <Header title="참가 팀 관리" menu={<TeamEditMenu edit={edit} />} arrow />

      <div className="column h-full overflow-hidden bg-white">
        <SportTabs />
        <Suspense
          fallback={
            <div className="center p-5">
              <Spinner size="lg" color="neutral" />
            </div>
          }
          clientOnly
        >
          <TeamList edit={edit} sportType={sportType} />
        </Suspense>

        <div className="fixed bottom-5 ml-5 w-full max-w-[calc(min(var(--app-max-width),100%)-40px)] gap-0.5">
          <Button className="w-full" variant="subtle" color="black" size="lg" asChild>
            <Link href={`/${routes.teams_create(sport)}`}>
              <AddIcon className="mr-0.5" size={24} /> 새로운 팀 추가
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
