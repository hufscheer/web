'use client';

import { HccIcon, PeopleIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Link from 'next/link';

import * as styles from './Header.css';

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <Link
        href={'/'}
        aria-label="홈페이지로 이동"
        className={styles.logoContainer}
      >
        <Icon
          source={HccIcon}
          size={58}
          height={41}
          color="black"
          aria-label="훕치치"
        />
        <p className={styles.subtitle}>매니저</p>
      </Link>
      <Link href={'/profile'} className={styles.logoContainer}>
        <Icon source={PeopleIcon} size="md" color="black" />
      </Link>
    </header>
  );
}
