'use client';

import { clsx as cn } from 'clsx';
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import styles from './BottomSheet.module.css';

const BottomSheetRoot = ({
  shouldScaleBackground = true,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
BottomSheetRoot.displayName = 'Drawer';

const BottomSheetTrigger: typeof DrawerPrimitive.Trigger = DrawerPrimitive.Trigger;

const BottomSheetPortal = DrawerPrimitive.Portal;

const BottomSheetClose: typeof DrawerPrimitive.Close = DrawerPrimitive.Close;

const BottomSheetOverlay: ForwardRefExoticComponent<
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> &
    RefAttributes<ComponentRef<typeof DrawerPrimitive.Overlay>>
> = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay ref={ref} className={cn(styles.overlay, className)} {...props} />
));
BottomSheetOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const BottomSheetContent: ForwardRefExoticComponent<
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> &
    RefAttributes<ComponentRef<typeof DrawerPrimitive.Content>>
> = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <BottomSheetPortal>
    <BottomSheetOverlay />
    <DrawerPrimitive.Content ref={ref} className={cn(styles.content, className)} {...props}>
      <div className={styles.inner}>
        <div className={styles.bar} />
        {children}
      </div>
    </DrawerPrimitive.Content>
  </BottomSheetPortal>
));
BottomSheetContent.displayName = 'DrawerContent';

const BottomSheetHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn(styles.header, className)} {...props} />
);
BottomSheetHeader.displayName = 'DrawerHeader';

const BottomSheetFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn(styles.footer, className)} {...props} />
);
BottomSheetFooter.displayName = 'DrawerFooter';

const BottomSheetTitle: ForwardRefExoticComponent<
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> &
    RefAttributes<ComponentRef<typeof DrawerPrimitive.Title>>
> = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title ref={ref} className={cn(styles.title, className)} {...props} />
));
BottomSheetTitle.displayName = DrawerPrimitive.Title.displayName;

const BottomSheetDescription: ForwardRefExoticComponent<
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> &
    RefAttributes<ComponentRef<typeof DrawerPrimitive.Description>>
> = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cn(styles.description, className)} {...props} />
));
BottomSheetDescription.displayName = DrawerPrimitive.Description.displayName;

export const BottomSheet = Object.assign(BottomSheetRoot, {
  Trigger: BottomSheetTrigger,
  Close: BottomSheetClose,
  Portal: BottomSheetPortal,
  Overlay: BottomSheetOverlay,
  Content: BottomSheetContent,
  Header: BottomSheetHeader,
  Footer: BottomSheetFooter,
  Title: BottomSheetTitle,
  Description: BottomSheetDescription,
});
