import { ChatIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

import * as styles from './Fallback.css';

export default function CheerTalkFallback() {
  return (
    <div className={styles.empty.root}>
      <div className={styles.empty.iconWrapper}>
        <Icon source={ChatIcon} size="xs" color="white" />
      </div>
      <div className={styles.empty.talkBox}>응원톡에 들어가 여러분의 팀을 응원해보세요! 🙌</div>
    </div>
  );
}
