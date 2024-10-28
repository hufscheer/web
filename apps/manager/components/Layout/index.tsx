import { clsx } from 'clsx';
import { ReactNode } from 'react';

import Navigation from '@/components/Layout/Navigation';

import Header from './Header';
import * as styles from './styles.css';

type LayoutProps = {
  children: ReactNode;
  headerVisible?: boolean;
  navigationVisible?: boolean;
  navigationTitle?: string;
  navigationMenu?: ReactNode;
};

const Layout = ({
  children,
  headerVisible = false,
  navigationVisible = true,
  navigationTitle,
  navigationMenu,
}: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      {headerVisible && <Header menu={navigationMenu} />}

      {navigationVisible && (
        <Navigation title={navigationTitle} menu={navigationMenu} />
      )}

      <main
        className={clsx(styles.main, {
          [styles.mainWithPaddingTop]: headerVisible || navigationVisible,
        })}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
