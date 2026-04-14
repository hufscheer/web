import '@hcc/ui/styles.css';
import '~/styles/globals.css';
import type { PropsWithChildren } from 'react';

import { Header } from '~/components/layout';

import { CalendarMenu } from './_components/calendar-menu';
import { NavigationBar } from './_components/navigation-bar';
import { SchoolSelect } from './_components/school-select';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative">
      <Header center={<SchoolSelect />} menu={<CalendarMenu />} />

      <div className="flex flex-1 flex-col pb-navbar-height">{children}</div>

      <NavigationBar />
    </div>
  );
};

export default RootLayout;
