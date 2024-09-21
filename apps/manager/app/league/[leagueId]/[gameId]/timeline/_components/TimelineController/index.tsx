import { AddCircleIcon, SettingsIcon, TradeIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

import * as styles from './TimelineController.css';

const TimelineController = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <button className={styles.controlButton}>
          <Icon source={AddCircleIcon} color="blue" />
          득점 추가
        </button>
        <button className={styles.controlButton}>
          <Icon source={TradeIcon} />
          교체 추가
        </button>
        <button className={styles.controlButton}>
          <Icon source={SettingsIcon} color="secondary" />
          상태 변경
        </button>
      </div>
    </div>
  );
};

export default TimelineController;
