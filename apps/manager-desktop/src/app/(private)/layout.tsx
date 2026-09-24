import type { PropsWithChildren } from 'react';

import { CommandPalette } from '~/components/layout/command-palette';
import { Sidebar } from '~/components/layout/sidebar';

const PrivateLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">{children}</main>
      </div>
      <CommandPalette />
    </>
  );
};

export default PrivateLayout;
