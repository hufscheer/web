import { QueryBoundary } from '~/components/query-boundary';

import { Dashboard } from './_components/dashboard';
import { DashboardSkeleton } from './_components/dashboard-skeleton';

const DashboardPage = () => (
  <QueryBoundary fallback={<DashboardSkeleton />}>
    <Dashboard />
  </QueryBoundary>
);

export default DashboardPage;
