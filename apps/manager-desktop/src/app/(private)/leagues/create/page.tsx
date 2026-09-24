import { PageHeader } from '~/components/layout/page-header';
import { QueryBoundary } from '~/components/query-boundary';
import { Bar } from '~/components/skeleton';

import { LeagueCreateForm } from './_components/league-create-form';

const FormSkeleton = () => (
  <div className="flex max-w-[1260px] flex-wrap items-start gap-6" aria-busy="true">
    <Bar className="h-96 w-[560px] shrink-0" />
    <Bar className="h-96 min-w-0 flex-1" />
  </div>
);

const LeagueCreatePage = () => (
  <div className="flex flex-col">
    <PageHeader title="대회 생성" breadcrumb={['대회 관리', '대회 생성']} />
    <div className="p-6">
      <QueryBoundary fallback={<FormSkeleton />}>
        <LeagueCreateForm />
      </QueryBoundary>
    </div>
  </div>
);

export default LeagueCreatePage;
