'use client';

import { Button, toast } from '@hcc/ui';
import { useEffect, useState } from 'react';
import { type CheerTalkType, useUpdateCheerTalkBlock, useUpdateCheerTalkUnblock } from '~/api';
import { AlertDialog } from '~/components/ui';
import CheerTalkCard from './cheertalk-card';

type CheerTalkListProps = {
  cheerTalks: CheerTalkType[];
  status: 'all' | 'reported' | 'blocked';
};

export const CheerTalkList = ({ cheerTalks, status }: CheerTalkListProps) => {
  const { mutate: block } = useUpdateCheerTalkBlock();
  const { mutate: unblock } = useUpdateCheerTalkUnblock();
  const [lastAccessedAt, setLastAccessedAt] = useState<string>(new Date(0).toISOString());

  useEffect(() => {
    const storageKey = 'cheerTalkLastAccessedAt';
    const storedTime = localStorage.getItem(storageKey);
    if (storedTime) {
      setLastAccessedAt(storedTime);
    }
    return () => {
      localStorage.setItem(storageKey, new Date().toISOString());
    };
  }, []);

  const handleHide = (cheerTalk: CheerTalkType) => {
    block(
      { leagueId: cheerTalk.leagueId, cheerTalkId: cheerTalk.cheerTalkId },
      {
        onSuccess: () => {
          toast.success('응원톡을 가렸어요');
        },
        onError: () => {
          toast.error('오류가 발생했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  const handleUnhide = (cheerTalk: CheerTalkType) => {
    unblock(
      { leagueId: cheerTalk.leagueId, cheerTalkId: cheerTalk.cheerTalkId },
      {
        onSuccess: () => {
          toast.success('응원톡을 복구했어요.');
        },
        onError: () => {
          toast.error('오류가 발생했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  const renderActions = (cheerTalk: CheerTalkType) => {
    switch (status) {
      case 'all':
        return (
          <Button
            className="flex-1"
            color="danger"
            variant="subtle"
            size="sm"
            onClick={() => handleHide(cheerTalk)}
          >
            채팅 가리기
          </Button>
        );
      case 'reported':
        return (
          <>
            <Button
              className="flex-1"
              color="danger"
              variant="subtle"
              size="sm"
              onClick={() => handleHide(cheerTalk)}
            >
              채팅 가리기
            </Button>
            <Button
              className="flex-1"
              color="primary"
              variant="subtle"
              size="sm"
              onClick={() => handleUnhide(cheerTalk)}
            >
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
              onPrimaryClick={() => handleUnhide(cheerTalk)}
            >
              <Button className="w-full" color="primary" variant="subtle" size="sm" asChild>
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
          <CheerTalkCard cheerTalk={cheerTalk} lastAccessedAt={lastAccessedAt} />
          <div className="flex w-full items-center gap-2">{renderActions(cheerTalk)}</div>
        </div>
      ))}
    </div>
  );
};
