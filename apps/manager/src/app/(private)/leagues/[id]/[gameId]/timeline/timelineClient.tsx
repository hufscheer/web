'use client';

import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { Drawer } from 'vaul';
import { Timeline } from '../../_components/timeline';
import { BottomButton, type BottomSheetType } from '../../_components/timeline-tab/bottom-button';

const AddScoreSheet = lazy(() => import('../../_components/timeline-tab/sheets/AddScoreSheet'));
const StatusChangeSheet = lazy(
  () => import('../../_components/timeline-tab/sheets/StatusChangeSheet'),
);
const SubstituteSheet = lazy(() => import('../../_components/timeline-tab/sheets/SubstituteSheet'));
const WarningSheet = lazy(() => import('../../_components/timeline-tab/sheets/WarningSheet'));

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
        title: '교체 추가',
        node: <SubstituteSheet gameId={gameId} onClose={close} />,
      },
      warning: {
        title: '경고 추가',
        node: <WarningSheet gameId={gameId} onClose={close} />,
      },
    }),
    [gameId, close],
  );

  const title = activeSheet ? sheetMap[activeSheet].title : null;
  const content = activeSheet ? sheetMap[activeSheet].node : null;

  return (
    <>
      <div className="flex h-full flex-col justify-between bg-white">
        <Timeline gameId={gameId} />
        <BottomButton onOpen={setActiveSheet} />
      </div>
      <Drawer.Root
        open={activeSheet !== null}
        onOpenChange={isOpen => {
          if (!isOpen) close();
        }}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
          <Drawer.Content className="fixed right-0 bottom-0 left-0 z-50 mt-24 flex h-[90%] flex-col rounded-t-lg bg-white">
            <div className="flex-1 rounded-t-lg">
              <div className="mx-auto my-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
              {title && (
                <Drawer.Title className="mb-4 px-5 text-start font-semibold text-2xl">
                  {title}
                </Drawer.Title>
              )}
              <div className="h-full overflow-y-auto">
                <Suspense fallback={<div className="p-5">로딩 중...</div>}>{content}</Suspense>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
