import { clsx as cn } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
import {
  colors,
  type FontWeight,
  fontSize as fontSizeToken,
  fontWeight as fontWeightToken,
  type LineHeight,
  lineHeight as lineHeightToken,
  parseResponsiveFontSize,
  type ResponsiveFontSize,
} from '../token';
import styles from './Input.module.css';

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  size?: InputSize;
  fontSize?: ResponsiveFontSize;
  weight?: FontWeight;
  lineHeight?: LineHeight;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      children,
      placeholder,
      size = 'md',
      fontSize = 16,
      weight = 'medium',
      lineHeight = 'normal',
      style: _style,
      ...props
    },
    ref,
  ) => {
    const { base, tablet, pc } = parseResponsiveFontSize(fontSize);

    const style = {
      ..._style,
      '--hcc-input-height': `${getHeight(size)}px`,
      '--hcc-input-padding-inline': `${getPadding(size)}px`,
      '--hcc-input-font-size': `${fontSizeToken[base]}px`,
      ...(tablet !== undefined && {
        '--hcc-tablet-input-font-size': `${fontSizeToken[tablet]}px`,
      }),
      ...(pc !== undefined && {
        '--hcc-pc-input-font-size': `${fontSizeToken[pc]}px`,
      }),
      '--hcc-input-font-weight': fontWeightToken[weight],
      '--hcc-input-line-height': lineHeightToken[lineHeight],
      '--hcc-input-border-radius': '8px',
      '--hcc-input-outline': `1px solid ${colors.neutral100}`,
    } as CSSProperties;

    return (
      <div className={cn(styles.wrapper, className)} style={style} role="presentation">
        <label className={styles.label}>{placeholder}</label>
        <input ref={ref} className={styles.input} {...props} />
        {children}
      </div>
    );
  },
);

Input.displayName = 'Input';

const getHeight = (size: InputSize) => {
  switch (size) {
    case 'xs':
      return 28;
    case 'sm':
      return 36;
    case 'md':
      return 44;
    case 'lg':
      return 52;
    case 'xl':
      return 60;
  }
};

const getPadding = (size: InputSize) => {
  switch (size) {
    case 'xs':
      return 8;
    case 'sm':
      return 10;
    case 'md':
      return 14;
    case 'lg':
      return 18;
    case 'xl':
      return 22;
  }
};
