import { QueryBoundary } from '~/app/(desktop)/_components/query-boundary';

import { LeaguesView } from './_components/leagues-view';

const LeaguesPage = () => (
  <QueryBoundary>
    <LeaguesView />
  </QueryBoundary>
);

export default LeaguesPage;
