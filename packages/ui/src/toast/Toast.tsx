import { Toaster as BaseToaster, toast } from 'sonner';
import styles from './Toast.module.css';

export const Toaster = () => {
  return <BaseToaster position="bottom-center" toastOptions={{ className: styles.toast }} />;
};

export { toast };
