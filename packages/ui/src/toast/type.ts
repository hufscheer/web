import { ReactNode } from 'react';

export type Toast = {
  id: string;
  message: ReactNode;
  duration: number;
};

export type CreateToastParams = Omit<Toast, 'id'>;

export type TCreateToast = ({ message, duration }: CreateToastParams) => void;
