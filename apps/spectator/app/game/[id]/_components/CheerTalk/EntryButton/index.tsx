import { ChatIcon } from '@hcc/icons';
import { Icon, Tooltip } from '@hcc/ui';
import { useEffect, useState, ComponentProps } from 'react';

import useTracker from '@/hooks/useTracker';

import * as styles from './EntryButton.css';

const TOOLTIP_KEY = 'cheertalk';

export default function CheerTalkEntryButton(props: ComponentProps<'button'>) {
  const { tracker } = useTracker();
  const [isCheerTalkTooltipVisible, setIsCheerTalkTooltipVisible] =
    useState(true);

  useEffect(() => {
    setIsCheerTalkTooltipVisible(
      window.localStorage.getItem(TOOLTIP_KEY) !== 'false',
    );
  }, []);

  const handleButtonClick = () => {
    tracker('cheerTalk', { clickEvent: 'open cheerTalk' });

    setIsCheerTalkTooltipVisible(false);
    window.localStorage.setItem(TOOLTIP_KEY, String(false));
  };

  return (
    <div className={styles.entryContainer}>
      <Tooltip
        content="응원톡에 들어가 여러분의 팀을 응원해보세요! 🙌"
        position="top"
        isVisible={isCheerTalkTooltipVisible}
        arrowPosition="rightEnd"
      >
        <div className={styles.entryButtonContent}>
          <button
            className={styles.entryButton}
            onClick={handleButtonClick}
            aria-label="응원톡 열기"
            {...props}
          >
            <Icon source={ChatIcon} className={styles.entryButtonIcon} />
          </button>
        </div>
      </Tooltip>
    </div>
  );
}
