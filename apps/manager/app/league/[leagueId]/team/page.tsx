'use client';

import { Button } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import AddButton from '@/components/AddButton';
import Layout from '@/components/Layout';

export default function Page() {
  const [edit, setEdit] = useState(false);
  const pathname = usePathname();

  const handleClickMenuButton = () => {
    setEdit(prev => !prev);
  };

  return (
    <Layout
      navigationTitle="대회 팀 관리"
      navigationMenu={
        <Button variant="subtle" onClick={handleClickMenuButton}>
          {edit ? '완료' : '편집'}
        </Button>
      }
    >
      <AddButton
        component={Link}
        href={{
          pathname: `${pathname}register`,
        }}
      >
        신규 대회 팀 추가
      </AddButton>
    </Layout>
  );
}
