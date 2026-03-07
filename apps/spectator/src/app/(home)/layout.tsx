import '@hcc/ui/styles.css';
import '~/styles/globals.css';

import type { PropsWithChildren } from 'react';

import { Header } from '~/components/layout';
import { CalendarMenu } from './_components/calendar-menu';
import { TabHeader } from './_components/tab-header';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header menu={<CalendarMenu />} />

      <TabHeader>{children}</TabHeader>
    </>
  );
};

export default RootLayout;
