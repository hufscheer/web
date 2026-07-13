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
  gameDates: number[];
}

export const CalendarGrid = ({
  year,
  month,
  days,
  selectedDay,
  onDayClick,
  onPrev,
  onNext,
  gameDates,
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
          <ChevronForwardIcon size={20} className="text-primary-600 rotate-180" />
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
        <div className="grid grid-cols-7 gap-2 text-center text-sm text-neutral-500">
          {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-3">
          {days.map((day, index) => {
            const isSelected = day === selectedDay;
            const hasGame = day !== null && gameDates.includes(day);
            const cellKey = day ? `date-${year}-${month}-${day}` : `empty-${index}`;
            return (
              <div key={cellKey} className="h-10">
                {day ? (
                  <div className="relative flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center">
                      {hasGame && !isSelected && (
                        <div
                          className={twMerge(
                            'absolute top-0 h-1 w-1 translate-y-0.5 rounded-full bg-[#007AFF]',
                          )}
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onDayClick(day)}
                      className={twMerge(
                        'center h-10 w-10 rounded-full text-sm transition-all',
                        isSelected
                          ? 'bg-[#007AFF] font-bold text-white shadow-md'
                          : 'hover:bg-neutral-100',
                      )}
                    >
                      {day}
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
