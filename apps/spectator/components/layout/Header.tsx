'use client';

import { ArrowBackIcon, NewHccIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import * as styles from './Header.css';
import Sidebar from '../Sidebar';

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header.wrapper}>
      <button
        aria-label="이전 페이지로 이동"
        className={styles.header.logoLink}
        onClick={() => router.back()}
      >
        <Icon source={ArrowBackIcon} color="black" />
      </button>
      <Link
        href="/"
        aria-label="홈페이지로 이동"
        className={styles.header.logoLink}
      >
        <Icon
          width="71.5"
          height="21"
          source={NewHccIcon}
          color="primary"
          aria-label="훕치치"
        />
      </Link>
      <Sidebar />
    </header>
  );
}
