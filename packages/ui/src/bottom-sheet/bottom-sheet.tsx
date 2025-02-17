'use client';

import { clsx } from 'clsx';
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ComponentRef,
  forwardRef,
} from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import * as styles from './styles.css';

const BottomSheet = ({
  shouldScaleBackground = true,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
BottomSheet.displayName = 'Drawer';

const BottomSheetTrigger = DrawerPrimitive.Trigger;

const BottomSheetPortal = DrawerPrimitive.Portal;

const BottomSheetClose = DrawerPrimitive.Close;

const BottomSheetOverlay = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={clsx(styles.overlay, className)}
    {...props}
  />
));
BottomSheetOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const BottomSheetContent = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <BottomSheetPortal>
    <BottomSheetOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={clsx(styles.content, className)}
      {...props}
    >
      <div className={styles.inner}>
        <div className={styles.bar} />
        {children}
      </div>
    </DrawerPrimitive.Content>
  </BottomSheetPortal>
));
BottomSheetContent.displayName = 'DrawerContent';

const BottomSheetHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={clsx(styles.header, className)} {...props} />
);
BottomSheetHeader.displayName = 'DrawerHeader';

const BottomSheetFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={clsx(styles.footer, className)} {...props} />
);
BottomSheetFooter.displayName = 'DrawerFooter';

const BottomSheetTitle = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={clsx(styles.title, className)}
    {...props}
  />
));
BottomSheetTitle.displayName = DrawerPrimitive.Title.displayName;

const BottomSheetDescription = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={clsx(styles.description, className)}
    {...props}
  />
));
BottomSheetDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  BottomSheet,
  BottomSheetPortal,
  BottomSheetOverlay,
  BottomSheetTrigger,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetFooter,
  BottomSheetTitle,
  BottomSheetDescription,
};
