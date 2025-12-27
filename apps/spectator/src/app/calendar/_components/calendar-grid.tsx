'use client';

import { ChevronForwardIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import { twMerge } from 'tailwind-merge';

interface CalendarGridProps {
  year: number;
  month: number;
  days: (number | null)[];
  selectedDay: number | null;
  onDayClick: (day: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const CalendarGrid = ({
  year,
  month,
  days,
  selectedDay,
  onDayClick,
  onPrev,
  onNext,
}: CalendarGridProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={onPrev}
          aria-label="이전 달"
          className="rounded-full p-1 transition-colors hover:bg-neutral-100"
        >
          <ChevronForwardIcon size={20} className="rotate-180 text-primary-600" />
        </button>

        <Typography fontSize={18} weight="bold">
          {year}년 {month + 1}월
        </Typography>

        <button
          type="button"
          onClick={onNext}
          aria-label="다음 달"
          className="rounded-full p-1 transition-colors hover:bg-neutral-100"
        >
          <ChevronForwardIcon size={20} className="text-primary-600" />
        </button>
      </div>

      {/* Grid Content */}
      <div className="rounded-lg border border-gray-100 bg-white p-4">
        <div className="grid grid-cols-7 gap-2 text-center text-neutral-500 text-sm">
          {['일', '월', '화', '수', '목', '금', '토'].map(d => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-3">
          {days.map((d, i) => {
            const isSelected = d === selectedDay;
            return (
              <div key={d ? `date-${year}-${month}-${d}` : `empty-${i}`} className="h-10">
                {d ? (
                  <div className="center mx-auto h-10 w-10">
                    <button
                      type="button"
                      onClick={() => onDayClick(d)}
                      className={twMerge(
                        'center h-10 w-10 rounded-full text-sm transition-all',
                        isSelected
                          ? 'bg-blue-600 font-bold text-white shadow-md'
                          : 'hover:bg-neutral-100',
                      )}
                    >
                      {d}
                    </button>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
