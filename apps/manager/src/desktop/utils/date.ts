const KST = 'Asia/Seoul';

export const todayInKst = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: KST,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

/** 서버가 주는 LocalDateTime 은 이미 한국 시각이라 앞 10자리가 곧 날짜다 */
const dateOf = (iso: string) => iso.slice(0, 10);

export const timeOf = (iso: string) => iso.slice(11, 16);

export const monthDay = (iso: string) => {
  const [, month, day] = dateOf(iso).split('-');
  return `${Number(month)}.${Number(day)}`;
};

export const dateDot = (iso: string) => dateOf(iso).replaceAll('-', '. ');

export const period = (startAt: string, endAt: string) => `${dateDot(startAt)} ~ ${dateDot(endAt)}`;
