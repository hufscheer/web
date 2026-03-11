import { useId } from 'react';

import type { IconProps } from '../../types';

import Icon from '../../icon';

export const ChatFillIcon = (props: IconProps) => {
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
            d="M2.95002 16.3C2.63335 15.6167 2.39585 14.9167 2.23752 14.2C2.07918 13.4833 2.00002 12.75 2.00002 12C2.00002 10.6167 2.26252 9.31667 2.78752 8.1C3.31252 6.88333 4.02502 5.825 4.92502 4.925C5.82502 4.025 6.88335 3.3125 8.10002 2.7875C9.31668 2.2625 10.6167 2 12 2C13.3833 2 14.6834 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6834 21.7375 13.3833 22 12 22C11.25 22 10.5167 21.9208 9.80002 21.7625C9.08335 21.6042 8.38335 21.3667 7.70002 21.05L2.75002 22.5C2.36668 22.6167 2.03335 22.5333 1.75002 22.25C1.46668 21.9667 1.38335 21.6333 1.50002 21.25L2.95002 16.3Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </Icon>
  );
};

ChatFillIcon.displayName = 'ChatFillIcon';
