import { AddIcon, CheckIcon } from '@hcc/icons';
import { Badge, Icon } from '@hcc/ui';
import { clsx } from 'clsx';
import { ElementRef, forwardRef } from 'react';

import * as styles from './styles.css';

type LineupBadgeProps = {
  checked?: boolean;
};

const LineupBadge = forwardRef<ElementRef<typeof Badge>, LineupBadgeProps>(
  ({ checked = false }, ref) => {
    if (checked)
      return (
        <Badge className={styles.badge} colorScheme="blue" ref={ref}>
          <Icon source={CheckIcon} color="white" width="16" height="16" />
          라인업
        </Badge>
      );

    return (
      <Badge className={clsx(styles.badge, styles.modifyBadge)} ref={ref}>
        <Icon source={AddIcon} color="white" width="16" height="16" />
        라인업 수정
      </Badge>
    );
  },
);
LineupBadge.displayName = 'LineupBadge';

export default LineupBadge;
