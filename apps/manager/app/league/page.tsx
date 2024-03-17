'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import AddButton from '@/components/AddButton';
import Layout from '@/components/Layout';

import LeagueCard from './_components/LeagueCard';

export default function Page() {
  const pathname = usePathname();

  const Edit = () => {
    return <button onClick={() => alert('편집')}>편집</button>;
  };

  return (
    <Layout navigationTitle="대회 관리" navigationMenu={<Edit />}>
      <LeagueCard state="playing" />
      <AddButton
        component={Link}
        href={{
          pathname: `${pathname}/register`,
          query: { type: 'playing' },
        }}
      >
        신규 대회 추가
      </AddButton>
      <LeagueCard state="scheduled" />
      <AddButton onClick={() => {}}>신규 대회 추가</AddButton>
      <LeagueCard state="finished" />
      <AddButton onClick={() => {}}>신규 대회 추가</AddButton>
    </Layout>
  );
}
