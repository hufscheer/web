import { notFound } from 'next/navigation';

// 대진표 등록 기능은 아직 열지 않는다. 직접 주소로 들어와도 열리지 않게 404 로 막는다.
// 기능을 열 때는 이 파일을 아래 원래 코드로 되돌린다.
const LeagueBracketPage = () => notFound();

export default LeagueBracketPage;

/*
import { notFound } from 'next/navigation';

import { QueryBoundary } from '~/app/(desktop)/_components/query-boundary';

import { LeagueBracket } from './_components/league-bracket';

type Props = { params: Promise<{ id: string }> };

const LeagueBracketPage = async ({ params }: Props) => {
  const { id } = await params;
  const leagueId = Number(id);
  if (!Number.isFinite(leagueId)) notFound();

  return (
    <QueryBoundary>
      <LeagueBracket leagueId={leagueId} />
    </QueryBoundary>
  );
};

export default LeagueBracketPage;
*/
