interface TimeProps {
  date: string;
  time: string;
}

export const Time = ({ date, time }: TimeProps) => {
  return (
    <div className="flex flex-col items-center text-center text-xs font-medium text-greyscale-300">
      <span>{date}</span>
      <span>{time}</span>
    </div>
  );
};
