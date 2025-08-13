import { clsx as cn } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
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
      <div className={cn(styles.wrapper, className)} style={style} role="presentation">
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

const getHeight = (size: SelectSize) => {
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

const getPadding = (size: SelectSize) => {
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

const getSelectPaddingTop = (size: SelectSize) => {
  switch (size) {
    case 'lg':
      return '10px';
    case 'xl':
      return '18px';
    default:
      return '0px';
  }
};

const getLabelTop = (size: SelectSize) => {
  switch (size) {
    case 'lg':
      return '5px';
    case 'xl':
      return '9px';
    default:
      return '50%';
  }
};

const getFontSize = (size: SelectSize) => {
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
