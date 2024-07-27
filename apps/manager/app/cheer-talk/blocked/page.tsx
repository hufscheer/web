'use client';
import { Button, useToast } from '@hcc/ui';

import Layout from '@/components/Layout';

import CheerTalkList from '../_components/CheerTalkList';
import { cheerTalks } from '../_components/CheerTalkList/constants';

export default function Page() {
  const { toast } = useToast();

  const ActionButton = (cheerTalkId: number) => {
    return (
      <Button
        colorScheme="accentPrimary"
        size="xs"
        fullWidth
        onClick={() =>
          toast({ title: `${cheerTalkId} 응원톡을 가리기 해제했어요` })
        }
      >
        가리기 해제
      </Button>
    );
  };

  return (
    <Layout navigationTitle="가린 응원톡 관리">
      <CheerTalkList cheerTalks={cheerTalks} ActionButton={ActionButton} />
    </Layout>
  );
}
