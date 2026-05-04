'use client';

import { Suspense } from '@suspensive/react';
import { useState } from 'react';

import { ScoreBoard } from './score-board';

interface ScoreBoardToggleProps {
  gameId: number;
}

export const ScoreBoardToggle = ({ gameId }: ScoreBoardToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={'bg-(--color-primary-100) pb-2'}>
      {isOpen ? (
        <Suspense
          clientOnly
          fallback={<div className="mx-7 h-16 animate-pulse rounded-2xl bg-white" />}
        >
          <ScoreBoard gameId={gameId} />
          <button
            type="button"
            className="w-full py-1 text-center text-xs text-greyscale-300 underline"
            onClick={() => setIsOpen(false)}
          >
            닫기
          </button>
        </Suspense>
      ) : (
        <button
          type="button"
          className="w-full py-2 text-center text-xs text-greyscale-300 underline"
          onClick={() => setIsOpen(true)}
        >
          쿼터별 점수보기
        </button>
      )}
    </div>
  );
};
