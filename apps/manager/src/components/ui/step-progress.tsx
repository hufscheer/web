'use client';

import { CheckSmallIcon } from '@hcc/icons';
import clsx from 'clsx';
import { Fragment } from 'react';

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
                  'flex h-6 w-6 items-center justify-center rounded-full border text-sm font-semibold transition-all',
                  {
                    // 완료된 단계 (체크 아이콘) or 비활성 단계
                    'bg-gray-400 text-white': !isActive,
                    // 현재 활성 단계
                    'bg-blue-500 text-white': isActive,
                  },
                )}
              >
                {isCompleted ? <CheckSmallIcon width={20} height={20} /> : stepNumber}
              </div>
              <span className={'text-sm whitespace-nowrap text-black'}>{step}</span>
            </div>

            {stepNumber < steps.length && <div className="h-px flex-grow bg-gray-300" />}
          </Fragment>
        );
      })}
    </div>
  );
};
