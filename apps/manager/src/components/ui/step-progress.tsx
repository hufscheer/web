'use client';

import { Fragment } from 'react';
import { CheckSmallIcon } from '@hcc/icons';
import clsx from 'clsx';

type StepProgressProps = {
  steps: string[];
  currentStep: number;
};

export const StepProgress = ({ steps, currentStep }: StepProgressProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <Fragment key={step}>
            <div className="flex flex-row items-center gap-2">
              <div
                className={clsx(
                  'flex h-6 w-6 items-center justify-center rounded-full border font-semibold text-sm transition-all',
                  {
                    // 완료된 단계 (체크 아이콘)
                    'bg-white text-blue-600': isCompleted,
                    // 현재 활성 단계
                    'bg-blue-500 text-white': isActive,
                    // 비활성 단계
                    'border-gray-300 bg-gray-400 text-white': !isCompleted && !isActive,
                  },
                )}
              >
                {isCompleted ? <CheckSmallIcon width={20} height={20} /> : stepNumber}
              </div>
              <span className={'whitespace-nowrap text-black text-sm'}>{step}</span>
            </div>

            {stepNumber < steps.length && <div className="h-px flex-grow bg-gray-300" />}
          </Fragment>
        );
      })}
    </div>
  );
};
