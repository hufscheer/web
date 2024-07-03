'use client';

import { ArrowLeftIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import * as styles from './Navigation.css';

type NavigationProps = {
  navigationTitle?: string;
  navigationMenu?: ReactNode;
};
export default function Navigation({
  navigationTitle,
  navigationMenu,
}: NavigationProps) {
  const router = useRouter();

  return (
    <nav className={styles.wrapper}>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <Icon source={ArrowLeftIcon} size={14} />
        </button>
        {navigationTitle && <p className={styles.title}>{navigationTitle}</p>}
        {navigationMenu && (
          <span className={styles.menuContainer}>{navigationMenu}</span>
        )}
      </div>
    </nav>
  );
}
