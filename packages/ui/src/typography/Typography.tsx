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

export type FontWeight = keyof typeof fontWeightToken;

export type LineHeight = keyof typeof lineHeightToken;

export interface TypographyProps extends ComponentProps<'p'> {
  asChild?: boolean;
  size?: FontSize;
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
    const style = {
      ..._style,
      '--hcc-typography-font-color': color,
      '--hcc-typography-font-size': `${fontSizeToken[size]}px`,
      '--hcc-typography-font-weight': fontWeightToken[weight],
      '--hcc-typography-line-height': lineHeightToken[lineHeight],
    } as CSSProperties;

    return (
      <Comp className={clsx(styles.typography, className)} ref={ref} style={style} {...props} />
    );
  },
);
