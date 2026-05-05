'use client';

import * as Collapsible from '@radix-ui/react-collapsible';
import { Suspense } from '@suspensive/react';

import { ScoreBoard } from './score-board';

interface ScoreBoardToggleProps {
  gameId: number;
}

export const ScoreBoardToggle = ({ gameId }: ScoreBoardToggleProps) => (
  <Collapsible.Root className="bg-(--color-primary-100) data-[state=open]:pt-3">
    <Collapsible.Content>
      <Suspense
        clientOnly
        fallback={
          <div className="flex justify-center">
            <div className="w-80 space-y-1 pb-2">
              <div className="h-4 w-1/3 animate-pulse rounded bg-greyscale-50" />
              <div className="h-8 animate-pulse rounded-2xl bg-white" />
              <div className="h-8 animate-pulse rounded-2xl bg-white" />
            </div>
          </div>
        }
      >
        <ScoreBoard gameId={gameId} />
      </Suspense>
    </Collapsible.Content>

    <Collapsible.Trigger className="group w-full items-center px-1.5 py-2.5 text-center text-xs text-greyscale-300 underline">
      <span className="group-data-[state=open]:hidden">쿼터별 점수보기</span>
      <span className="hidden group-data-[state=open]:inline">닫기</span>
    </Collapsible.Trigger>
  </Collapsible.Root>
);
