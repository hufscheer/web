import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
import {
  fontSize as fontSizeToken,
  fontWeight as fontWeightToken,
  lineHeight as lineHeightToken,
} from '../token';
import styles from './Typography.module.css';

export type FontSize = keyof typeof fontSizeToken;

export type ResponsiveFontSize =
  | FontSize
  | [FontSize, FontSize?, FontSize?]
  | { base: FontSize; tablet?: FontSize; desktop?: FontSize };

export type FontWeight = keyof typeof fontWeightToken;

export type LineHeight = keyof typeof lineHeightToken;

export interface TypographyProps extends ComponentProps<'p'> {
  asChild?: boolean;
  size?: ResponsiveFontSize;
  weight?: FontWeight;
  lineHeight?: LineHeight;
}

export const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  (
    {
      asChild,
      className,
      color,
      size = 16,
      weight = 'regular',
      lineHeight = 'normal',
      style: _style,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'p';

    let base: FontSize | undefined;
    let tablet: FontSize | undefined;
    let desktop: FontSize | undefined;

    if (Array.isArray(size)) {
      [base, tablet, desktop] = size;
    } else if (typeof size === 'object') {
      ({ base, tablet, desktop } = size);
    } else {
      base = size;
    }

    const style = {
      ..._style,
      '--hcc-typography-font-color': color,
      '--hcc-typography-font-size': `${fontSizeToken[base]}px`,
      ...(tablet !== undefined && {
        '--hcc-tablet-typography-font-size': `${fontSizeToken[tablet]}px`,
      }),
      ...(desktop !== undefined && {
        '--hcc-desktop-typography-font-size': `${fontSizeToken[desktop]}px`,
      }),
      '--hcc-typography-font-weight': fontWeightToken[weight],
      '--hcc-typography-line-height': lineHeightToken[lineHeight],
    } as CSSProperties;

    return (
      <Comp className={clsx(styles.typography, className)} ref={ref} style={style} {...props} />
    );
  },
);
