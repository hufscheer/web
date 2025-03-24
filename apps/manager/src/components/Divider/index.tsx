import { rem } from '@hcc/styles';
import { ComponentProps } from 'react';

import * as styles from './styles.css';

interface DividerProps extends ComponentProps<'hr'> {
  height?: number;
}

const Divider = ({ height = 1, ...props }: DividerProps) => {
  return <hr className={styles.divider} style={{ height: rem(height) }} {...props} />;
};

export default Divider;
