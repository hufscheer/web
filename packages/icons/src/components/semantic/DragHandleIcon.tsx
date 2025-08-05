import Icon from '../../icon';
import type { IconProps } from '../../types';

export const DragHandleIcon = (props: IconProps) => (
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
        id="mask0_7258_1939"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="currentColor" />
      </mask>
      <g mask="url(#mask0_7258_1939)">
        <path d="M4 15V13H20V15H4ZM4 11V9H20V11H4Z" fill="currentColor" />
      </g>
    </svg>
  </Icon>
);

DragHandleIcon.displayName = 'DragHandleIcon';
