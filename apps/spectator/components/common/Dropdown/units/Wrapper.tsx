import { ComponentProps, createContext } from 'react';

interface DropdownProps extends DropdownContextType, ComponentProps<'div'> {}

type DropdownContextType = {
  label?: string;
};

export const DropdownContext = createContext<DropdownContextType>({
  label: '',
});

export default function DropdownWrapper({
  className,
  children,
  ...props
}: DropdownProps) {
  return (
    <DropdownContext.Provider value={{ ...props }}>
      <div className={className}>{children}</div>
    </DropdownContext.Provider>
  );
}
