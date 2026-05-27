import { Button as BaseButton } from '@base-ui/react';
import clsx from 'clsx';

import * as styles from '../button.css';

export const ButtonRoot = ({ size, color, variant, className, ...props }: ButtonRoot.Props) => {
  return (
    <BaseButton className={clsx(styles.button({ size, color, variant }), className)} {...props} />
  );
};

/* ------ types ------ */

export interface ButtonProps extends BaseButton.Props, styles.ButtonVariants {}

export namespace ButtonRoot {
  export type Props = ButtonProps;
  export type State = BaseButton.State;
}
