import { clsx } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
import { match } from 'ts-pattern';
import {
  colors,
  type FontWeight,
  fontWeight as fontWeightToken,
  type LineHeight,
  lineHeight as lineHeightToken,
  type ResponsiveFontSize,
} from '../token';
import styles from './Select.module.css';

type SelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SelectProps extends Omit<ComponentProps<'select'>, 'size'> {
  size?: SelectSize;
  fontSize?: ResponsiveFontSize;
  weight?: FontWeight;
  lineHeight?: LineHeight;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
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
    const isLabelVisible = size === 'lg' || size === 'xl';

    const style = {
      ..._style,
      '--hcc-select-height': `${getHeight(size)}px`,
      '--hcc-select-padding-inline': `${getPadding(size)}px`,
      '--hcc-select-placeholder-color': colors.neutral400,
      '--hcc-select-font-size': `${getFontSize(size)}px`,
      '--hcc-select-font-weight': fontWeightToken[weight],
      '--hcc-select-line-height': lineHeightToken[lineHeight],
      '--hcc-select-border-radius': '8px',
      '--hcc-select-outline': `1px solid ${colors.neutral100}`,
      '--hcc-select-padding-top': isLabelVisible ? getSelectPaddingTop(size) : '0px',
      '--hcc-select-label-top': isLabelVisible ? getLabelTop(size) : '0px',
    } as CSSProperties;

    return (
      <div className={clsx(styles.wrapper, className)} style={style} role="presentation">
        <select
          ref={ref}
          className={styles.select}
          defaultValue={props.defaultValue ?? ''}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>

        {isLabelVisible && placeholder && (
          <label className={styles.label} htmlFor={id}>
            {placeholder}
          </label>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';

const getHeight = (size: SelectSize) =>
  match(size)
    .with('xs', () => 28)
    .with('sm', () => 36)
    .with('md', () => 44)
    .with('lg', () => 52)
    .with('xl', () => 60)
    .exhaustive();

const getPadding = (size: SelectSize) =>
  match(size)
    .with('xs', () => 8)
    .with('sm', () => 10)
    .with('md', () => 14)
    .with('lg', 'xl', () => 18)
    .exhaustive();

const getFontSize = (size: SelectSize) =>
  match(size)
    .with('xs', () => 12)
    .with('sm', () => 14)
    .with('md', 'lg', 'xl', () => 16)
    .exhaustive();

const getSelectPaddingTop = (size: SelectSize) =>
  match(size)
    .with('xs', 'sm', 'md', () => 0)
    .with('lg', () => 10)
    .with('xl', () => 18)
    .exhaustive();

const getLabelTop = (size: SelectSize) =>
  match(size)
    .with('xs', 'sm', 'md', () => 0)
    .with('lg', () => 5)
    .with('xl', () => 9)
    .exhaustive();
