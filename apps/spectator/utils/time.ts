const weekdays = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const parseTimeString = (timeString: string) => {
  const date = new Date(timeString + 'Z');

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    weekday: weekdays[date.getDay()],
    period: date.getHours() >= 12 ? '오후' : '오전',
    hours: date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};
