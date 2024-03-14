import { ArrowDownIcon, SendIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { UseMutateFunction } from '@tanstack/react-query';
import axios from 'axios';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { GameCheerTalkPayload, GameTeamType } from '@/types/game';

import * as styles from './Form.css';

type CheerTalkFormProps = {
  gameTeams: GameTeamType[];
  saveCheerTalkMutate: UseMutateFunction<
    void,
    Error,
    GameCheerTalkPayload,
    unknown
  >;
  scrollToBottom: () => void;
};

const CheerTalkForm = ({
  gameTeams,
  saveCheerTalkMutate,
  scrollToBottom,
}: CheerTalkFormProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedTeamId, setSelectedTeamId] = useState<number>(
    gameTeams[0].gameTeamId,
  );

  const handleCheerTalkSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      if (!inputValue.trim()) return;

      saveCheerTalkMutate(
        {
          gameTeamId: selectedTeamId,
          content: inputValue,
        },
        {
          onSuccess: () => scrollToBottom(),
          onError: error => {
            if (axios.isAxiosError(error) && error.response?.status === 400)
              alert(error.response.data.message);
          },
        },
      );

      setInputValue('');
    },
    [inputValue, saveCheerTalkMutate, selectedTeamId, scrollToBottom],
  );

  const handleRadioClick = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setSelectedTeamId(Number(e.target.value));
    },
    [],
  );

  return (
    <form className={styles.form} onSubmit={handleCheerTalkSubmit}>
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
          aria-label="응원 메시지 입력"
        />
        <button className={styles.cheerTalkSendButton} type="submit">
          <Icon source={SendIcon} className={styles.cheerTalkSendIcon} />
        </button>
      </div>
      <button
        className={styles.scrollToBottomButton}
        onClick={scrollToBottom}
        type="button"
      >
        <Icon source={ArrowDownIcon} className={styles.scrollToBottomIcon} />
      </button>
    </form>
  );
};

export default CheerTalkForm;
