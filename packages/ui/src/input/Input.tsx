import { clsx as cn } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
import {
  colors,
  type FontWeight,
  fontWeight as fontWeightToken,
  type LineHeight,
  lineHeight as lineHeightToken,
} from '../token';
import styles from './Input.module.css';

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  size?: InputSize;
  weight?: FontWeight;
  lineHeight?: LineHeight;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      className,
      children,
      placeholder,
      size = 'md',
      weight = 'medium',
      lineHeight = 'normal',
      style: _style,
      ...props
    },
    ref,
  ) => {
    const isLabelVisible = size === 'lg' || size === 'xl';

    const style = {
      ..._style,
      '--hcc-input-height': `${getHeight(size)}px`,
      '--hcc-input-padding-inline': `${getPadding(size)}px`,
      '--hcc-input-placeholder-color': colors.neutral400,
      '--hcc-input-font-size': `${getFontSize(size)}px`,
      '--hcc-input-font-weight': fontWeightToken[weight],
      '--hcc-input-line-height': lineHeightToken[lineHeight],
      '--hcc-input-border-radius': '8px',
      '--hcc-input-outline': `1px solid ${colors.neutral100}`,
      '--hcc-input-padding-top': isLabelVisible ? `${getInputPaddingTop(size)}px` : '0px',
      '--hcc-label-position': isLabelVisible ? `${getLabelPosition(size)}px` : '0px',
    } as CSSProperties;

    return (
      <div className={cn(styles.wrapper, className)} style={style} role="presentation">
        <input ref={ref} id={id} className={styles.input} placeholder={placeholder} {...props} />
        {isLabelVisible && (
          <label className={styles.label} htmlFor={id}>
            {placeholder}
          </label>
        )}
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
      return 18;
  }
};

const getInputPaddingTop = (size: InputSize) => {
  switch (size) {
    case 'lg':
      return 10;
    case 'xl':
      return 18;
    default:
      return 0;
  }
};

const getLabelPosition = (size: InputSize) => {
  switch (size) {
    case 'lg':
      return 5;
    case 'xl':
      return 9;
    default:
      return 0;
  }
};

const getFontSize = (size: InputSize) => {
  switch (size) {
    case 'xs':
      return 12;
    case 'sm':
      return 14;
    case 'md':
      return 16;
    case 'lg':
      return 16;
    case 'xl':
      return 16;
  }
};
