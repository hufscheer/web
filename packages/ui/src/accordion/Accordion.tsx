import { KeyboardArrowDownIcon } from '@hcc/icons';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react';
import styles from './Accordion.module.css';

const AccordionRoot = AccordionPrimitive.Root;

const AccordionHeader = AccordionPrimitive.Header;

const AccordionTrigger = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Trigger ref={ref} className={clsx(styles.trigger, className)} {...props}>
      {children}
      <KeyboardArrowDownIcon size={20} />
    </AccordionPrimitive.Trigger>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionItem = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  return <AccordionPrimitive.Item ref={ref} className={clsx(styles.item, className)} {...props} />;
});
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const AccordionContent = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content ref={ref} className={clsx(styles.content, className)} {...props} />
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export const Accordion = Object.assign(AccordionRoot, {
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Item: AccordionItem,
  Content: AccordionContent,
});
