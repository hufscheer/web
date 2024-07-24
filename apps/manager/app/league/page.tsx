'use client';
import { useLeaguesDetail } from '@hcc/api';
import { Suspense } from 'react';

import Divider from '@/components/Divider';
import Layout from '@/components/Layout';

import LeagueCard from './_components/LeagueCard';

export default function Page() {
  const { data: leagues } = useLeaguesDetail('2024');
  return (
    <Layout navigationTitle="대회 관리">
      <Divider height={5} />

      <Suspense>
        <LeagueCard leagues={leagues} />
      </Suspense>
    </Layout>
  );
}
