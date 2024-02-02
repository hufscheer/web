import { MouseEvent, ReactNode, useState } from 'react';

import { Dropdown } from '@/components/common/Dropdown';

import { panel } from './Panel.css';

type PanelProps = {
  options: Array<{ label: string }>;
  children: ({ selected }: { selected: string }) => ReactNode;
  defaultValue: string;
};

export default function Panel({ defaultValue, options, children }: PanelProps) {
  const [selected, setSelected] = useState(defaultValue);

  const handleClickItem = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedValue = (e.target as Element).textContent;

    if (!selectedValue) return;
    if (selected === selectedValue) return;

    setSelected(selectedValue);
  };

  return (
    <div>
      <Dropdown className={panel.wrapper}>
        <Dropdown.Menu className={panel.menu}>
          {options.map(option => (
            <Dropdown.Item
              onClick={handleClickItem}
              key={option.label}
              className={
                selected === option.label ? panel.itemSelected : panel.item
              }
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
        {children({ selected })}
      </Dropdown>
    </div>
  );
}
