import { clsx } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
import { color } from '../token';
import { Typography } from '../typography';
import styles from './Badge.module.css';

type BadgeSize = 'small' | 'medium' | 'large';

type BadgeVariant = 'default' | 'danger' | 'success';

export interface BadgeProps extends ComponentProps<'div'> {
  size?: BadgeSize;
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, children, size = 'medium', variant = 'default', style: _style, ...props }, ref) => {
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
    case 'small':
      return '6px 8px';
    case 'large':
      return '10px 16px';
    default:
      return '8px 12px';
  }
};

const getFontSize = (size: BadgeSize) => {
  switch (size) {
    case 'small':
      return 12;
    case 'large':
      return 18;
    default:
      return 14;
  }
};

const getFontColor = (variant: BadgeVariant) => {
  switch (variant) {
    case 'danger':
      return color.white;
    case 'success':
      return color.primary600;
    default:
      return color.neutral600;
  }
};

const getBackgroundColor = (variant: BadgeVariant) => {
  switch (variant) {
    case 'danger':
      return color.danger600;
    case 'success':
      return color.primary100;
    default:
      return color.neutral100;
  }
};
