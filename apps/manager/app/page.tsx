'use client';

import Link from 'next/link';
import { Suspense } from 'react';

import Layout from '@/components/Layout';
import useLeagueQuery from '@/hooks/queries/useLeagueQuery';

import PlayingCard from './_components/PlayingCard';

export default function Page() {
  const { data: leagues } = useLeagueQuery();

  return (
    <Layout navigationVisible={false}>
      <Suspense fallback={<div>로딩</div>}>
        <PlayingCard leagues={leagues.playing} />
      </Suspense>

      <Link
        href={{ pathname: '/login', query: { redirectPath: 'redirectUrl' } }}
      >
        로그인 페이지로
      </Link>
    </Layout>
  );
}
