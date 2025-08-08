import Icon from '../../icon';
import type { IconProps } from '../../types';

export const TradeIcon = (props: IconProps) => (
  <Icon {...props}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7.24996 18.6989V7.17769L4.39996 9.99319L3.35571 8.94894L7.99996 4.30469L12.6442 8.94894L11.575 9.99319L8.74996 7.16819V18.6989H7.24996Z"
        fill="#34C759"
      />
      <path
        d="M16.7499 5.30497V16.8262L19.5999 14.0107L20.6442 15.055L15.9999 19.6992L11.3557 15.055L12.4249 14.0107L15.2499 16.8357L15.2499 5.30497H16.7499Z"
        fill="#FC5555"
      />
    </svg>
  </Icon>
);

TradeIcon.displayName = 'TradeIcon';
