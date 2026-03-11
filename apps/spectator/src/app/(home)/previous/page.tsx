import { Tabs } from '@base-ui/react';
import { ErrorBoundary, Suspense } from '@suspensive/react';

import { ErrorMessage } from '../_components/error-message';
import { LeagueCardList } from './_components/league-card-list';
import { YearFilter } from './_components/year-filter';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const currentYear = new Date().getFullYear();
  const selectedYear = Number((await searchParams).year) || currentYear;

  return (
    <Tabs.Panel value="previous" className="flex-1" keepMounted>
      <YearFilter selectedYear={selectedYear} />

      <div className="column">
        <ErrorBoundary fallback={<ErrorMessage />}>
          <Suspense clientOnly>
            <LeagueCardList year={selectedYear} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Tabs.Panel>
  );
}
