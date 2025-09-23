import { formatTime } from '@hcc/toolkit';
import type { CheerTalkType } from '~/api/types/cheer-talk';

type Props = {
  cheerTalk: CheerTalkType;
};
const CheerTalkCard = ({ cheerTalk }: Props) => {
  return (
    <div className="flex w-[80%] flex-col gap-1 rounded-lg bg-[#FBFBFC] px-3 py-2">
      <span className="font-medium text-[#79828C] text-sm">
        {formatTime(cheerTalk.createdAt, {
          format: 'YYYY년 MM월 DD일 HH:mm',
          locale: 'ko',
        })}
      </span>
      <p className="font-medium text-[#141B21] text-base">{cheerTalk.content}</p>
      <p className="font-light text-[#79828C] text-sm">
        {cheerTalk.leagueName} - {cheerTalk.gameName}
      </p>
    </div>
  );
};

export default CheerTalkCard;
