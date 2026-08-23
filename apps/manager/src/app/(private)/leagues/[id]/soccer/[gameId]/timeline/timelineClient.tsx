'use client';

import { lazy } from 'react';

import { Timeline } from '../../../_components/timeline';
import { BottomButton } from '../../../_components/timeline-tab/bottom-button';
import { TimelineSheetContainer } from '../../../_components/timeline-tab/timeline-sheet-container';
import {
  type TimelineSheetRegistry,
  useTimelineSheet,
} from '../../../_components/timeline-tab/use-timeline-sheet';

const SOCCER_SHEETS = {
  addScore: {
    title: '득점 추가',
    Component: lazy(
      () => import('../../../_components/timeline-tab/sheets/add-score/AddScoreSheet'),
    ),
  },
  changeStatus: {
    title: '상태 변경',
    Component: lazy(
      () => import('../../../_components/timeline-tab/sheets/status-change/StatusChangeSheet'),
    ),
  },
  substitute: {
    title: '교체 추가',
    Component: lazy(
      () => import('../../../_components/timeline-tab/sheets/substitute/SubstituteSheet'),
    ),
  },
  warning: {
    title: '경고 추가',
    Component: lazy(() => import('../../../_components/timeline-tab/sheets/warning/WarningSheet')),
  },
} satisfies TimelineSheetRegistry<'addScore' | 'changeStatus' | 'substitute' | 'warning'>;

export default function TimelineClient({ leagueId, gameId }: { leagueId: number; gameId: number }) {
  const sheet = useTimelineSheet(SOCCER_SHEETS);
  const ActiveSheet = sheet.active?.Component;

  return (
    <>
      <div className="flex h-full flex-col justify-between bg-white">
        <Timeline gameId={gameId} />
        <BottomButton leagueId={leagueId} gameId={gameId} sportType="SOCCER" onOpen={sheet.open} />
      </div>
      <TimelineSheetContainer
        open={sheet.isOpen}
        onOpenChange={sheet.close}
        title={sheet.active?.title}
      >
        {ActiveSheet && <ActiveSheet leagueId={leagueId} gameId={gameId} onClose={sheet.close} />}
      </TimelineSheetContainer>
    </>
  );
}
