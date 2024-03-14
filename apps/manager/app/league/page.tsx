'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import AddButton from '@/components/AddButton';
import Layout from '@/components/Layout';

import LeagueCard from './_components/LeagueCard';

export default function Page() {
  const pathname = usePathname();

  return (
    <Layout navigationTitle="대회 관리">
      <LeagueCard title="진행 중" />
      <AddButton
        component={Link}
        href={{ pathname: `${pathname}/register`, query: { type: 'playing' } }}
      >
        신규 대회 추가
      </AddButton>
      <LeagueCard title="예정" />
      <AddButton onClick={() => {}}>신규 대회 추가</AddButton>
      <LeagueCard title="종료" />
      <AddButton onClick={() => {}}>신규 대회 추가</AddButton>
    </Layout>
  );
}
