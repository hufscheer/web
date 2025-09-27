'use client';

import { useState, useCallback, Suspense, lazy, useMemo } from 'react';
import { BottomSheet } from '@hcc/ui';
import { BottomButton, type BottomSheetType } from '../../_components/timeline-tab/bottom-button';
import { Timeline } from '../../_components/timeline';

const AddScoreSheet = lazy(() => import('../../_components/timeline-tab/sheets/AddScoreSheet'));
const StatusChangeSheet = lazy(() => import('../../_components/timeline-tab/sheets/AddScoreSheet'));
const SubstituteSheet = lazy(() => import('../../_components/timeline-tab/sheets/AddScoreSheet'));
const WarningSheet = lazy(() => import('../../_components/timeline-tab/sheets/AddScoreSheet'));
const CheerTalkSheet = lazy(() => import('../../_components/timeline-tab/sheets/AddScoreSheet'));

export default function TimelineClient({ gameId }: { gameId: number }) {
  const [activeSheet, setActiveSheet] = useState<BottomSheetType | null>(null);
  const close = useCallback(() => setActiveSheet(null), []);

  const sheetMap = useMemo(
    () => ({
      addScore: {
        title: '득점 추가',
        node: <AddScoreSheet gameId={gameId} onClose={close} />,
      },
      changeStatus: {
        title: '상태 변경',
        node: <StatusChangeSheet gameId={gameId} onClose={close} />,
      },
      substitute: {
        title: '교체',
        node: <SubstituteSheet gameId={gameId} onClose={close} />,
      },
      warning: {
        title: '경고',
        node: <WarningSheet gameId={gameId} onClose={close} />,
      },
      cheerTalk: {
        title: '응원톡',
        node: <CheerTalkSheet gameId={gameId} onClose={close} />,
      },
    }),
    [gameId, close],
  );

  const title = activeSheet ? sheetMap[activeSheet].title : null;
  const content = activeSheet ? sheetMap[activeSheet].node : null;

  return (
    <>
      <div className="column-between h-full overflow-y-auto bg-white">
        <Timeline gameId={gameId} />
        <BottomButton onOpen={setActiveSheet} />
      </div>
      <BottomSheet
        open={activeSheet !== null}
        onOpenChange={isOpen => {
          if (!isOpen) close();
        }}
      >
        <BottomSheet.Portal>
          <BottomSheet.Content>
            {title && <BottomSheet.Title>{title}</BottomSheet.Title>}
            <Suspense fallback={<div>로딩 중...</div>}>{content}</Suspense>
          </BottomSheet.Content>
        </BottomSheet.Portal>
      </BottomSheet>
    </>
  );
}
