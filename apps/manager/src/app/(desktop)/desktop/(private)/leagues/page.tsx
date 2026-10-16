import { QueryBoundary } from '~/desktop/components/query-boundary';

import { LeaguesView } from './_components/leagues-view';

const LeaguesPage = () => (
  <QueryBoundary>
    <LeaguesView />
  </QueryBoundary>
);

export default LeaguesPage;
