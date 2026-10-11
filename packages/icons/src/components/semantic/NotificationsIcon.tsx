import type { IconProps } from '../../types';

import Icon from '../../icon';

export const NotificationsIcon = (props: IconProps) => (
  <Icon {...props}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5C8.9 5 6.6 7.5 6.6 10.6V13.4C6.6 14.3 6.2 15.1 5.6 15.7L5.2 16.1C4.6 16.7 5 17.7 5.9 17.7H18.1C19 17.7 19.4 16.7 18.8 16.1L18.4 15.7C17.8 15.1 17.4 14.3 17.4 13.4V10.6C17.4 7.5 15.1 5 12 5Z" />
        <path d="M10 19.6C10 20.7 10.9 21.6 12 21.6C13.1 21.6 14 20.7 14 19.6" />
      </g>
      <circle cx="12" cy="3.7" r="1.2" fill="currentColor" />
    </svg>
  </Icon>
);

NotificationsIcon.displayName = 'NotificationsIcon';
