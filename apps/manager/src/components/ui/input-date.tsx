'use client';

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarMonthIcon } from '@hcc/icons';
import { Drawer } from 'vaul';
import { Button } from '@hcc/ui';
import 'react-day-picker/dist/style.css';

type InputDateProps = {
  label: string;
  value?: Date;
  onSelect?: (date?: Date) => void;
};

export const InputDate = ({ label, value, onSelect }: InputDateProps) => {
  //const [date, setDate] = useState<Date | undefined>();
  const formattedDate = value ? format(value, 'yyyy년 MM월 dd일') : null;

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button
          type="button"
          className="group relative flex h-15 w-full cursor-pointer items-center rounded-lg border border-neutral-100 bg-white px-4 text-left"
        >
          <div className="w-full">
            <p
              className={`pointer-events-none absolute font-medium text-neutral-400 transition-all ${
                value ? 'top-2 text-xs' : '-translate-y-1/2 top-1/2 text-base'
              } group-data-[state=open]:-translate-y-0 group-data-[state=open]:top-2 group-data-[state=open]:text-xs`}
            >
              {label}
            </p>
            {value && <p className="pt-4 font-medium text-base text-black">{formattedDate}</p>}
          </div>
          <CalendarMonthIcon className={value ? 'text-black' : 'text-gray-500'} />
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 mt-24 flex flex-col rounded-t-lg bg-white">
          <div className="flex-1 rounded-t-lg p-4">
            <div className="mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
            <Drawer.Title className="mb-4 text-center font-semibold text-lg">{label}</Drawer.Title>
            <div className="flex justify-center">
              <DayPicker locale={ko} mode="single" selected={value} onSelect={onSelect} />
            </div>
            <Drawer.Close asChild>
              <Button size="lg" className="mt-4 w-full">
                확인
              </Button>
            </Drawer.Close>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
