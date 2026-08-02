import type { Metadata } from 'next';

import { Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';

import type { TeamDetailType } from '~/api';

import { fetchTeam } from '~/api';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';

import { SPORT_TYPE } from '../../_constants';
import { TeamInfo } from './_components/team-info';

interface Props {
  params: Promise<{ orgId: string; id: string }>;
}

const Page = async ({ params }: Props) => {
  const { orgId: _orgId, id: _id } = await params;
  const orgId = Number(_orgId);
  const id = Number(_id);

  if (Number.isNaN(id) || id <= 0) {
    redirect(routes.home({ orgId, sport: SPORT_TYPE }));
  }

  return (
    <div className="flex min-h-svh flex-col">
      <Header.Root
        left={<Header.Arrow />}
        center={<Header.LinkLogo sport={SPORT_TYPE} orgId={orgId} />}
      />

      <div className="flex flex-1 flex-col">
        <Suspense clientOnly>
          <TeamInfo id={id} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id: _id } = await params;
  const id = Number(_id);

  if (!_id || Number.isNaN(id) || id <= 0) return {};

  const team: TeamDetailType = await fetchTeam({ id });
  const title = team ? team.name : '';

  return {
    title,
    openGraph: { title },
    twitter: { title },
  };
};
