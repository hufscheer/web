import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import * as styles from './Menu.css';

export default function Menu({ className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div className={clsx(className, styles.menu)} {...props}>
      {children}
    </div>
  );
}
