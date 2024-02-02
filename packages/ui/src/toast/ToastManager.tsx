import { useCallback, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import * as styles from './toast.css';
import ToastItem from './ToastItem';
import { CreateToastParams, TCreateToast, Toast } from './type';

interface ToastManagerProps {
  bind: (createToast: TCreateToast) => void;
}

const ToastManager = ({ bind }: ToastManagerProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const createToast = useCallback(
    ({ message, duration }: CreateToastParams) => {
      const newToast = { id: v4(), message, duration };

      setToasts([newToast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  useEffect(() => {
    bind(createToast);
  }, [bind, createToast]);

  return (
    <div className={styles.root}>
      {toasts.map(({ id, message, duration }) => (
        <ToastItem
          key={id}
          id={id}
          message={message}
          duration={duration}
          onDone={() => removeToast(id)}
        />
      ))}
    </div>
  );
};

export default ToastManager;
