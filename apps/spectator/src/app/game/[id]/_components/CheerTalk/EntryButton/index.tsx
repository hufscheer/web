import { ChatIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { ComponentProps } from 'react';

import * as styles from './EntryButton.css';

export default function CheerTalkEntryButton(props: ComponentProps<'button'>) {
  return (
    <div className={styles.entryContainer}>
      <span className={styles.entryButton} aria-label="응원톡 열기" {...props}>
        <Icon source={ChatIcon} className={styles.entryButtonIcon} />
      </span>
    </div>
  );
}
