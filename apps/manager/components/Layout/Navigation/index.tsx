'use client';

import { ArrowLeftIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import * as styles from './Navigation.css';

type NavigationProps = {
  title?: string;
  menu?: ReactNode;
};
export default function Navigation({ title, menu }: NavigationProps) {
  const router = useRouter();

  return (
    <nav className={styles.wrapper}>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <Icon source={ArrowLeftIcon} size={14} />
        </button>
        {title && <p className={styles.title}>{title}</p>}
        {menu && <button className={styles.menuContainer}>{menu}</button>}
      </div>
    </nav>
  );
}
