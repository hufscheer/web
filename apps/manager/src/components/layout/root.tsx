import type { PropsWithChildren } from 'react';
import { Header } from './header';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="column-center-x mx-auto w-full max-w-[var(--app-max-width)] flex-1 bg-white">
      <Header />
      <main className="column-center-y w-full">{children}</main>
    </div>
  );
};
