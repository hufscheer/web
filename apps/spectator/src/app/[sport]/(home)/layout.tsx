import '@hcc/ui/styles.css';
import '~/styles/globals.css';
import type { PropsWithChildren } from 'react';

import { ErrorBoundary, Suspense } from '@suspensive/react';

import { Header } from '~/components/layout';
import { Skeleton } from '~/components/skeleton';

import { NavigationBar } from './_components/navigation-bar';
import { OrgName, OrgSwitcher } from './_components/org-switcher';

type Props = PropsWithChildren;

const RootLayout = ({ children }: Props) => {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <Header.Root left={<LeftSlot />} right={<OrgSwitcher />} />
      <div className="flex flex-1 flex-col pb-navbar-height">{children}</div>
      <NavigationBar />
    </div>
  );
};

export default RootLayout;

const LeftSlot = () => {
  return (
    <div className="flex items-center gap-3">
      <Header.LinkLogo />

      <ErrorBoundary fallback={null}>
        <Suspense clientOnly fallback={<Skeleton className="w-14" />}>
          <OrgName />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
