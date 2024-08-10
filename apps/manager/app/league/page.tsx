'use client';
import Link from 'next/link';
import { Suspense } from 'react';

import Divider from '@/components/Divider';
import Layout from '@/components/Layout';

import LeagueCard from './_components/LeagueCard';

export default function Page() {
  return (
    <Layout
      navigationTitle="대회 관리"
      navigationMenu={<Link href={`/league/register`}>대회 생성</Link>}
    >
      <Divider height={5} />

      <Suspense>
        <LeagueCard />
      </Suspense>
    </Layout>
  );
}
