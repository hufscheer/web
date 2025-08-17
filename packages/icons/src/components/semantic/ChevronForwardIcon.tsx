import { useId } from 'react';
import Icon from '../../icon';
import type { IconProps } from '../../types';

export const ChevronForwardIcon = (props: IconProps) => {
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
          <path d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z" fill="currentColor" />
        </g>
      </svg>
    </Icon>
  );
};

ChevronForwardIcon.displayName = 'ChevronForwardIcon';
