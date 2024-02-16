import { Tooltip } from '@hcc/ui';
import { ButtonHTMLAttributes } from 'react';

import * as styles from '@/components/cheertalk/styles.css';

interface CheerTalkEntryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  tooltipVisible: boolean;
}

const CheerTalkEntryButton = ({
  tooltipVisible,
  ...props
}: CheerTalkEntryButtonProps) => {
  return (
    <div className={styles.cheerTalkEntryContainer}>
      <Tooltip
        content="당신의 팀을 응원하는 톡을 남겨보세요!"
        position="top"
        isVisible={tooltipVisible}
        arrowPosition="rightEnd"
      >
        <div className={styles.cheerTalkEntryButtonContent}>
          <button className={styles.cheerTalkEntryButton} {...props} />
        </div>
      </Tooltip>
    </div>
  );
};

export default CheerTalkEntryButton;
