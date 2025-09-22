'use client';

import { colors, Typography } from '@hcc/ui';
import { useSuspenseGameVideo } from '~/api';

type Props = {
  gameId: number;
};

export const VideoTab = ({ gameId }: Props) => {
  const { data } = useSuspenseGameVideo({ gameId });

  if (!data || !data.videoId) {
    return (
      <Typography
        className="p-5 text-center"
        color={colors.neutral500}
        fontSize={14}
        weight="medium"
      >
        경기 하이라이트가 등록되지 않았어요.
      </Typography>
    );
  }

  return (
    <div className="bg-white p-5">
      <iframe
        className="aspect-video w-full rounded-lg border-none"
        src={data.videoId.replace('watch?v=', 'embed/').replace('live', 'embed')}
        title="Match Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};
