'use client';

import { HccIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Link from 'next/link';
import { ReactNode } from 'react';

import * as styles from './styles.css';

type HeaderProps = {
  menu?: ReactNode;
};

export default function Header({ menu }: HeaderProps) {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <Link
          href={'/'}
          aria-label="홈페이지로 이동"
          className={styles.logoLink}
        >
          <Icon
            source={HccIcon}
            size={52}
            height={37}
            color="black"
            aria-label="훕치치"
          />
          <p className={styles.logoSubtitle}>매니저</p>
        </Link>
        {menu && <span className={styles.menuContainer}>{menu}</span>}
      </div>
    </header>
  );
}
