'use client';

import { Button, toast } from '@hcc/ui';
import CheerTalkCard from './cheertalkCard';

type CheerTalk = {
  cheerTalkId: number;
  content: string;
  gameTeamId: number;
  createdAt: string;
  isBlocked: boolean;
  leagueName: string;
  gameName: string;
};

type CheerTalkListProps = {
  cheerTalk: CheerTalk;
  status: 'all' | 'reported' | 'blocked';
};

export const CheertalkList = ({ cheerTalk, status }: CheerTalkListProps) => {
  const handleHide = () => {
    toast.success('응원톡을 가렸어요');
  };

  const handleUnhide = () => {
    toast.success('응원톡을 복구했어요.');
  };

  const renderActions = () => {
    switch (status) {
      case 'all':
        return (
          <Button color="danger" variant="subtle" onClick={handleHide}>
            채팅 가리기
          </Button>
        );
      case 'reported':
        return (
          <>
            <Button color="danger" variant="subtle" className="flex-1" onClick={handleHide}>
              채팅 가리기
            </Button>
            <Button color="primary" variant="subtle" className="flex-1">
              신고 취소하기
            </Button>
          </>
        );
      case 'blocked':
        return (
          <Button color="primary" variant="subtle" onClick={handleUnhide}>
            가리기 해제
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <CheerTalkCard cheerTalk={cheerTalk} />
      <div className="flex w-full items-center gap-2">{renderActions()}</div>
    </div>
  );
};
