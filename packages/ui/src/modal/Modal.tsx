import * as ModalPrimitive from '@radix-ui/react-dialog';
import { clsx as cn } from 'clsx';
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react';
import styles from './Modal.module.css';

const ModalContent = forwardRef<
  ComponentRef<typeof ModalPrimitive.Content>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <ModalPrimitive.Portal>
      <ModalPrimitive.Overlay className={styles.overlay} />
      <ModalPrimitive.Content ref={ref} className={cn(styles.content, className)} {...props}>
        {children}
      </ModalPrimitive.Content>
    </ModalPrimitive.Portal>
  );
});

export const Modal = Object.assign(ModalPrimitive.Root, {
  Trigger: ModalPrimitive.Trigger,
  Content: ModalContent,
  Close: ModalPrimitive.Close,
  Title: ModalPrimitive.Title,
  Description: ModalPrimitive.Description,
});
