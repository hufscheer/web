import { ComponentProps } from 'react';

import { useModal } from './hooks';

type ModalTriggerProps = {
  onClick?: () => void;
} & ComponentProps<'button'>;

const ModalTrigger = ({
  onClick,
  className,
  children,
  ...props
}: ModalTriggerProps) => {
  const { onOpenToggle } = useModal();

  const handleClick = () => {
    onOpenToggle();
    onClick?.();
  };

  return (
    <button className={className} {...props} onClick={handleClick}>
      {children}
    </button>
  );
};

export default ModalTrigger;
