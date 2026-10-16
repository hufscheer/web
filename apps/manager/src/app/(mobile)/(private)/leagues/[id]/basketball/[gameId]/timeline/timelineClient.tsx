'use client';

import { lazy } from 'react';

import { TimelineSheetContainer } from '../../../_components/timeline/timeline-sheet-container';
import {
  type TimelineSheetRegistry,
  useTimelineSheet,
} from '../../../_components/timeline/use-timeline-sheet';
import { BasketballBottomButton } from './basketball-bottom-button';
import { BasketballTimeline } from './basketball-timeline';

const BASKETBALL_SHEETS = {
  addScore: {
    title: '득점 추가',
    Component: lazy(() => import('./sheets/BasketballAddScoreSheet')),
  },
  changeStatus: {
    title: '상태 변경',
    Component: lazy(
      () => import('../../../_components/timeline/sheets/status-change/StatusChangeSheet'),
    ),
  },
  substitute: {
    title: '교체 추가',
    Component: lazy(() => import('./sheets/substitute/BasketballSubstituteSheet')),
  },
  foul: {
    title: '파울 추가',
    Component: lazy(() => import('./sheets/foul/BasketballFoulSheet')),
  },
} satisfies TimelineSheetRegistry<'addScore' | 'changeStatus' | 'substitute' | 'foul'>;

export default function TimelineClient({ leagueId, gameId }: { leagueId: number; gameId: number }) {
  const sheet = useTimelineSheet(BASKETBALL_SHEETS);
  const ActiveSheet = sheet.active?.Component;

  return (
    <>
      <div className="flex h-full flex-col justify-between bg-white">
        <BasketballTimeline gameId={gameId} />
        <BasketballBottomButton leagueId={leagueId} gameId={gameId} onOpen={sheet.open} />
      </div>
      <TimelineSheetContainer
        open={sheet.isOpen}
        onOpenChange={(open) => {
          if (!open) sheet.close();
        }}
        title={sheet.active?.title}
      >
        {ActiveSheet && <ActiveSheet leagueId={leagueId} gameId={gameId} onClose={sheet.close} />}
      </TimelineSheetContainer>
    </>
  );
}
