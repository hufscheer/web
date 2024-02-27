import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ElementType, forwardRef, useEffect } from 'react';

import { useModal } from './hooks';
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

const modalVariants = {
  hidden: { y: 8, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

type ModalContentProps = {
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  backdropColor?: string;
  children: React.ReactNode;
};

type Props<C extends ElementType> = PolymorphicComponentProps<
  C,
  ModalContentProps
>;
type ContentType = <C extends ElementType = 'div'>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => React.ReactNode;

const ModalContent: ContentType = forwardRef(function ModalContent<
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
  const { open, onOpenChange } = useModal();

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
            className={clsx(styles.modal, className)}
            variants={modalVariants}
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

export default ModalContent;

// import { clsx } from 'clsx';
// import { motion } from 'framer-motion';
// import { ElementType, forwardRef, useEffect } from 'react';

// import { useModal } from './hooks';
// import * as styles from './styles.css';
// import {
//   PolymorphicComponentProps,
//   PolymorphicComponentPropsWithRef,
//   PolymorphicRef,
// } from './type';

// const modalVariants = {
//   hidden: { y: 8, opacity: 0 },
//   visible: { y: 0, opacity: 1 },
// };

// type ModalContentProps = {
//   disableBackdropClick?: boolean;
//   disableEscapeKeyDown?: boolean;
//   children: React.ReactNode;
// };

// type Props<C extends ElementType> = PolymorphicComponentProps<
//   C,
//   ModalContentProps
// >;
// type ContentType = <C extends ElementType = 'div'>(
//   props: PolymorphicComponentPropsWithRef<C, Props<C>>,
// ) => React.ReactNode;

// const ModalContent: ContentType = forwardRef(function ModalContent<
//   C extends ElementType = 'div',
// >(
//   { disableEscapeKeyDown = false, className, children }: Props<C>,
//   ref: PolymorphicRef<C>,
// ) {
//   const { open, onOpenChange } = useModal();

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape' && !disableEscapeKeyDown) onOpenChange(false);
//     };

//     if (open) document.addEventListener('keydown', handleKeyDown);

//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [open, disableEscapeKeyDown, onOpenChange]);

//   return (
//     <>
//       {open && (
//         <motion.div
//           ref={ref}
//           className={clsx(styles.modal, className)}
//           variants={modalVariants}
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//           onClick={e => e.stopPropagation()}
//         >
//           {children}
//         </motion.div>
//       )}
//     </>
//   );
// });

// export default ModalContent;
