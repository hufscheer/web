'use client';
import { toast } from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Layout from '@/components/Layout';
import Tip from '@/components/Tip';

import {
  leagueDefaultValues,
  LeagueForm,
  leagueFormSchema,
  LeagueFormSchema,
} from '../_components/LeagueForm';

export default function Page() {
  const methods = useForm<LeagueFormSchema>({
    resolver: zodResolver(leagueFormSchema),
    defaultValues: leagueDefaultValues,
  });

  const onSubmit = (data: LeagueFormSchema) => {
    toast({
      title: '테스트용 대회 생성 메시지',
      description: JSON.stringify(data),
    });
    // TODO: API 호출 구현 필요
  };

  return (
    <Layout navigationTitle="신규 대회 만들기">
      <LeagueForm
        methods={methods}
        submitText="대회 만들기"
        onSubmit={onSubmit}
      />
      <Tip
        title="🙌🏻 새로운 대회에 팀을 추가하는 방법"
        description="신규 대회를 만든 뒤 참가 팀 관리 탭에서 팀 생성과 편집을 할 수 있어요."
      />
    </Layout>
  );
}
