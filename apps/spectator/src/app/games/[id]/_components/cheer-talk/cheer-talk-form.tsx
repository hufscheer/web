import { SendFillIcon } from '@hcc/icons';
import { type FormEvent, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { type GameStateType, type GameTeamType, useCreateCheerTalk } from '~/api';

interface CheerTalkFormProps {
  gameTeams: GameTeamType[];
  scrollToBottom: () => void;
  gameState: GameStateType;
}

export const CheerTalkForm = ({ gameTeams, scrollToBottom, gameState }: CheerTalkFormProps) => {
  const { mutate } = useCreateCheerTalk();
  const [message, setMessage] = useState('');
  const [teamId, setTeamId] = useState(gameTeams[0]?.gameTeamId ?? 0);

  const isFinished = gameState === 'FINISHED';
  const canSubmit = message.trim() && !isFinished;

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!canSubmit) return;

      mutate({ gameTeamId: teamId, content: message }, { onSuccess: () => scrollToBottom() });

      setMessage('');
    },
    [canSubmit, mutate, teamId, message, scrollToBottom],
  );

  const placeholder = isFinished
    ? '경기가 종료되어 응원톡을 남길 수 없습니다.'
    : '응원톡을 남겨보세요!';

  if (gameTeams.length === 0) return null;

  return (
    <form className="column w-full gap-1 bg-white p-4" onSubmit={handleSubmit}>
      <fieldset className="center-y gap-2" disabled={isFinished}>
        {gameTeams.map(team => (
          <label className="center-y gap-1 font-medium text-xs" key={team.gameTeamId}>
            <input
              type="radio"
              checked={teamId === team.gameTeamId}
              value={team.gameTeamId}
              onChange={e => setTeamId(Number(e.target.value))}
              disabled={isFinished}
            />
            {team.gameTeamName}
          </label>
        ))}
      </fieldset>

      <div className="center-y w-full gap-2">
        <input
          className="w-full rounded-lg bg-neutral-100 px-3 py-2 font-medium text-sm"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={placeholder}
          aria-label="응원 메시지 입력"
          disabled={isFinished}
        />
        <button
          className={twMerge(
            'cursor-pointer rounded-full bg-transparent p-1 text-[var(--color-primary-500)] transition-colors duration-150 ease-in-out',
            'hover:bg-neutral-100 disabled:cursor-not-allowed disabled:text-[var(--color-primary-200)] disabled:hover:bg-transparent',
          )}
          type="submit"
          disabled={!canSubmit}
        >
          <SendFillIcon size={24} />
        </button>
      </div>
    </form>
  );
};
