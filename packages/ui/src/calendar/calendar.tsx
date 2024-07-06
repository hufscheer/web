import { CaretDownIcon } from '@hcc/icons';
import dayjs from 'dayjs';
import { ComponentProps } from 'react';
import ReactCalendar from 'react-calendar';

import './styles.css';
import Icon from '../icon';

export const Calendar = (props: ComponentProps<typeof ReactCalendar>) => {
  return (
    <ReactCalendar
      calendarType="iso8601"
      prev2Label={null}
      next2Label={null}
      minDetail="month"
      maxDetail="month"
      formatDay={(_, date) => dayjs(date).format('D')}
      navigationLabel={({ date }) => dayjs(date).format('M월')}
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
