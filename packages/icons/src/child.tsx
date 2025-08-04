import { Children, cloneElement, isValidElement, type ReactNode } from 'react';

type ChildProps = {
  children: ReactNode;
  [key: string]: unknown;
};

const Child = ({ children, ...props }: ChildProps) => {
  const child: ReactNode = Children.only(children);

  return isValidElement(child) ? cloneElement(child, props) : null;
};

export default Child;
