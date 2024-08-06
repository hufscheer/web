'use client';
import { useLeague } from '@hcc/api';
import { toast } from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  leagueDefaultValues,
  LeagueForm,
  leagueFormSchema,
  LeagueFormSchema,
} from '@/app/league/_components/LeagueForm';
import Layout from '@/components/Layout';
import Tip from '@/components/Tip';

type PageProps = {
  params: { leagueId: string };
};

export default function Page({ params }: PageProps) {
  const leagueId: string = params.leagueId;

  const { data: league } = useLeague(leagueId);

  const methods = useForm<LeagueFormSchema>({
    resolver: zodResolver(leagueFormSchema),
    defaultValues: leagueDefaultValues,
  });

  const onSubmit = (data: LeagueFormSchema) => {
    toast({
      title: '대회 정보 수정 메시지',
      description: JSON.stringify(data),
    });
    // TODO: API 호출 구현 필요
  };

  useEffect(() => {
    if (league) {
      methods.reset({
        leagueName: league.name,
        startDate: new Date(league.startAt),
        endDate: new Date(league.endAt),
        round: league.maxRound.toString().replace('강', ''),
      });
    }
  }, [league, methods]);

  return (
    <Layout
      navigationTitle="대회 정보 수정"
      navigationMenu={
        <button onClick={() => alert(`${leagueId} 삭제`)}>대회 삭제</button>
      }
    >
      <LeagueForm
        methods={methods}
        submitText="수정사항 저장"
        onSubmit={onSubmit}
      />
      <Tip
        title="🙌🏻 대회에 팀을 추가하는 방법"
        description="참가 팀 관리 탭에서 팀 생성과 편집을 할 수 있어요."
      />
    </Layout>
  );
}
