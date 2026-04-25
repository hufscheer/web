import type { Metadata } from 'next';

import { Suspense } from '@suspensive/react';

import type { TeamDetailType } from '~/api';

import { fetchTeam } from '~/api';
import { Header } from '~/components/layout';

import { TeamInfo } from './_components/team-info';

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id: _id } = await params;
  const id = Number(_id);
  return (
    <div className="flex min-h-svh flex-col">
      <Header arrow />
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
