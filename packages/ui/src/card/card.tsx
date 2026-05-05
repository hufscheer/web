/* ------ slots ------ */

import type { ReactNode } from 'react';

import { CardBody } from './_primitives/body';
import { CardFooter } from './_primitives/footer';
import { CardHeader } from './_primitives/header';
import { CardRoot } from './_primitives/root';
import { CardTitle } from './_primitives/title';

export interface CardProps {
  // slots
  header?: ReactNode;
  title?: ReactNode;

  children?: ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <CardRoot>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardBody>{children}</CardBody>
      <CardFooter />
    </CardRoot>
  );
};
