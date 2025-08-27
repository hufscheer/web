import { clsx } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef, useId } from 'react';
import { match } from 'ts-pattern';
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
      id: _id,
      className,
      children,
      placeholder,
      size = 'md',
      weight = 'medium',
      lineHeight = 'normal',
      style: _style,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = _id ?? generatedId;
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
      <div className={clsx(styles.wrapper, disabled && styles.disabled, className)} style={style}>
        <input
          ref={ref}
          id={id}
          className={styles.input}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
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

const getHeight = (size: InputSize) =>
  match(size)
    .with('xs', () => 28)
    .with('sm', () => 36)
    .with('md', () => 44)
    .with('lg', () => 52)
    .with('xl', () => 60)
    .exhaustive();

const getPadding = (size: InputSize) =>
  match(size)
    .with('xs', () => 8)
    .with('sm', () => 10)
    .with('md', () => 14)
    .with('lg', 'xl', () => 18)
    .exhaustive();

const getFontSize = (size: InputSize) =>
  match(size)
    .with('xs', () => 12)
    .with('sm', () => 14)
    .with('md', 'lg', 'xl', () => 16)
    .exhaustive();

const getInputPaddingTop = (size: InputSize) =>
  match(size)
    .with('xs', 'sm', 'md', () => 0)
    .with('lg', () => 18)
    .with('xl', () => 18)
    .exhaustive();

const getLabelPosition = (size: InputSize) =>
  match(size)
    .with('xs', 'sm', 'md', () => 0)
    .with('lg', () => 6)
    .with('xl', () => 10)
    .exhaustive();
