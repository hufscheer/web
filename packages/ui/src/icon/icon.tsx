import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  SVGProps,
  forwardRef,
} from 'react';

import * as styles from './icon.css';
import { IconColor, IconSize } from './type';

export type IconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'color'> & {
  source: FunctionComponent<SVGProps<SVGSVGElement>>;
  size?: IconSize | number;
  color?: IconColor;
  className?: string;
};

const getIconSize = (size: IconSize | number) => {
  if (typeof size === 'number') return size;
  return ({ xl: 44, lg: 36, md: 24, sm: 20, xs: 16, xxs: 12 } as const)[size];
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ source: SourceElement, color, size = 'md', ...props }, ref) => {
    const iconSize: number = getIconSize(size);

    return (
      <SourceElement
        ref={ref}
        width={iconSize}
        height={iconSize}
        className={styles.icon({ color })}
        {...props}
      />
    );
  },
);

Icon.displayName = 'Icon';
