import { ChatIcon } from '@hcc/icons';
import { Icon, Tooltip } from '@hcc/ui';
import { useEffect, useState, ComponentProps } from 'react';

import * as styles from './EntryButton.css';

export default function CheerTalkEntryButton({
  ...props
}: ComponentProps<'button'>) {
  const [isCheerTalkTooltipVisible, setIsCheerTalkTooltipVisible] =
    useState(true);

  useEffect(() => {
    const storedValue = window.localStorage.getItem('cheertalk');
    if (storedValue) {
      setIsCheerTalkTooltipVisible(JSON.parse(storedValue));
    }
  }, []);

  const handleButtonClick = () => {
    setIsCheerTalkTooltipVisible(false);
    window.localStorage.setItem('cheertalk', JSON.stringify(false));
  };

  return (
    <div className={styles.entryContainer}>
      <Tooltip
        content="당신의 팀을 응원하는 톡을 남겨보세요!"
        position="top"
        isVisible={isCheerTalkTooltipVisible}
        arrowPosition="rightEnd"
      >
        <div className={styles.entryButtonContent}>
          <button
            className={styles.entryButton}
            onClick={handleButtonClick}
            {...props}
          >
            <Icon source={ChatIcon} className={styles.entryButtonIcon} />
          </button>
        </div>
      </Tooltip>
    </div>
  );
}
