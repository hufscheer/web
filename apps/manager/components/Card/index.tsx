import { ComponentPropsWithoutRef, forwardRef } from 'react';

import * as styles from './Card.css';

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  paddingVertical?: 'sm' | 'md';
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { paddingVertical = 'md', children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={styles.root({ paddingVertical })} {...props}>
      {children}
    </div>
  );
});

interface CardContentProps extends ComponentPropsWithoutRef<'div'> {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ left, right, children, ...props }, ref) {
    return (
      <div ref={ref} className={styles.content} {...props}>
        {left}
        <div className={styles.inner}>{children}</div>
        {right}
      </div>
    );
  },
);

interface CardActionProps extends ComponentPropsWithoutRef<'button'> {}

const CardAction = forwardRef<HTMLButtonElement, CardActionProps>(
  function CardAction({ children, ...props }, ref) {
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    );
  },
);

interface CardTitleProps extends ComponentPropsWithoutRef<'h3'> {
  text?: 'bold' | 'semibold' | 'normal';
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle({ children, text = 'normal', ...props }, ref) {
    return (
      <h3 ref={ref} {...props} className={styles.title({ text })}>
        {children}
      </h3>
    );
  },
);

interface CardSubContentProps extends ComponentPropsWithoutRef<'span'> {}

const CardSubContent = forwardRef<HTMLSpanElement, CardSubContentProps>(
  function CardSubContent({ children, ...props }, ref) {
    return (
      <span ref={ref} {...props} className={styles.subContent}>
        {children}
      </span>
    );
  },
);

interface CardFooterProps extends ComponentPropsWithoutRef<'div'> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ children, ...props }, ref) {
    return (
      <div ref={ref} {...props} className={styles.footer}>
        {children}
      </div>
    );
  },
);

export default Object.assign(
  {},
  {
    Root: Card,
    Content: CardContent,
    Action: CardAction,
    Title: CardTitle,
    SubContent: CardSubContent,
    Footer: CardFooter,
  },
);
