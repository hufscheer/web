import { KeyboardArrowDownIcon } from '@hcc/icons';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react';

import * as styles from './styles.css';
import { Icon } from '../icon';

export const Accordion = AccordionPrimitive.Root;

export const AccordionHeader = AccordionPrimitive.Header;

export const AccordionTrigger = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Trigger
      ref={ref}
      className={clsx(styles.trigger, className)}
      {...props}
    >
      {children}
      <Icon source={KeyboardArrowDownIcon} size={20} />
    </AccordionPrimitive.Trigger>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export const AccordionItem = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={clsx(styles.item, className)}
      {...props}
    />
  );
});
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

export const AccordionContent = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={clsx(styles.content, className)}
      {...props}
    />
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
