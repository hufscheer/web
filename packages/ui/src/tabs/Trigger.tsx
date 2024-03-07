import useTabs from './hooks';

type TabsTriggerProps = {
  value: string;
  className?: (state: DataState) => string;
  children: React.ReactNode;
};

type DataStateParams = {
  value: string;
  stateValue: string;
};
type DataState = 'active' | 'inactive';

const getDataState = ({ value, stateValue }: DataStateParams) => {
  return stateValue === value ? 'active' : 'inactive';
};

const TabsTrigger = ({ value, className, children }: TabsTriggerProps) => {
  const { value: stateValue, setValue } = useTabs();
  const activeState = getDataState({ value, stateValue });

  return (
    <button
      onClick={() => setValue(value)}
      data-state={activeState}
      className={className && className(activeState)}
    >
      {children}
    </button>
  );
};

export default TabsTrigger;
