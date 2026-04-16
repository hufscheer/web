import '@hcc/ui/styles.css';
import '~/styles/globals.css';
import type { PropsWithChildren } from 'react';

import type { SportType } from '~/api/types';

import { Header } from '~/components/layout';
import { DEFAULT_SPORT, normalizeSportParam } from '~/utils/sport-route';

import { CalendarMenu } from './_components/calendar-menu';
import { NavigationBar } from './_components/navigation-bar';
import { SchoolSelect } from './_components/school-select';

type Props = PropsWithChildren<{ params: Promise<{ sport: string }> }>;

const RootLayout = async ({ children, params }: Props) => {
  const { sport } = await params;
  const sportType: SportType = normalizeSportParam(sport) ?? DEFAULT_SPORT;

  return (
    <div className="relative">
      <Header center={<SchoolSelect />} menu={<CalendarMenu sport={sportType} />} />

      <div className="flex flex-1 flex-col pb-navbar-height">{children}</div>

      <NavigationBar />
    </div>
  );
};

export default RootLayout;
