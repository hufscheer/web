'use client';

import { HccIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Link from 'next/link';

import * as styles from './Header.css';
import Sidebar from '../Sidebar';

export default function Header() {
  return (
    <header className={styles.header.wrapper}>
      <Link href="/">
        <span className={styles.header.logoContent}>
          <Icon source={HccIcon} size={58} height={41} color="primary" />
        </span>
      </Link>
      <Sidebar />
    </header>
  );
}
