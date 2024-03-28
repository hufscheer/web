'use client';

import { HamburgerIcon } from '@hcc/icons';
import { theme } from '@hcc/styles';
import { Icon, Modal } from '@hcc/ui';
import { useRef } from 'react';

import * as styles from './Sidebar.css';
import AsyncBoundary from '../AsyncBoundary';
import LeagueList from '../LeagueList';
import LeagueListSkeleton from '../LeagueList/Skeleton';

export default function Sidebar() {
  const ref = useRef<HTMLButtonElement>(null);
  const handleClose = () => {
    ref.current?.click();
  };

  return (
    <Modal>
      <Modal.Trigger className={styles.openIconButton}>
        <Icon
          source={HamburgerIcon}
          aria-label="메뉴 열기"
          role="button"
          size={20}
        />
      </Modal.Trigger>
      <Modal.Content
        key="sidebar"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { x: theme.sizes.appWidth },
          visible: { x: 0 },
        }}
        transition={{ type: 'just' }}
        aria-label="Sidebar"
        className={styles.sidebar}
      >
        <div className={styles.sidebarHeader}>
          <span>대회 목록</span>
          <Modal.Close ref={ref} className={styles.close} />
        </div>

        <AsyncBoundary
          errorFallback={() => <div>에러</div>}
          loadingFallback={<LeagueListSkeleton />}
        >
          <LeagueList handleClose={handleClose} />
        </AsyncBoundary>
      </Modal.Content>
    </Modal>
  );
}
