import Icon from '../../icon';
import type { IconProps } from '../../types';

export const KeyboardArrowDownIcon = (props: IconProps) => (
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
        id="mask0_7258_9574"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="currentColor" />
      </mask>
      <g mask="url(#mask0_7258_9574)">
        <path d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z" fill="currentColor" />
      </g>
    </svg>
  </Icon>
);

KeyboardArrowDownIcon.displayName = 'KeyboardArrowDownIcon';
