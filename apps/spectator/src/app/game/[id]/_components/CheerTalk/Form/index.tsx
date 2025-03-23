import { GameTeamType, useCreateCheerTalk } from '@hcc/api';
import { SendIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import axios from 'axios';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import * as styles from './Form.css';

type CheerTalkFormProps = {
  gameTeams: GameTeamType[];
  scrollToBottom: () => void;
};

const CheerTalkForm = ({ gameTeams, scrollToBottom }: CheerTalkFormProps) => {
  const { mutate } = useCreateCheerTalk();
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedTeamId, setSelectedTeamId] = useState<number>(gameTeams[0].gameTeamId);

  const handleCheerTalkSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      if (!inputValue.trim()) return;

      mutate(
        {
          gameTeamId: selectedTeamId,
          content: inputValue,
        },
        {
          onSuccess: () => scrollToBottom(),
          onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.status === 400)
              alert(error.response.data.message);
          },
        },
      );

      setInputValue('');
    },
    [inputValue, mutate, selectedTeamId, scrollToBottom],
  );

  const handleRadioClick = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedTeamId(Number(e.target.value));
  }, []);

  return (
    <form className={styles.form} onSubmit={handleCheerTalkSubmit}>
      <fieldset className={styles.radioBox}>
        {gameTeams.map((team) => (
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
        <div className={styles.inputWrapper}>
          <input
            className={styles.cheerTalkInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="응원톡을 남겨보세요!"
            aria-label="응원 메시지 입력"
          />
        </div>
        <button className={styles.cheerTalkSendButton} type="submit">
          <Icon source={SendIcon} size="md" color={inputValue ? 'primary' : 'secondary'} />
        </button>
      </div>
    </form>
  );
};

export default CheerTalkForm;
