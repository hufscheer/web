'use client';

import { BLOCKED_CAPTION, PENDING_CAPTION } from '@/constants/reportCaption';

import CardList from './_components/CardList';
import { sectionGap } from './page.css';

export default function Page() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={sectionGap}>
        <CardList type="pending" caption={PENDING_CAPTION} />
        <CardList type="isBlocked" caption={BLOCKED_CAPTION} />
      </div>
    </div>
  );
}
