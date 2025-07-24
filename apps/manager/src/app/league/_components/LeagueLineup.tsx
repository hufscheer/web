import * as styles from '../_components/LeagueTeams/style.css';

interface Team {
  id: string;
  name: string;
}

interface LeagueLineupProps {
  teamOptions: Team[];
  onTeamChange: (index: number, value: string) => void;
  onLineupEdit: (index: number) => void;
  selectedTeams: string[];
  onStep2Click: () => void;
  onStep2Focus: () => void;
  onStep2Blur: () => void;
  selectedTeamsState: string[];
  setSelectedTeamsState: (teams: string[]) => void;
}

export default function LeagueLineup({ onStep2Click, onStep2Blur }: LeagueLineupProps) {
  return (
    <section onClick={onStep2Click} onBlur={onStep2Blur} tabIndex={0}>
      <h2 className={styles.TeamsTitle}>선발</h2>
      <div></div>
    </section>
  );
}
