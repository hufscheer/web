import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import React, { useEffect } from 'react';

import { useModal } from './hooks';
import * as styles from './styles.css';

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
} & MotionProps;

const ModalContent = ({
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  variants = modalVariants,
  backdropColor = 'rgba(0, 0, 0, 0.5)',
  children,
  ...props
}: ModalContentProps) => {
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
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={e => e.stopPropagation()}
            {...props}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalContent;
