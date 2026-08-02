import { colors, Typography } from '@hcc/ui';

export const ErrorMessage = () => {
  return (
    <Typography className="p-5 text-center" color={colors.neutral500} fontSize={14} weight="medium">
      알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해 주세요.
    </Typography>
  );
};
