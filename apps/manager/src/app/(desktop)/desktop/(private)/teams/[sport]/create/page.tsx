import { notFound } from 'next/navigation';

import { QueryBoundary } from '~/app/(desktop)/_components/query-boundary';
import { SPORT_BY_PATH } from '~/app/(desktop)/_constants/routes';

import { TeamCreate } from './_components/team-create';

type Props = { params: Promise<{ sport: string }> };

const TeamCreatePage = async ({ params }: Props) => {
  const { sport } = await params;
  const sportType = SPORT_BY_PATH[sport];
  if (!sportType) notFound();

  return (
    <QueryBoundary>
      <TeamCreate sportType={sportType} />
    </QueryBoundary>
  );
};

export default TeamCreatePage;
