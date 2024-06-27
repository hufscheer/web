import { ReactNode } from 'react';

import Navigation from '@/components/Layout/Navigation';

import Header from './Header';
import * as styles from './Layout.css';

type LayoutProps = {
  children: ReactNode;
  headerVisible?: boolean;
  navigationVisible?: boolean;
  navigationTitle?: string;
  navigationMenu?: ReactNode;
};

export default function Layout({
  children,
  headerVisible = true,
  navigationVisible = true,
  navigationTitle,
  navigationMenu,
}: LayoutProps) {
  return (
    <div className={styles.wrapper}>
      {headerVisible && <Header />}
      {navigationVisible && (
        <Navigation
          navigationTitle={navigationTitle}
          navigationMenu={navigationMenu}
        />
      )}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
