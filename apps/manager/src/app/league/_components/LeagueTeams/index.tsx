import { Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@hcc/ui';

import * as styles from './style.css';

interface Team {
  id: string;
  name: string;
}

interface LeagueTeamsProps {
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

export default function LeagueTeams({
  teamOptions,
  onTeamChange,
  onLineupEdit,
  onStep2Click,
  onStep2Focus,
  onStep2Blur,
  selectedTeamsState,
  setSelectedTeamsState,
}: LeagueTeamsProps) {
  return (
    <section onClick={onStep2Click} onBlur={onStep2Blur} tabIndex={0}>
      <h2 className={styles.TeamsTitle}>참가 팀</h2>
      <div>
        {[0, 1].map((idx) => (
          <div key={idx}>
            <Select
              value={selectedTeamsState[idx] || ''}
              onValueChange={(value) => {
                const newTeams = [...selectedTeamsState];
                newTeams[idx] = value;
                setSelectedTeamsState(newTeams);
                onTeamChange(idx, value);
              }}
              onOpenChange={(open) => {
                if (open) {
                  onStep2Focus();
                } else {
                  onStep2Blur();
                }
              }}
            >
              <SelectTrigger onFocus={onStep2Focus}>
                <SelectValue placeholder={`팀 선택 ${idx + 1}`} />
                <Button
                  className={styles.LineupButton}
                  colorScheme="primary"
                  disabled={!selectedTeamsState[idx]}
                  onClick={() => onLineupEdit(idx)}
                >
                  + 라인업 수정
                </Button>
              </SelectTrigger>
              <SelectContent>
                {teamOptions.map((team: Team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </section>
  );
}
