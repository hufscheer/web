import type { Metadata } from 'next';

import { ErrorBoundary, Suspense } from '@suspensive/react';

import { ErrorMessage } from '../../../_components/error-message';
import { LeagueCardList } from './_components/league-card-list';
import { YearFilter } from './_components/year-filter';

export const metadata: Metadata = { title: '대회' };

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const currentYear = new Date().getFullYear();
  const selectedYear = Number((await searchParams).year) || currentYear;

  return (
    <div className="flex flex-1 flex-col">
      <ErrorBoundary fallback={<ErrorMessage />}>
        <Suspense clientOnly>
          <YearFilter selectedYear={selectedYear} />
          <div className="column flex-1 px-5">
            <LeagueCardList year={selectedYear} />
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
