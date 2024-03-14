'use client';

import { Button } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Layout from '@/components/Layout';
import useLeagueDetailQuery from '@/hooks/queries/useLeagueDetailQuery';

import LeagueDetailForm from './_components/Forms';

export default function LeagueDetail() {
  const [edit, setEdit] = useState(false);
  const params = useParams();
  const leagueId = params.leagueId;
  const { data: league } = useLeagueDetailQuery(Number(leagueId));
  const buttonRef = useRef(() => {});

  useEffect(() => {
    if (!buttonRef.current) return;

    const handleClick = () => {
      setEdit(!edit);
    };

    buttonRef.current = handleClick;
  }, [edit]);

  if (!league) return null;

  const RightButton = () => (
    <Button variant="subtle" size="compact-md" onClick={buttonRef.current}>
      {edit ? '완료' : '편집'}
    </Button>
  );

  return (
    <Layout navigationTitle={'대회 정보 관리'} navigationMenu={<RightButton />}>
      <LeagueDetailForm league={league} edit={edit} buttonRef={buttonRef} />
    </Layout>
  );
}
