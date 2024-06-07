import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import * as styles from './styles.css';

const radiusStyle = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
};

type Radius = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
interface SkeletonProps extends ComponentProps<'div'> {
  width?: number | string;
  height?: number | string;
  radius?: Radius | number;
}

function getRadius(radius: SkeletonProps['radius']) {
  if (radius === undefined) return 0;
  if (typeof radius === 'number') return radius;

  return radiusStyle[radius];
}

const Skeleton = ({
  className,
  width,
  height,
  radius = 'sm',
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={clsx(styles.root, className)}
      style={{ width, height, borderRadius: getRadius(radius) }}
      {...props}
    />
  );
};

export default Skeleton;
