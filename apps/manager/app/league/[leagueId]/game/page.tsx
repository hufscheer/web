'use client';

import { Button } from '@mantine/core';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';

import Layout from '@/components/Layout';
import useLeagueDetailQuery from '@/hooks/queries/useLeagueDetailQuery';

import GameCard from './_components/GameCard';
import * as styles from './page.css';

export default function Page() {
  const pathname = usePathname();
  const params = useParams();

  const leagueId = Number(params.leagueId as string);
  const { data: league } = useLeagueDetailQuery(leagueId);

  const [edit, setEdit] = useState(false);

  const Menu = () => {
    return (
      <Button variant="subtle" size="compact-md" onClick={() => setEdit(!edit)}>
        {edit ? '완료' : '편집'}
      </Button>
    );
  };

  if (!league) return null;

  return (
    <Layout navigationTitle="대회 경기 관리" navigationMenu={<Menu />}>
      <Button
        component={Link}
        href={`${pathname}register`}
        className={styles.createButton}
      >
        신규 대회 경기 추가
      </Button>
      <GameCard league={league} state="playing" />
      <GameCard league={league} state="scheduled" />
      <GameCard league={league} state="finished" />
    </Layout>
  );
}
