import { clsx } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
import { colors } from '../token';
import { Typography } from '../typography';
import styles from './Badge.module.css';

type BadgeSize = 'sm' | 'md' | 'lg';

type BadgeVariant = 'default' | 'danger' | 'primary';

export interface BadgeProps extends ComponentProps<'div'> {
  size?: BadgeSize;
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, children, size = 'md', variant = 'default', style: _style, ...props }, ref) => {
    const backgroundColor = getBackgroundColor(variant);
    const padding = getPadding(size);
    const style = {
      ..._style,
      '--hcc-badge-padding': padding,
      '--hcc-badge-border': undefined,
      '--hcc-badge-border-radius': '8px',
      '--hcc-badge-bg-color': backgroundColor,
    } as CSSProperties;

    const fontColor = getFontColor(variant);
    const fontSize = getFontSize(size);

    return (
      <div ref={ref} className={clsx(styles.badge, className)} style={style} {...props}>
        <Typography color={fontColor} size={fontSize} weight="semiBold" lineHeight="tight" asChild>
          <span>{children}</span>
        </Typography>
      </div>
    );
  },
);

const getPadding = (size: BadgeSize) => {
  switch (size) {
    case 'sm':
      return '6px 8px';
    case 'md':
      return '8px 12px';
    case 'lg':
      return '10px 16px';
  }
};

const getFontSize = (size: BadgeSize) => {
  switch (size) {
    case 'sm':
      return 12;
    case 'md':
      return 14;
    case 'lg':
      return 18;
  }
};

const getFontColor = (variant: BadgeVariant) => {
  switch (variant) {
    case 'default':
      return colors.neutral600;
    case 'danger':
      return colors.white;
    case 'primary':
      return colors.primary600;
  }
};

const getBackgroundColor = (variant: BadgeVariant) => {
  switch (variant) {
    case 'default':
      return colors.neutral100;
    case 'danger':
      return colors.danger600;
    case 'primary':
      return colors.primary100;
  }
};
