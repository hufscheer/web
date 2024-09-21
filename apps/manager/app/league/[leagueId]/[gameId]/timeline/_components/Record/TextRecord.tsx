import { clsx } from 'clsx';
import { ReactNode } from 'react';

import * as styles from './Record.css';

type TextRecordProps = {
  showDividerLine?: boolean;
  children: ReactNode;
};

const TextRecord = ({ showDividerLine = false, children }: TextRecordProps) => {
  return (
    <div
      className={clsx(styles.textRecordContainer, {
        [styles.textRecordCenter]: !showDividerLine,
      })}
    >
      {showDividerLine && <div className={styles.textRecordDivider} />}
      <p className={styles.textRecordText}>{children}</p>
      {showDividerLine && <div className={styles.textRecordDivider} />}
    </div>
  );
};

export default TextRecord;
