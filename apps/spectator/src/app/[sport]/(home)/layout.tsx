import '@hcc/ui/styles.css';
import '~/styles/globals.css';
import type { PropsWithChildren } from 'react';

import { Header } from '~/components/layout';

import { NavigationBar } from './_components/navigation-bar';
import { SchoolSelect } from './_components/school-select';

type Props = PropsWithChildren;

const RootLayout = ({ children }: Props) => {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <Header center={<SchoolSelect />} />

      <div className="flex flex-1 flex-col pb-navbar-height">{children}</div>

      <NavigationBar />
    </div>
  );
};

export default RootLayout;
