import type { IconProps } from '../../types';

import Icon from '../../icon';

export const FoulIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="15"
        viewBox="0 0 17 15"
        fill="none"
      >
        <path
          d="M0 15H17L8.5 0L0 15ZM9.27273 12.6316H7.72727V11.0526H9.27273V12.6316ZM9.27273 9.47368H7.72727V6.31579H9.27273V9.47368Z"
          fill="#FFDF2A"
        />
      </svg>
    </Icon>
  );
};

FoulIcon.displayName = 'FoulIcon';
