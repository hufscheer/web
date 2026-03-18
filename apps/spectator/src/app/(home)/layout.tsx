import '@hcc/ui/styles.css';
import '~/styles/globals.css';
import type { PropsWithChildren } from 'react';

import { Header } from '~/components/layout';

import { CalendarMenu } from './_components/calendar-menu';
import { NavigationBar } from './_components/navigation-bar';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative">
      <Header menu={<CalendarMenu />} />

      <div className="pb-(--hcc-navbar-height)">{children}</div>

      <NavigationBar />
    </div>
  );
};

export default RootLayout;
