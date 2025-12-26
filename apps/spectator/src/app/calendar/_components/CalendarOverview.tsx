'use client';
import { ChevronForwardIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import { useMemo, useState } from 'react';

export const CalendarOverview = () => {
  const [current, setCurrent] = useState(() => new Date());

  const year = current.getFullYear();
  const month = current.getMonth(); // 0-based

  const days = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: Array<number | null> = [];
    for (let i = 0; i < firstDayIndex; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [year, month]);

  const goPrev = () => setCurrent(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goNext = () => setCurrent(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const today = new Date();

  return (
    // <Fragment>
    <div>
      {/* Month header */}
      <div className="flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={goPrev}
          aria-label="이전 달"
          className="rounded-full p-1 transition-colors hover:bg-white"
        >
          <ChevronForwardIcon size={20} className="rotate-180 text-primary-600" />
        </button>
        <Typography fontSize={18} weight="bold">
          {year}년 {month + 1}월
        </Typography>
        <button
          type="button"
          onClick={goNext}
          aria-label="다음 달"
          className="rounded-full p-1 transition-colors hover:bg-white"
        >
          <ChevronForwardIcon size={20} className="text-primary-600" />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="rounded-lg border border-gray-100 bg-white p-4">
        <div className="grid grid-cols-7 gap-2 text-center text-neutral-500 text-sm">
          {['일', '월', '화', '수', '목', '금', '토'].map(d => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="mt-3grid grid-cols-7 gap-3">
          {days.map((d, i) => {
            const isToday =
              d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

            return (
              <div key={d ? `date-${d}` : `empty-${i}`} className="h-10">
                {d ? (
                  <div className="center mx-auto h-10 w-10">
                    <div
                      className={
                        isToday
                          ? 'center h-10 w-10 rounded-full bg-blue-600 text-white'
                          : 'center h-10 w-10 rounded-full hover:bg-neutral-100'
                      }
                    >
                      {d}
                    </div>
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
    // </Fragment>
  );
};
