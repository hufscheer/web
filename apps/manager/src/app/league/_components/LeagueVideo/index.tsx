import { Form, Input } from '@hcc/ui';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

import * as styles from './style.css';
import { LeagueFormSchema } from '../LeagueForm/types';

type LeagueVideoProps = {
  methods: UseFormReturn<LeagueFormSchema>;
  onSubmit: SubmitHandler<LeagueFormSchema>;
  submitText: string;
  onStep3Focus: () => void;
  onStep3Blur: () => void;
  onStep3Click: () => void;
  videoUrl: string;
  setVideoUrl: (value: string) => void;
};

export default function LeagueVideo({
  methods,
  onStep3Focus,
  onStep3Blur,
  onStep3Click,
  videoUrl,
  setVideoUrl,
}: LeagueVideoProps) {
  return (
    <Form {...methods}>
      <div
        className={styles.VideoContainer}
        onClick={onStep3Click}
        onBlur={onStep3Blur}
        tabIndex={0}
      >
        <h1 className={styles.Title}>경기 영상</h1>
        <Input
          placeholder="URL을 입력하세요"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          onFocus={onStep3Focus}
          onBlur={onStep3Blur}
        />
      </div>
    </Form>
  );
}
