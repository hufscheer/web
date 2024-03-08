'use client';

import { HamburgerIcon } from '@hcc/icons';
import { theme } from '@hcc/styles';
import { Icon, Modal } from '@hcc/ui';

import * as styles from './Sidebar.css';
import AsyncBoundary from '../AsyncBoundary';
import LeagueList from '../LeagueList';

export default function Sidebar() {
  return (
    <Modal>
      <Modal.Trigger>
        <Icon
          source={HamburgerIcon}
          aria-label="메뉴 열기"
          role="button"
          size={20}
          color="primary"
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
        style={styles.root}
        className={styles.sidebar}
      >
        <div className={styles.sidebarHeader}>
          <span>대회 목록</span>
          <Modal.Close className={styles.close} />
        </div>

        <AsyncBoundary
          errorFallback={() => <div>에러</div>}
          loadingFallback={<div>스켈레톤</div>}
        >
          <LeagueList />
        </AsyncBoundary>
      </Modal.Content>
    </Modal>
  );
}
