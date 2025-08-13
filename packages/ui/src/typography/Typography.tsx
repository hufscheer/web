import { Slot } from '@radix-ui/react-slot';
import { clsx as cn } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
import {
  type FontWeight,
  fontSize as fontSizeToken,
  fontWeight as fontWeightToken,
  type LineHeight,
  lineHeight as lineHeightToken,
  parseResponsiveFontSize,
  type ResponsiveFontSize,
} from '../token';
import styles from './Typography.module.css';

export interface TypographyProps extends ComponentProps<'p'> {
  asChild?: boolean;
  fontSize?: ResponsiveFontSize;
  weight?: FontWeight;
  lineHeight?: LineHeight;
}

export const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  (
    {
      asChild,
      className,
      color,
      fontSize = 16,
      weight = 'regular',
      lineHeight = 'normal',
      style: _style,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'p';
    const { base, tablet, pc } = parseResponsiveFontSize(fontSize);

    const style = {
      ..._style,
      '--hcc-typography-font-color': color,
      '--hcc-typography-font-size': `${fontSizeToken[base]}px`,
      ...(tablet !== undefined && {
        '--hcc-tablet-typography-font-size': `${fontSizeToken[tablet]}px`,
      }),
      ...(pc !== undefined && {
        '--hcc-pc-typography-font-size': `${fontSizeToken[pc]}px`,
      }),
      '--hcc-typography-font-weight': fontWeightToken[weight],
      '--hcc-typography-line-height': lineHeightToken[lineHeight],
    } as CSSProperties;

    return <Comp className={cn(styles.typography, className)} ref={ref} style={style} {...props} />;
  },
);
