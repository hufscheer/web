import { rem } from '@hcc/styles';
import { ComponentPropsWithRef } from 'react';

import * as styles from './Divider.css';

interface DividerProps extends ComponentPropsWithRef<'hr'> {
  height?: number;
}

const Divider = ({ height = 1, ...props }: DividerProps) => {
  return (
    <hr className={styles.divider} style={{ height: rem(height) }} {...props} />
  );
};

export default Divider;
