'use client';
import { useCreateGame } from '@hcc/api';
import { useToast } from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import {
  gameDefaultValues,
  GameForm,
  gameFormSchema,
  GameFormSchema,
} from '@/app/league/[leagueId]/_components/GameForm';
import Layout from '@/components/Layout';
import { getStateByQuarter, QUARTER_KEY } from '@/constants/games';
import { formatTime } from '@/utils/time';

type ComponentProps = {
  leagueId: string;
};

const Component = ({ leagueId }: ComponentProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const methods = useForm<GameFormSchema>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: gameDefaultValues,
  });

  const { mutateAsync: createGameMutation, isPending } = useCreateGame({
    leagueId,
  });

  const onSubmit = async (data: GameFormSchema) => {
    if (isPending) return;

    if (data.idOfTeam1 === data.idOfTeam2) {
      toast({ title: '팀1과 팀2가 같을 수 없습니다', variant: 'destructive' });
      return;
    }

    const quarter = data.quarter as QUARTER_KEY;
    await createGameMutation(
      {
        leagueId,
        name: data.name,
        round: Number(data.round),
        quarter: quarter,
        state: getStateByQuarter(quarter),
        startTime: `${formatTime(data.startDate, 'YYYY-MM-DD')}T${data.startTime}:00`,
        idOfTeam1: Number(data.idOfTeam1),
        idOfTeam2: Number(data.idOfTeam2),
        videoId: data.videoId,
      },
      {
        onSuccess: () => {
          toast({ title: '경기가 생성되었습니다.', variant: 'destructive' });
          router.replace(`/league/${leagueId}`);
        },
        onError: () => {
          toast({ title: '경기 생성에 실패했습니다.', variant: 'destructive' });
        },
      },
    );
  };

  return (
    <Layout navigationTitle="새로운 경기 생성">
      <GameForm
        leagueId={leagueId}
        methods={methods}
        submitText="경기 생성"
        onSubmit={onSubmit}
        type="CREATE"
      />
    </Layout>
  );
};

export default Component;
