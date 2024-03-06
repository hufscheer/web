'use client';

import { HccIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Link from 'next/link';

import * as styles from './Header.css';
import Sidebar from '../Sidebar';

export default function Header() {
  return (
    <header className={styles.header.wrapper}>
      <div>
        <Link href="/" className={styles.header.logoWrapper}>
          <span className={styles.header.logoContent}>
            <Icon source={HccIcon} size={75} />
          </span>
        </Link>
      </div>
      <Sidebar />
    </header>
  );
}
