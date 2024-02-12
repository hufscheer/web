import { BackgroundLogoIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import * as styles from './Background.css';

type LabelProps = Omit<ComponentProps<typeof Icon>, 'source'>;

export default function Background({ className, ...props }: LabelProps) {
  return (
    <Icon
      source={BackgroundLogoIcon}
      className={clsx(className, styles.background)}
      {...props}
    />
  );
}
