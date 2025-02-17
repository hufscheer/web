'use client';

import { HamburgerIcon } from '@hcc/icons';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Icon,
} from '@hcc/ui';
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
    <Dialog>
      <DialogTrigger className={styles.openIconButton}>
        <Icon
          source={HamburgerIcon}
          aria-label="메뉴 열기"
          role="button"
          color="black"
          size={24}
        />
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className={styles.sidebar}
          aria-label="sidebar"
          aria-describedby={undefined}
        >
          <DialogHeader className={styles.header}>
            <DialogTitle>대회 목록</DialogTitle>
            <DialogClose ref={ref} className={styles.close} />
          </DialogHeader>

          <AsyncBoundary
            errorFallback={() => <div>에러</div>}
            loadingFallback={<LeagueListSkeleton />}
          >
            <LeagueList handleClose={handleClose} />
          </AsyncBoundary>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
