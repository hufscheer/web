import { ArrowDownIcon, SendIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { UseMutateFunction } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { GameCheerTalkPayload, GameTeamType } from '@/types/game';

import * as styles from './CheerTalkForm.css';

interface CheerTalkFormProps {
  gameId: string;
  gameTeams: GameTeamType[];
  mutate: UseMutateFunction<void, Error, GameCheerTalkPayload, unknown>;
  scrollToBottom: () => void;
}

const CheerTalkForm = ({
  gameId,
  gameTeams,
  mutate,
  scrollToBottom,
}: CheerTalkFormProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedTeamId, setSelectedTeamId] = useState<number>(
    gameTeams[0].gameTeamId,
  );

  const handleCheerTalkSubmit = (
    e: FormEvent<HTMLFormElement>,
    payload: GameCheerTalkPayload,
  ): void => {
    e.preventDefault();

    if (!payload.content.trim()) return;

    mutate({ ...payload, gameTeamId: selectedTeamId });
    setInputValue('');
    scrollToBottom();
  };

  const handleRadioClick = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setSelectedTeamId(Number(e.target.value));
    },
    [],
  );

  return (
    <form
      className={styles.form}
      onSubmit={e =>
        handleCheerTalkSubmit(e, {
          gameTeamId: Number(gameId),
          content: inputValue,
        })
      }
    >
      <fieldset className={styles.radioBox}>
        {gameTeams.map(team => (
          <label key={team.gameTeamId} className={styles.radioField}>
            <input
              type="radio"
              checked={selectedTeamId === team.gameTeamId}
              value={team.gameTeamId}
              onChange={handleRadioClick}
              className={styles.radioInput}
            />
            {team.gameTeamName}
          </label>
        ))}
      </fieldset>
      <div className={styles.cheerTalkInputContainer}>
        <input
          className={styles.cheerTalkInput}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="응원톡을 남겨보세요!"
        />
        <button className={styles.cheerTalkSendButton}>
          <Icon source={SendIcon} className={styles.cheerTalkSendIcon} />
        </button>
      </div>
      <button className={styles.scrollToBottomButton} onClick={scrollToBottom}>
        <Icon source={ArrowDownIcon} className={styles.scrollToBottomIcon} />
      </button>
    </form>
  );
};

export default CheerTalkForm;
