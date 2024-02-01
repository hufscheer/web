import { ComponentProps } from 'react';

export const Calendar = ({
  viewBox = '0 0 8 10',
  ...props
}: ComponentProps<'svg'>) => {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.2 1.52228H6.8V0.704102H6V1.52228H2V0.704102H1.2V1.52228H0.8C0.36 1.52228 0 1.89047 0 2.34047V8.88592C0 9.33592 0.36 9.7041 0.8 9.7041H7.2C7.64 9.7041 8 9.33592 8 8.88592V2.34047C8 1.89047 7.64 1.52228 7.2 1.52228ZM7.2 8.88592H0.8V3.56774H7.2V8.88592Z"
        fill="currentColor"
      />
    </svg>
  );
};
