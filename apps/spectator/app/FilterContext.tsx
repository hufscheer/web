import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

type FilterContextType = {
  year: number | null;
  league: number | null;
  sport: number | null;
  maxRound: number | null;
  round: number | null;
  leagueTeam: number | null;
  setYear: (year: number) => void;
  setLeague: (league: number | null) => void;
  setSport: (sport: number | null) => void;
  setMaxRound: (maxRound: number | null) => void;
  setRound: (round: number | null) => void;
  setLeagueTeam: (leagueTeam: number | null) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const params = useSearchParams();

  const [year, setYear] = useState<number | null>(null);
  const [league, setLeague] = useState<number | null>(null);
  const [sport, setSport] = useState<number | null>(null);
  const [maxRound, setMaxRound] = useState<number | null>(null);
  const [round, setRound] = useState<number | null>(null);
  const [leagueTeam, setLeagueTeam] = useState<number | null>(null);

  useEffect(() => {
    setYear(Number(params.get('year')) || dayjs().year());
    setLeague(Number(params.get('league')));
    setSport(Number(params.get('sport')));
    setRound(Number(params.get('round')));
    setLeagueTeam(Number(params.get('team')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <FilterContext.Provider
      value={{
        year,
        league,
        sport,
        maxRound,
        round,
        leagueTeam,
        setYear,
        setLeague,
        setSport,
        setMaxRound,
        setRound,
        setLeagueTeam,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
