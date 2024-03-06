import useTabs from './hooks';

type TabsContentProps = {
  value: string;
  className?: string;
  children: React.ReactNode;
};

const TabsContent = ({ value, className, children }: TabsContentProps) => {
  const { value: valueState } = useTabs();

  return value === valueState && <div className={className}>{children}</div>;
};

export default TabsContent;
