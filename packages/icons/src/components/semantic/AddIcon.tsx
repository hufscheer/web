import { useId } from 'react';
import Icon from '../../icon';
import type { IconProps } from '../../types';

export const AddIcon = (props: IconProps) => {
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
          <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="currentColor" />
        </g>
      </svg>
    </Icon>
  );
};

AddIcon.displayName = 'AddIcon';
