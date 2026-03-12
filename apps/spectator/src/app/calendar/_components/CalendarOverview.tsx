'use client';

import { useMemo, useState, useTransition } from 'react';

import type { GameType } from '~/api';

import { useSuspenseGameSearch } from '~/api';

import { CalendarGrid } from './calendar-grid';
import { GameCard } from './GameCard';

export const CalendarOverview = () => {
  const [current, setCurrent] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());
  const [isPending, startTransition] = useTransition();
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const year = current.getFullYear();
  const month = current.getMonth();

  const { data: games } = useSuspenseGameSearch({ year, month: month + 1 });

  const days = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: Array<number | null> = [];
    for (let i = 0; i < firstDayIndex; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [year, month]);

  const goPrev = () => {
    setSlideDirection('left');
    startTransition(() => {
      setCurrent(new Date(year, month - 1, 1));
      setSelectedDay(null);
    });
  };

  const goNext = () => {
    setSlideDirection('right');
    startTransition(() => {
      setCurrent(new Date(year, month + 1, 1));
      setSelectedDay(null);
    });
  };

  const { gamesByDate, gameDates } = useMemo(() => {
    const group: Record<number, GameType[]> = {};

    games.forEach((game) => {
      const dateObj = new Date(game.startTime);
      if (dateObj.getFullYear() === year && dateObj.getMonth() === month) {
        const date = dateObj.getDate();
        if (!group[date]) {
          group[date] = [];
        }
        group[date].push(game);
      }
    });

    return {
      gamesByDate: group,
      gameDates: Object.keys(group).map(Number),
    };
  }, [games, year, month]);

  const filteredGames = useMemo(() => {
    if (!selectedDay) return [];
    return gamesByDate[selectedDay] ?? [];
  }, [gamesByDate, selectedDay]);

  return (
    <div className="flex w-full flex-col gap-4 p-5">
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .slide-animate {
          animation: ${slideDirection === 'right' ? 'slideInRight' : 'slideInLeft'}
            0.3s ease-out;
        }
      `}</style>

      <div className={!isPending ? 'slide-animate' : ''}>
        <CalendarGrid
          year={year}
          month={month}
          days={days}
          gameDates={gameDates}
          selectedDay={selectedDay}
          onDayClick={setSelectedDay}
          onPrev={goPrev}
          onNext={goNext}
          isLoading={isPending}
        />
      </div>

      <div className={!isPending ? 'slide-animate' : ''}>
        <div className="flex flex-col gap-2">
          {filteredGames.length > 0 ? (
            <>
              <GameCard.Header league={filteredGames[0]} className="px-1 py-2" />
              {filteredGames.map((game) => (
                <GameCard.Match
                  key={game.gameId}
                  gameId={game.gameId}
                  status={game.state}
                  time={new Date(game.startTime).toTimeString().slice(0, 5)}
                  round={game.gameName}
                  team1={game.gameTeams[0]}
                  team2={game.gameTeams[1]}
                />
              ))}
            </>
          ) : (
            <div className="py-10 text-center text-neutral-400">해당 날짜에 경기가 없어요</div>
          )}
        </div>
      </div>
    </div>
  );
};
