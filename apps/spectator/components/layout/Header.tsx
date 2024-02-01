'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Icon } from '@/components/common/Icon';

import * as styles from './Header.css';

export default function Header() {
  const [, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <header className={styles.header.wrapper}>
      <div>
        <Link href="/" className={styles.header.logoWrapper}>
          <span className={styles.header.logoContent}>
            <Icon iconName="hcc" width={75} height="100%" />
          </span>
        </Link>
      </div>
      <div>
        <button onClick={toggleSidebar}>
          <Icon
            iconName="hamburgerMenu"
            width={30}
            height="100%"
            className={styles.header.hamburgerMenu}
          />
        </button>
      </div>
    </header>
  );
}
