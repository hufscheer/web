import Icon from '../../icon';
import type { IconProps } from '../../types';

export const FilterHdrIcon = (props: IconProps) => (
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
        id="mask0_7258_14947"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="currentColor" />
      </mask>
      <g mask="url(#mask0_7258_14947)">
        <path
          d="M1 18L7 10L11.5 16H19L14 9.35L11.5 12.65L10.25 11L14 6L23 18H1ZM5 16H9L7 13.325L5 16Z"
          fill="currentColor"
        />
      </g>
    </svg>
  </Icon>
);

FilterHdrIcon.displayName = 'FilterHdrIcon';
