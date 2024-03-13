import { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import * as styles from './Layout.css';

type LayoutProps = {
  children: ReactNode;
  headerVisible?: boolean;
  footerVisible?: boolean;
};

export default function Layout({
  children,
  headerVisible = true,
  footerVisible = true,
}: LayoutProps) {
  return (
    <div className={styles.wrapper}>
      {headerVisible && <Header />}
      <main className={styles.main}>{children}</main>
      {footerVisible && <Footer />}
    </div>
  );
}
