'use client';

import { Spinner } from '@hcc/ui';
import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { Drawer } from 'vaul';

import { BasketballBottomButton, type BasketballBottomSheetType } from './basketball-bottom-button';
import { BasketballTimeline } from './basketball-timeline';

const BasketballAddScoreSheet = lazy(() => import('./sheets/BasketballAddScoreSheet'));
const BasketballStatusChangeSheet = lazy(() => import('./sheets/BasketballStatusChangeSheet'));
const BasketballSubstituteSheet = lazy(() => import('./sheets/BasketballSubstituteSheet'));
const BasketballFoulSheet = lazy(() => import('./sheets/BasketballFoulSheet'));

export default function TimelineClient({ leagueId, gameId }: { leagueId: number; gameId: number }) {
  const [activeSheet, setActiveSheet] = useState<BasketballBottomSheetType | null>(null);
  const close = useCallback(() => setActiveSheet(null), []);

  const sheetMap = useMemo(
    () => ({
      addScore: {
        title: '득점 추가',
        node: <BasketballAddScoreSheet leagueId={leagueId} gameId={gameId} onClose={close} />,
      },
      changeStatus: {
        title: '상태 변경',
        node: <BasketballStatusChangeSheet leagueId={leagueId} gameId={gameId} onClose={close} />,
      },
      substitute: {
        title: '교체 추가',
        node: <BasketballSubstituteSheet leagueId={leagueId} gameId={gameId} onClose={close} />,
      },
      foul: {
        title: '파울 추가',
        node: <BasketballFoulSheet leagueId={leagueId} gameId={gameId} onClose={close} />,
      },
    }),
    [leagueId, gameId, close],
  );

  const title = activeSheet ? sheetMap[activeSheet].title : null;
  const content = activeSheet ? sheetMap[activeSheet].node : null;

  return (
    <>
      <div className="flex h-full flex-col justify-between bg-white">
        <BasketballTimeline gameId={gameId} />
        <BasketballBottomButton leagueId={leagueId} gameId={gameId} onOpen={setActiveSheet} />
      </div>
      <Drawer.Root
        open={activeSheet !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) close();
        }}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
          <Drawer.Content className="fixed right-0 bottom-0 left-0 z-50 mt-24 flex h-[90%] flex-col rounded-t-lg bg-white">
            <div className="flex-1 rounded-t-lg">
              <div className="mx-auto my-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
              {title && (
                <Drawer.Title className="mb-4 px-5 text-start text-2xl font-semibold">
                  {title}
                </Drawer.Title>
              )}
              <div className="h-full overflow-y-auto">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center">
                      <Spinner />
                    </div>
                  }
                >
                  {content}
                </Suspense>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
