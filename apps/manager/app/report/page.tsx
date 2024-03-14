'use client';

import Layout from '@/components/Layout';
import { BLOCKED_CAPTION, PENDING_CAPTION } from '@/constants/reportCaption';

import CardList from './_components/CardList';
import { sectionGap } from './page.css';

export default function Page() {
  return (
    <Layout navigationTitle="응원톡 관리">
      <div className={sectionGap}>
        <CardList type="pending" caption={PENDING_CAPTION} />
        <CardList type="isBlocked" caption={BLOCKED_CAPTION} />
      </div>
    </Layout>
  );
}
