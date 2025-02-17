'use client';

import { CrossIcon } from '@hcc/icons';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { clsx } from 'clsx';
import {
  ComponentPropsWithoutRef,
  ReactElement,
  forwardRef,
  ComponentRef,
} from 'react';

import * as styles from './styles.css';
import { Icon } from '../icon';

export const ToastProvider = ToastPrimitives.Provider;

export const ToastViewport = forwardRef<
  ComponentRef<typeof ToastPrimitives.Viewport>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={clsx(styles.container, className)}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

type ToastVariant = {
  variant?: keyof typeof styles.variants;
};

export const Toast = forwardRef<
  ComponentRef<typeof ToastPrimitives.Root>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & ToastVariant
>(({ className, variant = 'default', ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={clsx(styles.toast, styles.variants[variant], className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

export const ToastAction = forwardRef<
  ComponentRef<typeof ToastPrimitives.Action>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={clsx(styles.action, className)}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

export const ToastClose = forwardRef<
  ComponentRef<typeof ToastPrimitives.Close>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={clsx(styles.close, className)}
    toast-close=""
    {...props}
  >
    <Icon source={CrossIcon} className={styles.xIcon} />
    {/* <X className="h-4 w-4" /> */}
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

export const ToastTitle = forwardRef<
  ComponentRef<typeof ToastPrimitives.Title>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={clsx(styles.title, className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

export const ToastDescription = forwardRef<
  ComponentRef<typeof ToastPrimitives.Description>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={clsx(styles.description, className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export type ToastProps = ComponentPropsWithoutRef<typeof Toast>;

export type ToastActionElement = ReactElement<typeof ToastAction>;
