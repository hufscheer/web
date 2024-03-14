import { ReactNode } from 'react';

import Navigation from '@/components/Layout/Navigation';

import Footer from './Footer';
import Header from './Header';
import * as styles from './Layout.css';

type LayoutProps = {
  children: ReactNode;
  headerVisible?: boolean;
  navigationVisible?: boolean;
  navigationTitle?: string;
  navigationMenu?: ReactNode;
  footerVisible?: boolean;
};

export default function Layout({
  children,
  headerVisible = true,
  navigationVisible = true,
  navigationTitle,
  navigationMenu,
  footerVisible = true,
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
      {footerVisible && <Footer />}
    </div>
  );
}
