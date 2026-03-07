import { useId } from 'react';

import type { IconProps } from '../../types';

import Icon from '../../icon';

export const SendIcon = (props: IconProps) => {
  const id = useId();
  return (
    <Icon {...props}>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
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
          width="25"
          height="25"
        >
          <rect x="0.85083" y="0.640869" width="24" height="24" fill="currentColor" />
        </mask>
        <g mask={`url(#${id})`}>
          <path
            d="M20.6508 13.5658L5.25083 20.0658C4.9175 20.1992 4.60083 20.17 4.30083 19.9783C4.00083 19.7867 3.85083 19.5075 3.85083 19.1408V6.14084C3.85083 5.77417 4.00083 5.49501 4.30083 5.30334C4.60083 5.11167 4.9175 5.08251 5.25083 5.21584L20.6508 11.7158C21.0675 11.8992 21.2758 12.2075 21.2758 12.6408C21.2758 13.0742 21.0675 13.3825 20.6508 13.5658ZM5.85083 17.6408L17.7008 12.6408L5.85083 7.64084V11.1408L11.8508 12.6408L5.85083 14.1408V17.6408Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </Icon>
  );
};

SendIcon.displayName = 'SendIcon';
