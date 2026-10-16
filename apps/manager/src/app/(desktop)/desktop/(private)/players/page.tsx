import { QueryBoundary } from '~/desktop/components/query-boundary';

import PlayersClient from './_components/players-client';

const PlayersPage = () => (
  <QueryBoundary>
    <PlayersClient />
  </QueryBoundary>
);

export default PlayersPage;
