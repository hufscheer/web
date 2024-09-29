'use client';
import {
  LegacyRoundType,
  useDeleteGame,
  useGame,
  useUpdateGame,
} from '@hcc/api';
import { useToast } from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import AlertDialog from '@/components/AlertDialog';
import Layout from '@/components/Layout';
import { getStateByQuarter, QUARTER_KEY } from '@/constants/games';
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
  const leagueId = params.leagueId;
  const gameId = params.gameId;

  const router = useRouter();
  const { toast } = useToast();

  const { data: game } = useGame(gameId);

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
            : game.round.toString() === 'SEMI_FINAL'
              ? '4강'
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

  const { mutate: updateGameMutation } = useUpdateGame();
  const onSubmit = (data: GameFormSchema) => {
    const quarter = data.quarter as QUARTER_KEY;
    updateGameMutation(
      {
        leagueId,
        gameId,
        name: data.name,
        round: data.round as LegacyRoundType,
        quarter: quarter,
        state: getStateByQuarter(quarter),
        startTime: `${formatTime(data.startDate, 'YYYY-MM-DD')}T${data.startTime}:00`,
        videoId: data.videoId,
      },
      {
        onSuccess: () => {
          toast({
            title: '경기 정보가 수정되었습니다.',
            variant: 'destructive',
          });
          router.back();
        },
        onError: () => {
          toast({
            title: '경기 정보 수정에 실패했습니다.',
            variant: 'destructive',
          });
        },
      },
    );
  };

  const { mutate: deleteGame } = useDeleteGame();
  const handleDelete = () => {
    deleteGame(
      { leagueId, gameId },
      {
        onSuccess: () => {
          toast({ title: '경기가 삭제되었습니다.', variant: 'destructive' });
        },
        onError: () => {
          toast({ title: '경기 삭제에 실패했습니다.', variant: 'destructive' });
        },
      },
    );
  };

  return (
    <Layout
      navigationTitle="경기 정보"
      navigationMenu={<DeleteButton onAction={handleDelete} />}
    >
      <GameForm
        leagueId={leagueId}
        gameId={gameId}
        methods={methods}
        submitText="수정 완료"
        onSubmit={onSubmit}
        type="UPDATE"
      />
    </Layout>
  );
}
