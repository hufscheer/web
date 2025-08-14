import { clsx } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
import { match } from 'ts-pattern';
import { colors, type ResponsiveFontSize } from '../token';
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
        <Typography
          color={fontColor}
          fontSize={fontSize as ResponsiveFontSize}
          weight="semibold"
          lineHeight="tight"
          asChild
        >
          <span>{children}</span>
        </Typography>
      </div>
    );
  },
);

const getPadding = (size: BadgeSize) =>
  match(size)
    .with('sm', () => '4px 8px')
    .with('md', () => '6px 12px')
    .with('lg', () => '8px 16px')
    .exhaustive();

const getFontSize = (size: BadgeSize) =>
  match(size)
    .with('sm', () => 12)
    .with('md', () => 14)
    .with('lg', () => 16)
    .exhaustive();

const getFontColor = (variant: BadgeVariant) =>
  match(variant)
    .with('default', () => colors.neutral600)
    .with('danger', () => colors.white)
    .with('primary', () => colors.primary600)
    .exhaustive();

const getBackgroundColor = (variant: BadgeVariant) =>
  match(variant)
    .with('default', () => colors.neutral100)
    .with('danger', () => colors.danger600)
    .with('primary', () => colors.primary100)
    .exhaustive();
