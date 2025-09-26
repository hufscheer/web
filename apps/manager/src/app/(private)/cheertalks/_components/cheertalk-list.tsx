'use client';

import { Button, toast } from '@hcc/ui';
import { AlertDialog } from '~/components/ui';
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
  cheerTalks: CheerTalk[];
  status: 'all' | 'reported' | 'blocked';
};

export const CheertalkList = ({ cheerTalks, status }: CheerTalkListProps) => {
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
          <Button color="danger" variant="subtle" className="flex-1" onClick={handleHide}>
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
          <div className="flex-1 [&_button]:w-full">
            <AlertDialog
              title="해당 채팅 가리기를 해제할게요"
              description="가리기 해제 시 채팅이 응원톡에 노출됩니다."
              primaryTitle="해제"
              secondaryTitle="취소"
              onPrimaryClick={handleUnhide}
            >
              <Button asChild color="primary" variant="subtle" className="w-full">
                <span>가리기 해제</span>
              </Button>
            </AlertDialog>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {cheerTalks.map(cheerTalk => (
        <div key={cheerTalk.cheerTalkId} className="flex flex-col gap-2">
          <CheerTalkCard cheerTalk={cheerTalk} />{' '}
          <div className="flex w-full items-center gap-2">{renderActions()}</div>
        </div>
      ))}
    </div>
  );
};
