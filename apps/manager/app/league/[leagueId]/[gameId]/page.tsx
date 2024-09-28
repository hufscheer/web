'use client';
import { useGame } from '@hcc/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import AlertDialog from '@/components/AlertDialog';
import Layout from '@/components/Layout';
import { formatTime } from '@/utils/time';

import {
  gameDefaultValues,
  GameForm,
  gameFormSchema,
  GameFormSchema,
} from '../_components/GameForm';

type PageProps = {
  params: { leagueId: string; gameId: string };
};

const DeleteButton = ({ onAction }: { onAction: () => void }) => {
  return (
    <AlertDialog
      title="삭제한 경기는 다시 복구할 수 없어요"
      description="정말 삭제할까요?"
      primaryActionLabel="삭제"
      secondaryActionLabel="취소"
      onPrimaryAction={onAction}
    >
      <button>경기 삭제</button>
    </AlertDialog>
  );
};

export default function Page({ params }: PageProps) {
  const { data: game } = useGame(params.gameId);

  const methods = useForm<GameFormSchema>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: gameDefaultValues,
  });

  useEffect(() => {
    if (game) {
      methods.reset({
        name: game.gameName,
        round:
          game.round.toString() === 'FINAL'
            ? '결승'
            : game.round.toString().replace('ROUND_', '') + '강',
        quarter: game.gameQuarter,
        startDate: new Date(formatTime(new Date(game.startTime), 'YYYY-MM-DD')),
        startTime: formatTime(new Date(game.startTime), 'HH:mm'),
        idOfTeam1: game.gameTeams[0]?.gameTeamId.toString() || '',
        idOfTeam2: game.gameTeams[1]?.gameTeamId.toString() || '',
        videoId: game.videoId,
      });
    }
  }, [game, methods]);

  const onSubmit = (data: GameFormSchema) => {
    alert(data);
  };

  const handleDelete = () => {};

  return (
    <Layout
      navigationTitle="경기 정보"
      navigationMenu={<DeleteButton onAction={handleDelete} />}
    >
      <GameForm
        leagueId={params.leagueId}
        gameId={params.gameId}
        methods={methods}
        submitText="수정 완료"
        onSubmit={onSubmit}
        type="UPDATE"
      />
    </Layout>
  );
}
