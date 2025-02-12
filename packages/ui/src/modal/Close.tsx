import { CrossIcon } from '@hcc/icons';
import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import { useModal } from './hooks';
import * as styles from './styles.css';
import Icon from '../icon';

type ModalCloseProps = {
  onClick?: () => void;
} & ComponentProps<'button'>;

const ModalClose = ({
  onClick,
  children,
  className,
  ...props
}: ModalCloseProps) => {
  const { onOpenChange } = useModal();

  const handleOnClick = () => {
    if (onClick) onClick();
    onOpenChange(false);
  };

  if (children) {
    return (
      <button className={className} {...props} onClick={handleOnClick}>
        {children}
      </button>
    );
  }

  return (
    <button
      {...props}
      onClick={handleOnClick}
      className={clsx(styles.close, className)}
    >
      <Icon source={CrossIcon} size="xs" />
    </button>
  );
};

export default ModalClose;
