import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import Header from '@/src/components/Layout/Header';

import * as styles from './styles.css';

type LayoutProps = ComponentProps<'div'> & {
  className?: string;
  arrowVisible?: boolean;
};

const Layout = ({ className, children, arrowVisible = true }: LayoutProps) => {
  return (
    <div className={styles.root}>
      <Header arrowVisible={arrowVisible} />
      <main className={clsx(className, styles.main)}>{children}</main>
    </div>
  );
};

export default Layout;
