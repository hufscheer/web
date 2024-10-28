'use client';
import { useLeagueCheerTalkBlocked, useUpdateCheerTalkUnblock } from '@hcc/api';
import { Button, useToast } from '@hcc/ui';
import { Suspense } from 'react';

import AlertDialog from '@/components/AlertDialog';
import Layout from '@/components/Layout';

import CheerTalkList from '../_components/CheerTalkList';

type PageProps = {
  params: { leagueId: string };
};

export default function Page({ params }: PageProps) {
  const { toast } = useToast();
  const { mutate: updateCheerTalkUnblock, isPending } =
    useUpdateCheerTalkUnblock();

  const ActionButton = (cheerTalkId: number) => {
    return (
      <AlertDialog
        title="해당 채팅 가리기를 해제 할게요"
        description="가리기 해제 시 채팅이 응원톡에 노출됩니다."
        primaryActionLabel="해제"
        secondaryActionLabel="취소"
        onPrimaryAction={() => {
          if (isPending) return;

          updateCheerTalkUnblock(
            { leagueId: params.leagueId, cheerTalkId },
            {
              onSuccess: () =>
                toast({ title: '응원톡을 복구했어요', variant: 'destructive' }),
            },
          );
        }}
      >
        <Button colorScheme="blue" size="xs" fullWidth>
          가리기 해제
        </Button>
      </AlertDialog>
    );
  };

  const BlockedCheerTalkList = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useLeagueCheerTalkBlocked(params.leagueId);

    return (
      <CheerTalkList
        cheerTalks={data.pages}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        ActionButton={ActionButton}
      />
    );
  };

  return (
    <Layout navigationTitle="가린 응원톡 관리">
      <Suspense fallback={null}>
        <BlockedCheerTalkList />
      </Suspense>
    </Layout>
  );
}
