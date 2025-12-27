'use client';

import { useMemo, useState } from 'react';
import { CalendarGrid } from './calendar-grid';
import { GameCard } from './GameCard';
import { useSuspenseGameSearch } from '~/api';

export const CalendarOverview = () => {
  const [current, setCurrent] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());

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
    setCurrent(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const goNext = () => {
    setCurrent(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const filteredGames = useMemo(() => {
    if (!selectedDay) return [];
    return games.filter(game => {
      const gameDate = new Date(game.startTime);
      return (
        gameDate.getFullYear() === year &&
        gameDate.getMonth() === month &&
        gameDate.getDate() === selectedDay
      );
    });
  }, [games, selectedDay, year, month]);

  const gameDates = useMemo(() => {
    return Array.from(new Set(games.map(game => new Date(game.startTime).getDate())));
  }, [games]);
  return (
    <div className="flex w-full flex-col gap-4 p-5">
      <CalendarGrid
        year={year}
        month={month}
        days={days}
        gameDates={gameDates}
        selectedDay={selectedDay}
        onDayClick={setSelectedDay}
        onPrev={goPrev}
        onNext={goNext}
      />

      <div className="flex flex-col gap-2">
        {filteredGames.length > 0 ? (
          <>
            <GameCard.Header league={games[0]} className="px-1 py-2" />
            {filteredGames.map(game => (
              <GameCard.Match
                key={game.gameId}
                status={game.state}
                time={game.startTime.split('T')[1].substring(0, 5)}
                round={game.gameName}
                team1={game.gameTeams[0]}
                team2={game.gameTeams[1]}
              />
            ))}
          </>
        ) : (
          <div className="py-10 text-center text-neutral-400">해당 날짜에 경기가 없습니다.</div>
        )}
      </div>
    </div>
  );
};
