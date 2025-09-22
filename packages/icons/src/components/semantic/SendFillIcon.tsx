import { useId } from 'react';
import Icon from '../../icon';
import type { IconProps } from '../../types';

export const SendFillIcon = (props: IconProps) => {
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
          <rect x="0.127563" y="0.482422" width="24" height="24" fill="currentColor" />
        </mask>
        <g mask={`url(#${id})`}>
          <path
            d="M4.52756 19.9076C4.19423 20.041 3.87756 20.0118 3.57756 19.8201C3.27756 19.6285 3.12756 19.3493 3.12756 18.9826V14.4826L11.1276 12.4826L3.12756 10.4826V5.98264C3.12756 5.61597 3.27756 5.3368 3.57756 5.14514C3.87756 4.95347 4.19423 4.9243 4.52756 5.05764L19.9276 11.5576C20.3442 11.741 20.5526 12.0493 20.5526 12.4826C20.5526 12.916 20.3442 13.2243 19.9276 13.4076L4.52756 19.9076Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </Icon>
  );
};

SendFillIcon.displayName = 'SendFillIcon';
