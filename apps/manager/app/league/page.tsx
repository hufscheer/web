'use client';

import { Button, Flex } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import AddButton from '@/components/AddButton';
import Layout from '@/components/Layout';

import LeagueCard from './_components/LeagueCard';

export default function Page() {
  const pathname = usePathname();
  const [edit, setEdit] = useState(false);

  const RightButton = () => (
    <Button
      variant="subtle"
      size="compact-md"
      onClick={() => setEdit(prev => !prev)}
    >
      {edit ? '완료' : '편집'}
    </Button>
  );

  return (
    <Layout navigationTitle="대회 관리" navigationMenu={<RightButton />}>
      <AddButton
        component={Link}
        href={{
          pathname: `${pathname}/register`,
        }}
      >
        신규 대회 추가
      </AddButton>
      <Flex direction="column" gap="xs">
        <LeagueCard state="playing" edit={edit} />
      </Flex>
      <Flex direction="column" gap="xs">
        <LeagueCard state="scheduled" edit={edit} />
      </Flex>
      <LeagueCard state="finished" edit={edit} />
    </Layout>
  );
}
