'use client';
import { useCreateLeague } from '@hcc/api';
import { toast } from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import Layout from '@/components/Layout';
import Tip from '@/components/Tip';
import { formatTime } from '@/utils/time';

import {
  leagueDefaultValues,
  LeagueForm,
  leagueFormSchema,
  LeagueFormSchema,
} from '../_components/LeagueForm';

export default function Page() {
  const router = useRouter();

  const methods = useForm<LeagueFormSchema>({
    resolver: zodResolver(leagueFormSchema),
    defaultValues: leagueDefaultValues,
  });

  const { mutate: createLeague, isPending } = useCreateLeague();

  const onSubmit = (data: LeagueFormSchema) => {
    if (isPending) return;

    const { leagueName, round, startDate, endDate } = data;
    createLeague(
      {
        name: leagueName,
        maxRound: Number(round),
        startAt: formatTime(startDate, 'YYYY-MM-DDTHH:mm:ss'),
        endAt: formatTime(endDate, 'YYYY-MM-DDT23:59:59'),
      },
      {
        onSuccess: () => {
          toast({ title: '대회가 생성되었습니다', variant: 'destructive' });
          router.back();
        },
        onError: () => {
          toast({
            title: '대회 생성에 실패했습니다',
            variant: 'destructive',
          });
        },
      },
    );
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
