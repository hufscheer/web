import { UseMutateFunction } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';
import { MatchCommentPayload, MatchTeamType } from '@/types/match';

import * as styles from './CommentForm.css';

type CommentFormProps = {
  matchId: string;
  matchTeams: MatchTeamType[];
  mutate: UseMutateFunction<void, Error, MatchCommentPayload, unknown>;
  scrollToBottom: () => void;
};

export default function CommentForm({
  matchId,
  matchTeams,
  mutate,
  scrollToBottom,
}: CommentFormProps) {
  const [inputValue, setInputValue] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState<number>(
    matchTeams[0].gameTeamId,
  );

  const handleCommentSubmit = (
    e: FormEvent<HTMLFormElement>,
    payload: MatchCommentPayload,
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
            gameTeamId: Number(matchId),
            content: inputValue,
          })
        }
      >
        <fieldset className={styles.radioBox.wrapper}>
          {matchTeams.map(team => (
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
