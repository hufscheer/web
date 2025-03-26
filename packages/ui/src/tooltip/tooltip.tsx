'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react';

import * as styles from './styles.css';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, align = 'center', ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    align={align}
    className={clsx(styles.content, className)}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const TooltipArrow = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Arrow>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow ref={ref} className={clsx(styles.arrow, className)} {...props} />
));
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, TooltipArrow };
