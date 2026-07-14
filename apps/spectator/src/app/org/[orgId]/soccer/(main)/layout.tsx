import '@hcc/ui/styles.css';
import '~/styles/globals.css';
import type { ComponentProps, PropsWithChildren } from 'react';

import { ErrorBoundary, Suspense } from '@suspensive/react';

import { Header } from '~/components/layout';
import { Skeleton } from '~/components/skeleton';

import { NavigationBar } from '../../_components/navigation-bar';
import { OrgName, OrgSwitcher } from '../../_components/org-switcher';
import { SportTab } from '../../_components/sport-tab';
import { SPORT_TYPE } from '../_constants';

interface MainLayoutProps extends PropsWithChildren {
  params: {
    orgId: string;
  };
}

const MainLayout = ({ children, params: { orgId } }: MainLayoutProps) => {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <Header.Root
        left={<LeftSlot sport="SOCCER" orgId={Number(orgId)} />}
        right={<OrgSwitcher />}
      />
      <SportTab sport={SPORT_TYPE} />
      <div className="flex flex-1 flex-col pb-navbar-height">{children}</div>
      <NavigationBar sport={SPORT_TYPE} />
    </div>
  );
};

export default MainLayout;

/* ----- presets ----- */

interface LeftSlotProps extends ComponentProps<typeof Header.LinkLogo> {}

const LeftSlot = ({ sport, orgId }: LeftSlotProps) => {
  return (
    <div className="flex items-center gap-3">
      <Header.LinkLogo sport={sport} orgId={orgId} />

      <ErrorBoundary fallback={null}>
        <Suspense clientOnly fallback={<Skeleton className="w-14" />}>
          <OrgName />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
