'use client';

import { LegacyRoundType, useCreateGame } from '@hcc/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Layout from '@/components/Layout';
import { getStateByQuarter, QUARTER_KEY } from '@/constants/games';
import { formatTime } from '@/utils/time';

import {
  GameForm,
  gameDefaultValues,
  gameFormSchema,
  GameFormSchema,
} from '../_components/GameForm';

type PageProps = {
  params: { leagueId: string };
};

export default function Page({ params }: PageProps) {
  const leagueId: string = params.leagueId;

  const methods = useForm<GameFormSchema>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: gameDefaultValues,
  });

  const { mutateAsync: createGameMutation } = useCreateGame({ leagueId });

  const onSubmit = async (data: GameFormSchema) => {
    const quarter = data.quarter as QUARTER_KEY;
    await createGameMutation({
      leagueId,
      name: data.name,
      round: data.round as LegacyRoundType,
      quarter: quarter,
      state: getStateByQuarter(quarter),
      startTime: `${formatTime(data.startDate, 'YYYY-MM-DD')}T${data.startTime}:00`,
      idOfTeam1: Number(data.idOfTeam1),
      idOfTeam2: Number(data.idOfTeam2),
      videoId: data.videoId,
    });
  };

  return (
    <Layout navigationTitle="새로운 경기 생성">
      <GameForm
        leagueId={params.leagueId}
        methods={methods}
        submitText="경기 생성"
        onSubmit={onSubmit}
        type="CREATE"
      />
    </Layout>
  );
}
