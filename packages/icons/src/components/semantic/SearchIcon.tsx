import { useId } from 'react';

import type { IconProps } from '../../types';

import Icon from '../../icon';

export const SearchIcon = (props: IconProps) => {
  const id = useId();
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        id={id}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.5 16C13.5376 16 16 13.5376 16 10.5C16 7.46243 13.5376 5 10.5 5C7.46243 5 5 7.46243 5 10.5C5 13.5376 7.46243 16 10.5 16ZM17 10.5C17 14.0898 14.0898 17 10.5 17C6.91015 17 4 14.0898 4 10.5C4 6.91015 6.91015 4 10.5 4C14.0898 4 17 6.91015 17 10.5Z"
          fill="black"
        />
        <path
          d="M14.3439 15.7422C14.3734 15.7821 14.4062 15.8204 14.4424 15.8566L18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929L15.8566 14.4424C15.8204 14.4062 15.7821 14.3734 15.7422 14.3439C15.3499 14.878 14.878 15.3499 14.3439 15.7422Z"
          fill="black"
        />
      </svg>
    </Icon>
  );
};

SearchIcon.displayName = 'SearchIcon';
