import { UseMutateFunction } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';

import { GameCommentPayload, GameTeamType } from '@/types/game';

import * as styles from './CommentForm.css';

type CommentFormProps = {
  gameId: string;
  gameTeams: GameTeamType[];
  mutate: UseMutateFunction<void, Error, GameCommentPayload, unknown>;
  scrollToBottom: () => void;
};

export default function CommentForm({
  gameId,
  gameTeams,
  mutate,
  scrollToBottom,
}: CommentFormProps) {
  const [inputValue, setInputValue] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState<number>(
    gameTeams[0].gameTeamId,
  );

  const handleCommentSubmit = (
    e: FormEvent<HTMLFormElement>,
    payload: GameCommentPayload,
  ) => {
    e.preventDefault();

    if (!payload.content.trim()) return;

    mutate({ ...payload, gameTeamId: selectedTeamId });
    setInputValue('');
    scrollToBottom();
  };

  const handleRadioClick = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedTeamId(Number(e.target.value));
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={e =>
          handleCommentSubmit(e, {
            gameTeamId: Number(gameId),
            content: inputValue,
          })
        }
      >
        <fieldset className={styles.radioBox.wrapper}>
          {gameTeams.map(team => (
            <label key={team.gameTeamId} className={styles.radioBox.label}>
              <input
                type="radio"
                checked={selectedTeamId === team.gameTeamId}
                value={team.gameTeamId}
                onChange={handleRadioClick}
                className={styles.radioBox.input}
              />
              🙋
              <div
                className={
                  styles.radioBoxColor[(team.order - 1) as styles.RadioBoxColor]
                }
              ></div>
            </label>
          ))}
        </fieldset>

        <div className={styles.comment.wrapper}>
          <input
            className={styles.comment.input}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="응원하는 팀에 댓글을 남겨보세요!"
          />
          <button className={styles.comment.button}>댓글</button>
        </div>
      </form>
    </>
  );
}
