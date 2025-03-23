'use client';

import Link from 'next/link';

import Divider from '@/components/Divider';
import Layout from '@/components/Layout';

import MatchOverview from './_components/MatchOverview';

export default function Page() {
  return (
    <Layout
      headerVisible={true}
      navigationVisible={false}
      navigationMenu={<Link href="/league">대회 관리</Link>}
    >
      <Divider height={6} />

      <MatchOverview />
    </Layout>
  );
}
