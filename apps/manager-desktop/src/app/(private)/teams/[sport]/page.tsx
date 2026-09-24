import { notFound } from 'next/navigation';

import { QueryBoundary } from '~/components/query-boundary';
import { SPORT_BY_PATH } from '~/constants/routes';

import TeamsClient from './_components/teams-client';

type Props = { params: Promise<{ sport: string }> };

const TeamsPage = async ({ params }: Props) => {
  const { sport } = await params;
  const sportType = SPORT_BY_PATH[sport];
  if (!sportType) notFound();

  return (
    <QueryBoundary>
      <TeamsClient initialSport={sportType} />
    </QueryBoundary>
  );
};

export default TeamsPage;
