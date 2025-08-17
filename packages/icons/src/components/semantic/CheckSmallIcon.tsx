import { useId } from 'react';
import Icon from '../../icon';
import type { IconProps } from '../../types';

export const CheckSmallIcon = (props: IconProps) => {
  const id = useId();
  return (
    <Icon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <mask
          id={id}
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect width="24" height="24" fill="currentColor" />
        </mask>
        <g mask={`url(#${id})`}>
          <path d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z" fill="currentColor" />
        </g>
      </svg>
    </Icon>
  );
};

CheckSmallIcon.displayName = 'CheckSmallIcon';
