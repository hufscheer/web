import { notFound } from 'next/navigation';

import { QueryBoundary } from '~/components/query-boundary';
import { SPORT_BY_PATH } from '~/constants/routes';

import { TeamEdit } from './_components/team-edit';

type Props = { params: Promise<{ sport: string; id: string }> };

const TeamEditPage = async ({ params }: Props) => {
  const { sport, id } = await params;
  const sportType = SPORT_BY_PATH[sport];
  const teamId = Number(id);
  if (!sportType || !Number.isFinite(teamId)) notFound();

  return (
    <QueryBoundary>
      <TeamEdit teamId={teamId} sportType={sportType} />
    </QueryBoundary>
  );
};

export default TeamEditPage;
