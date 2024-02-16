import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode } from 'react';

import * as styles from './styles.css';

interface TooltipProps {
  children: ReactNode;
  content: string;
  position: 'top' | 'right' | 'bottom' | 'left';
  arrowPosition?:
    | 'center'
    | 'leftStart'
    | 'left'
    | 'right'
    | 'rightEnd'
    | 'topStart'
    | 'top'
    | 'bottom'
    | 'bottomEnd';
  isVisible: boolean;
}

const Tooltip = ({
  children,
  content,
  position,
  arrowPosition = 'center',
  isVisible,
}: TooltipProps) => {
  return (
    <div className={styles.tooltipContainer}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`${styles.tooltipContent} ${styles.tooltipPosition[position]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {content}
            <span
              className={`${styles.arrow} ${styles.arrowPosition[position]} ${styles.arrowAlign[arrowPosition]}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
