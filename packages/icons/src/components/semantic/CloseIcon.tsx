import { useId } from 'react';
import Icon from '../../icon';
import type { IconProps } from '../../types';

export const CloseIcon = (props: IconProps) => {
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
          <path
            d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </Icon>
  );
};

CloseIcon.displayName = 'CloseIcon';
