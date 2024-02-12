'use client';

import { HamburgerIcon, HccIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Link from 'next/link';
import { useState } from 'react';

import * as styles from './Header.css';

export default function Header() {
  const [, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <header className={styles.header.wrapper}>
      <div>
        <Link href="/" className={styles.header.logoWrapper}>
          <span className={styles.header.logoContent}>
            <Icon source={HccIcon} size={75} />
          </span>
        </Link>
      </div>
      <div>
        <button onClick={toggleSidebar}>
          <Icon
            source={HamburgerIcon}
            size={30}
            className={styles.header.hamburgerMenu}
          />
        </button>
      </div>
    </header>
  );
}
