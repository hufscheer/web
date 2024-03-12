'use client';

import AddButton from '@/components/AddButton';

import LeagueCard from './_components/LeagueCard';

export default function Page() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <LeagueCard title="진행 중" />
      <AddButton onClick={() => {}}>신규 대회 추가</AddButton>
      <LeagueCard title="예정" />
      <AddButton onClick={() => {}}>신규 대회 추가</AddButton>
      <LeagueCard title="종료" />
      <AddButton onClick={() => {}}>신규 대회 추가</AddButton>
    </div>
  );
}
