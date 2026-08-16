import { ErrorIcon } from '@hcc/icons';
import { Popover } from '@hcc/ui';

export const HeroBanner = () => {
  return (
    <div className="flex flex-col gap-2.5 py-2.5">
      <div className="text-2xl leading-[1.32] font-bold tracking-[-2%]">
        <div>우리 학교 스포츠 경기,</div>
        <div>
          <span className="text-[#007aFF]">훕치치</span>로 같이 응원해요 !
        </div>
      </div>

      <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-1%] text-greyscale-300">
        응원할 학교를 선택해주세요
        <Popover label="학교 선택 안내" openOnHover trigger={<ErrorIcon />}>
          훕치치 서비스에 등록된 학교만 사용할 수 있어요
        </Popover>
      </div>
    </div>
  );
};
