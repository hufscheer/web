import { SendFillIcon } from '@hcc/icons';
import { type FormEvent, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { type GameStateType, type GameTeamType, useCreateCheerTalk } from '~/api';

interface CheerTalkFormProps {
  gameTeams: GameTeamType[];
  scrollToBottom: () => void;
  gameState: GameStateType;
  onInputFocus: () => void;
}

const RECOMMENDED_MESSAGES = ['가즈아🔥', '나이스👍', '까비😭️'];

export const CheerTalkForm = ({
  gameTeams,
  scrollToBottom,
  gameState,
  onInputFocus,
}: CheerTalkFormProps) => {
  const { mutate } = useCreateCheerTalk();
  const [message, setMessage] = useState('');
  const [teamId, setTeamId] = useState(gameTeams[0]?.gameTeamId ?? 0);

  const isFinished = gameState === 'FINISHED';
  const canSubmit = message.trim() && !isFinished;

  const handleSubmit = useCallback(
    (e?: FormEvent<HTMLFormElement>, customMessage?: string) => {
      e?.preventDefault();

      const content = customMessage || message;
      if (!content.trim() || isFinished) return;
      mutate({ gameTeamId: teamId, content }, { onSuccess: () => scrollToBottom() });

      setMessage('');
    },
    [isFinished, mutate, teamId, message, scrollToBottom],
  );

  const placeholder = isFinished
    ? '경기가 종료되어 응원톡을 남길 수 없습니다.'
    : '응원톡을 남겨보세요!';

  if (gameTeams.length === 0) return null;
  return (
    <form className="column relative w-full gap-1 bg-[#F7F8FB] px-4 py-3" onSubmit={handleSubmit}>
      <div className="center-y w-full gap-3 overflow-hidden">
        <fieldset
          className="center-y flex-shrink-0 gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5"
          disabled={isFinished}
        >
          {gameTeams.map((team) => (
            <label className="center-y font-Regular gap-1 text-xs" key={team.gameTeamId}>
              <input
                type="radio"
                checked={teamId === team.gameTeamId}
                value={team.gameTeamId}
                onChange={(e) => setTeamId(Number(e.target.value))}
                disabled={isFinished}
              />
              {team.gameTeamName}
            </label>
          ))}
        </fieldset>

        <div className="scrollbar-hide flex gap-1.5 overflow-x-auto py-1">
          {RECOMMENDED_MESSAGES.map((msg) => (
            <button
              key={msg}
              type="button"
              disabled={isFinished}
              onClick={() => handleSubmit(undefined, msg)}
              className={twMerge(
                'flex-shrink-0 whitespace-nowrap rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-Regular text-neutral-600 transition-colors',
                'hover:bg-neutral-50 active:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed',
              )}
            >
              {msg}
            </button>
          ))}
        </div>
      </div>

      <div className="center-y w-full gap-2">
        <input
          className="w-full rounded-3xl border border-neutral-200 bg-neutral-100 px-3 py-2 text-sm font-medium"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={onInputFocus}
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
