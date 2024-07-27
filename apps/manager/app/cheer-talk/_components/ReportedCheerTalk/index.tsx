import { Button, useToast } from '@hcc/ui';

import CheerTalkList from '../CheerTalkList';
import { cheerTalks } from '../CheerTalkList/constants';

const ReportedCheerTalk = () => {
  const { toast } = useToast();

  const ActionButton = (cheerTalkId: number) => {
    return (
      <Button
        colorScheme="alert"
        size="xs"
        fullWidth
        onClick={() =>
          toast({
            title: `${cheerTalkId} 응원톡을 가렸어요`,
            variant: 'destructive',
          })
        }
      >
        채팅 가리기
      </Button>
    );
  };

  return (
    <>
      <CheerTalkList cheerTalks={cheerTalks} ActionButton={ActionButton} />
      <p>reported</p>
    </>
  );
};

export default ReportedCheerTalk;
