import type { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="column-center-x mx-auto w-full max-w-[var(--app-max-width)] flex-1 overflow-hidden">
      <main className="column-center-y h-full w-full">{children}</main>
    </div>
  );
};
