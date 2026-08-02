'use client';

import { HCCBigLogo } from '@hcc/icons';
import { Button } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { routes } from '~/constants/routes';
import { startOrgSession } from '~/utils/org-session';
import { DEFAULT_SPORT } from '~/utils/sport-route';

import { HeroBanner } from './_components/hero-banner';
import { OrganizationList } from './_components/organization-list';

// export const metadata: Metadata = { title: '학교 선택' };

export default function Page() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleStart = () => {
    if (selectedId === null) return;

    startOrgSession(router, routes.home({ orgId: selectedId, sport: DEFAULT_SPORT }), selectedId);
  };

  return (
    <div className="flex min-h-dvh flex-col justify-between px-5 py-10">
      <div className="flex-col">
        <HCCBigLogo width="141" height="42" color="#007AFF" className="my-5" />

        <HeroBanner />

        <ErrorBoundary fallback={<OrganizationList.Error />}>
          <Suspense clientOnly fallback={<OrganizationList.Skeleton />}>
            <OrganizationList selectedId={selectedId} handleSelectedId={setSelectedId} />
          </Suspense>
        </ErrorBoundary>
      </div>

      <Button
        disabled={selectedId === null}
        onClick={handleStart}
        className="h-12 w-full rounded-xl bg-[var(--color-primary-600)] text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
      >
        시작하기
      </Button>
    </div>
  );
}
