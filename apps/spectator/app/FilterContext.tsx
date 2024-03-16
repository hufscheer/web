import dayjs from 'dayjs';
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

import useQueryParams from '@/hooks/useQueryParams';

interface FilterContextType {
  year: number;
  league: number | null;
  sport: number | null;
  maxRound: number | null;
  round: number | null;
  leagueTeam: number | null;
  setYear: (year: number) => void;
  setLeague: (league: number) => void;
  setSport: (sport: number) => void;
  setMaxRound: (maxRound: number) => void;
  setRound: (round: number) => void;
  setLeagueTeam: (leagueTeam: number) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { params } = useQueryParams();

  const [year, setYear] = useState<number>(
    Number(params.get('year')) || dayjs().year(),
  );
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
