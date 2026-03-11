import { cloneElement } from 'react';

import type { IconProps } from './types';

import Child from './child';

const DEFAULT_ICON_SIZE = 16;

const Icon = ({ children, width, height, size = DEFAULT_ICON_SIZE, ...props }: IconProps) => {
  return cloneElement(<Child>{children}</Child>, {
    width: width ?? size,
    height: height ?? size,
    'aria-hidden': true,
    ...props,
  });
};

export default Icon;
