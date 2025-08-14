import { CheckCircleIcon, ErrorIcon } from '@hcc/icons';
import type { CSSProperties } from 'react';
import { Toaster as BaseToaster, toast } from 'sonner';
import { colors } from '../token';
import styles from './Toast.module.css';

export const Toaster = () => {
  return (
    <BaseToaster
      position="bottom-center"
      toastOptions={{
        className: styles.toast,
        style: {
          '--normal-text': colors.white,
          '--normal-bg': colors.toast,
        } as CSSProperties,
      }}
      icons={{
        success: <CheckCircleIcon size={26} style={{ color: colors.green600 }} />,
        error: <ErrorIcon size={26} style={{ color: colors.danger600 }} />,
      }}
    />
  );
};

export { toast };
