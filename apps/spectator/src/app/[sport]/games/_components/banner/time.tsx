interface TimeProps {
  startTime: string;
}

export const Time = ({ startTime }: TimeProps) => {
  const date = new Date(startTime);
  const matchDate = date.toLocaleDateString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    timeZone: 'Asia/Seoul',
  });
  const matchTime = date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'Asia/Seoul',
  });

  return (
    <div className="flex flex-col items-center text-center text-xs font-medium text-greyscale-300">
      <span>{matchDate}</span>
      <span>{matchTime}</span>
    </div>
  );
};
