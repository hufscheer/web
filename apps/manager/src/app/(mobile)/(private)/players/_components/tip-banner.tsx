import { Typography } from '@hcc/ui';

export const TipBanner = () => {
  return (
    <div className="column w-full gap-1 bg-neutral-100 p-5">
      <Typography weight="semibold">🙌🏻 선수를 팀에 소속시키는 법</Typography>
      <Typography color="var(--color-neutral-500)" fontSize={14}>
        신규 대회를 만든 뒤 참가 팀 관리 탭에서 선수를 팀에 등록할 수 있어요.
      </Typography>
    </div>
  );
};
