import { Form } from '@hcc/ui';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

import {
  LeagueDate,
  LeagueRound,
  LeagueStatus,
  LeagueName,
  LeagueQuater,
} from './newLeagueFormComponent';
import * as styles from './style.css';
import { LeagueFormSchema } from '../LeagueForm/types';

type LeagueInfoProps = {
  methods: UseFormReturn<LeagueFormSchema>;
  onSubmit: SubmitHandler<LeagueFormSchema>;
  submitText: string;
  onStep1Click: () => void;
  onStep1Focus: () => void;
  onStep1Blur: () => void;
};

export default function LeagueInfo({
  methods,
  onStep1Click,
  onStep1Focus,
  onStep1Blur,
}: LeagueInfoProps) {
  return (
    <Form {...methods}>
      <div
        className={styles.progressFirst}
        onClick={onStep1Click}
        onFocus={onStep1Focus}
        onBlur={onStep1Blur}
        tabIndex={0}
      >
        <h1 className={styles.progressFirstTitle}>경기 정보</h1>

        {/* 명칭 */}
        <LeagueName methods={methods} />
        {/* 라운드 */}
        <LeagueRound methods={methods} />
        {/* 쿼터 */}
        <LeagueQuater methods={methods} />
        {/* 상황 */}
        <LeagueStatus methods={methods} />
        {/* 시작 일시 */}
        <LeagueDate methods={methods} />
      </div>
    </Form>
  );
}
