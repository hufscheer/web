import { CrossIcon } from '@hcc/icons';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { ReactNode, forwardRef } from 'react';

import * as styles from './styles.css';
import Icon from '../icon';

// interface DialogProps
//   extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
//   children: ReactNode;
// }

// export const Dialog = ({ children, ...props }: DialogProps) => {
//   return (
//     <DialogPrimitive.Root {...props}>
//       <DialogPrimitive.Overlay className={styles.overlay} />
//       {children}
//     </DialogPrimitive.Root>
//   );
// };

export const Dialog = DialogPrimitive.Root;

interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}

export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  (props, ref) => {
    return (
      <DialogPrimitive.Overlay
        className={styles.overlay}
        {...props}
        ref={ref}
      />
    );
  },
);

DialogOverlay.displayName = 'DialogOverlay';

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  children: ReactNode;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, ...props }, ref) => (
    <DialogPrimitive.Content
      className={clsx(styles.content, className)}
      {...props}
      ref={ref}
    >
      {children}
      <DialogPrimitive.Close className={styles.close}>
        <Icon source={CrossIcon} size="xs" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  ),
);

DialogContent.displayName = 'DialogContent';

// export const DialogClose = () => (
//   <DialogPrimitive.Close className={styles.close} />
// );

type DialogCloseProps = {
  children?: ReactNode;
} & React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ children, className, ...props }, ref) => (
    <DialogPrimitive.Close
      className={children ? className : clsx(styles.close, className)}
      {...props}
      ref={ref}
    >
      {children || <Icon source={CrossIcon} size="xs" />}
    </DialogPrimitive.Close>
  ),
);

DialogClose.displayName = 'DialogClose';

export const DialogTrigger = DialogPrimitive.Trigger;
