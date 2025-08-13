import { clsx as cn } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
import {
  type FontWeight,
  fontSize as fontSizeToken,
  type LineHeight,
  parseResponsiveFontSize,
  type ResponsiveFontSize,
} from '../token';
import styles from './Input.module.css';

export interface InputProps extends ComponentProps<'input'> {
  fontSize?: ResponsiveFontSize;
  weight?: FontWeight;
  lineHeight?: LineHeight;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      children,
      fontSize = 16,
      weight = 'regular',
      lineHeight = 'normal',
      style: _style,
      ...props
    },
    ref,
  ) => {
    const { base, tablet, pc } = parseResponsiveFontSize(fontSize);

    const style = {
      ..._style,
      '--hcc-input-font-size': `${fontSizeToken[base]}px`,
      ...(tablet !== undefined && {
        '--hcc-tablet-input-font-size': `${fontSizeToken[tablet]}px`,
      }),
      ...(pc !== undefined && {
        '--hcc-pc-input-font-size': `${fontSizeToken[pc]}px`,
      }),
    } as CSSProperties;

    return (
      <div className={cn(styles.wrapper, className)} style={style} role="presentation">
        <input ref={ref} className={styles.input} {...props} />
        {children}
      </div>
    );
  },
);
Input.displayName = 'Input';
