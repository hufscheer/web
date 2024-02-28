import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ElementType, forwardRef, useEffect } from 'react';

import { useDialog } from './hooks';
import * as styles from './styles.css';
import {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from './type';

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const dialogVariants = {
  hidden: { y: 8, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

type DialogContentProps = {
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  backdropColor?: string;
  children: React.ReactNode;
};

type Props<C extends ElementType> = PolymorphicComponentProps<
  C,
  DialogContentProps
>;
type ContentType = <C extends ElementType = 'div'>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => React.ReactNode;

const DialogContent: ContentType = forwardRef(function DialogContent<
  C extends ElementType = 'div',
>(
  {
    disableBackdropClick = false,
    disableEscapeKeyDown = false,
    backdropColor = 'rgba(0, 0, 0, 0.5)',
    className,
    children,
  }: Props<C>,
  ref: PolymorphicRef<C>,
) {
  const { open, onOpenChange } = useDialog();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !disableEscapeKeyDown) onOpenChange(false);
    };

    if (open) document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, disableEscapeKeyDown, onOpenChange]);

  const handleBackdropClick = () => {
    if (!disableBackdropClick) onOpenChange(false);
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className={styles.backdrop}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
          style={{ backgroundColor: backdropColor }}
        >
          <motion.div
            ref={ref}
            className={clsx(styles.content, className)}
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={e => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default DialogContent;
