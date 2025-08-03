import type { SVGAttributes } from 'react';

export type IconProps = {
  size?: number | string;
  width?: number | string;
  height?: number | string;
} & SVGAttributes<SVGElement>;
