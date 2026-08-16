import { Button, Input, Typography } from '@hcc/ui';
import { useFormContext } from 'react-hook-form';

import type { GameFormType } from '~/api';

type Props = {
  onPrevious: () => void;
};

export const VideoStep = ({ onPrevious }: Props) => {
  const { register } = useFormContext<GameFormType>();

  return (
    <>
      <Typography className="mt-4" weight="semibold">
        영상
      </Typography>

      <div className="column mt-4 gap-3">
        <Input size="lg" type="text" placeholder="영상 URL" {...register('videoId')} />
      </div>

      <div className="column mt-6 w-full gap-2">
        <Button type="button" onClick={onPrevious} variant="subtle" color="black" size="lg">
          이전 단계
        </Button>
        <Button type="submit" size="lg" color="black">
          완료
        </Button>
      </div>
    </>
  );
};
