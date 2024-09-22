'use client';
import { useDeleteLeague, useLeague, useUpdateLeague } from '@hcc/api';
import { toast } from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  leagueDefaultValues,
  LeagueForm,
  leagueFormSchema,
  LeagueFormSchema,
} from '@/app/league/_components/LeagueForm';
import AlertDialog from '@/components/AlertDialog';
import Layout from '@/components/Layout';
import Tip from '@/components/Tip';
import { formatTime } from '@/utils/time';

type PageProps = {
  params: { leagueId: string };
};

const DeleteButton = ({ onAction }: { onAction: () => void }) => {
  return (
    <AlertDialog
      title="삭제한 대회는 다시 복구할 수 없어요"
      description="정말 삭제할까요?"
      primaryActionLabel="삭제"
      secondaryActionLabel="취소"
      onPrimaryAction={onAction}
    >
      <button>대회 삭제</button>
    </AlertDialog>
  );
};

export default function Page({ params }: PageProps) {
  const leagueId: string = params.leagueId;

  const router = useRouter();

  const { data: league } = useLeague(leagueId);

  const methods = useForm<LeagueFormSchema>({
    resolver: zodResolver(leagueFormSchema),
    defaultValues: leagueDefaultValues,
  });

  const { mutate: updateLeagueMutation } = useUpdateLeague();

  const onSubmit = (data: LeagueFormSchema) => {
    const { leagueName, round, startDate, endDate } = data;
    updateLeagueMutation(
      {
        leagueId,
        name: leagueName,
        maxRound: `${round}강`,
        startAt: formatTime(startDate, 'YYYY-MM-DDTHH:mm:ss'),
        endAt: formatTime(endDate, 'YYYY-MM-DDTHH:mm:ss'),
      },
      {
        onSuccess: () => {
          toast({ title: '팀 정보가 수정되었습니다', variant: 'destructive' });
        },
        onError: () => {
          toast({
            title: '팀 정보 수정에 실패했습니다',
            variant: 'destructive',
          });
        },
      },
    );
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

  const { mutate: deleteLeagueMutation } = useDeleteLeague();
  const handleDelete = () => {
    deleteLeagueMutation(
      { leagueId },
      {
        onSuccess: () => {
          toast({ title: '대회가 삭제되었습니다', variant: 'destructive' });
          router.back();
        },
        onError: () => {
          toast({
            title: '대회 삭제에 실패했습니다',
            variant: 'destructive',
          });
        },
      },
    );
  };

  return (
    <Layout
      navigationTitle="대회 정보 수정"
      navigationMenu={<DeleteButton onAction={handleDelete} />}
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
