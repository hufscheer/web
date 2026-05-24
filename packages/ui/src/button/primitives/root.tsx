import { Button as BaseButton } from '@base-ui/react';
import clsx from 'clsx';

import * as styles from '../button.css';

export const ButtonRoot = ({ size, color, variant, className, ...props }: ButtonRoot.Props) => {
  return (
    <BaseButton className={clsx(styles.button({ size, color, variant }), className)} {...props} />
  );
};

export namespace ButtonRoot {
  export type Props = BaseButton.Props & styles.ButtonVariants;
  export type State = BaseButton.State;
}
