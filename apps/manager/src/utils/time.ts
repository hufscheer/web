import dayjs, { Dayjs, locale } from 'dayjs';
import 'dayjs/locale/ko';

locale('ko');

export const formatTime = (time: string | Date | Dayjs, format: string, locale = 'ko') => {
  return dayjs(time).locale(locale).format(format);
};

export const isFutureFromNow = (time: string | Date) => {
  return dayjs(time).isAfter(dayjs());
};

export const isPastFromNow = (time: string | Date) => {
  return dayjs(time).isBefore(dayjs());
};

export const isCurrentTimeBetween = (start: string | Date, end: string | Date) => {
  return isPastFromNow(start) && isFutureFromNow(end);
};

export const convertToServerTime = (time: string | Date | Dayjs) => {
  return formatTime(time, 'YYYY-MM-DDTHH:mm:ss');
};
