'use client';

import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  currentStep: number;
  totalSteps: number;
  steps: string[];
};

export const StepProgress = ({ currentStep, totalSteps, steps }: Props) => {
  return (
    <nav className="center mb-5" aria-label="폼 진행 단계">
      <div className="center w-full overflow-hidden">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const stepNumber = index + 1;

          return (
            <Fragment key={step}>
              <div className="center gap-1.5">
                <button
                  type="button"
                  className={twMerge(
                    'center h-6 w-6 rounded-full border font-medium text-xs transition-colors duration-150',
                    isCompleted
                      ? 'border-green-500 bg-green-500 text-white'
                      : isCurrent
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-neutral-300 bg-neutral-200 text-neutral-500',
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`${step} ${isCompleted ? '완료됨' : isCurrent ? '현재 단계' : '대기 중'}`}
                  disabled={!isCurrent && !isCompleted}
                >
                  {isCompleted ? (
                    <span aria-hidden="true">✓</span>
                  ) : (
                    <span aria-hidden="true">{stepNumber}</span>
                  )}
                </button>
                <span
                  className={twMerge(
                    'whitespace-nowrap text-sm transition-colors duration-150',
                    isCurrent ? 'font-medium text-neutral-900' : 'text-neutral-500',
                  )}
                >
                  {step}
                </span>
                <span className="sr-only">
                  {isCompleted
                    ? `${step} 단계 완료`
                    : isCurrent
                      ? `${step} 단계 진행 중`
                      : `${step} 단계 대기 중`}
                </span>
              </div>

              {index < totalSteps - 1 && (
                <div className="flex-1 px-4" aria-hidden="true">
                  <div className="h-px bg-neutral-300 transition-colors duration-200" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      <div className="sr-only">
        전체 {totalSteps}단계 중 {currentStep + 1}단계 진행 중
      </div>
    </nav>
  );
};
