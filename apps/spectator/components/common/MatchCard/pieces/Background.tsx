import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import { Icon } from '@/components/common/Icon';

import * as styles from './Background.css';

interface LabelProps extends ComponentProps<'svg'> {
  className?: string;
}

export default function Background({ className, ...props }: LabelProps) {
  return (
    <Icon
      iconName="backgroundLogo"
      className={clsx(className, styles.background)}
      {...props}
    />
  );
}
