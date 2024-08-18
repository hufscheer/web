'use client';
import { Button, useToast } from '@hcc/ui';

import AlertDialog from '@/components/AlertDialog';
import Layout from '@/components/Layout';

import CheerTalkList from '../_components/CheerTalkList';
import { cheerTalks } from '../_components/CheerTalkList/constants';

export default function Page() {
  const { toast } = useToast();

  const ActionButton = (cheerTalkId: number) => {
    return (
      <AlertDialog
        title="해당 채팅 가리기를 해제 할게요"
        description="가리기 해제 시 채팅이 응원톡에 노출됩니다."
        primaryActionLabel="해제"
        secondaryActionLabel="취소"
        onPrimaryAction={() =>
          toast({
            title: `${cheerTalkId} 응원톡을 복구했어요`,
            variant: 'destructive',
          })
        }
      >
        <Button colorScheme="primary" size="xs" fullWidth>
          가리기 해제
        </Button>
      </AlertDialog>
    );
  };

  return (
    <Layout navigationTitle="가린 응원톡 관리">
      <CheerTalkList cheerTalks={cheerTalks} ActionButton={ActionButton} />
    </Layout>
  );
}
