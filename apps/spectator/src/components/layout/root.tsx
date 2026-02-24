import type { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="column-center-x mx-auto h-full w-full max-w-[var(--app-max-width)] bg-white">
      <main className="flex h-full min-h-max w-full flex-col bg-white">{children}</main>
    </div>
  );
};
