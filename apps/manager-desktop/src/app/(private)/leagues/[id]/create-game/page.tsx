import { notFound } from 'next/navigation';

import { QueryBoundary } from '~/components/query-boundary';

import { CreateGame } from './_components/create-game';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

const CreateGamePage = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const leagueId = Number(id);
  if (!Number.isFinite(leagueId)) notFound();

  // 대진표의 빈 칸에서 넘어온 값
  const query = await searchParams;
  const round = Number(first(query.round));
  const teamIds = String(first(query.teams) ?? '')
    .split(',')
    .filter(Boolean)
    .map(Number);

  const prefill =
    Number.isInteger(round) && round >= 2
      ? { round, teamIds, thirdPlace: first(query.thirdPlace) === '1' }
      : undefined;

  return (
    <QueryBoundary>
      <CreateGame leagueId={leagueId} prefill={prefill} />
    </QueryBoundary>
  );
};

export default CreateGamePage;
