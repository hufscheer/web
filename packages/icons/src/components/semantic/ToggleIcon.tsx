import type { IconProps } from '../../types';

import Icon from '../../icon';

type ToggleIconProps = IconProps & {
  checked?: boolean;
};

export const ToggleIcon = ({ checked = false, ...props }: ToggleIconProps) => {
  return (
    <Icon {...props} width={48} height={28}>
      <svg
        width="48"
        height="28"
        viewBox="0 0 48 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="48" height="28" rx="14" fill="currentColor" />
        <circle cx={checked ? 34 : 14} cy="14" r="10" fill="white" />
      </svg>
    </Icon>
  );
};

ToggleIcon.displayName = 'ToggleIcon';
