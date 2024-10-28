import { CaretDownIcon } from '@hcc/icons';
import dayjs from 'dayjs';
import { ComponentProps } from 'react';
import ReactCalendar, { TileClassNameFunc } from 'react-calendar';

import './styles.css';
import Icon from '../icon';

export const Calendar = (props: ComponentProps<typeof ReactCalendar>) => {
  const tileClassName: TileClassNameFunc = ({ date, view }) => {
    if (view === 'month') {
      const day: number = date.getDay();
      if (day === 0) return 'react-calendar__tile--sunday';
      if (day === 6) return 'react-calendar__tile--saturday';
    }
    return null;
  };

  return (
    <ReactCalendar
      calendarType="gregory"
      prev2Label={null}
      next2Label={null}
      minDetail="month"
      maxDetail="month"
      formatDay={(_, date) => dayjs(date).format('D')}
      navigationLabel={({ date }) => dayjs(date).format('M월')}
      tileClassName={tileClassName}
      nextLabel={
        <Icon
          source={CaretDownIcon}
          size="sm"
          style={{ transform: 'rotate(-90deg)' }}
        />
      }
      prevLabel={
        <Icon
          source={CaretDownIcon}
          size="sm"
          style={{ transform: 'rotate(90deg)' }}
        />
      }
      {...props}
    />
  );
};
