import { clsx } from 'clsx';
import { ReactNode } from 'react';

import Header from '@/components/Layout/Header';

import * as styles from './styles.css';

type LayoutProps = {
  children: ReactNode;
  arrowVisible?: boolean;
};

const Layout = ({ children, arrowVisible = true }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header arrowVisible={arrowVisible} />
      <main className={clsx(styles.main)}>{children}</main>
    </div>
  );
};

export default Layout;
