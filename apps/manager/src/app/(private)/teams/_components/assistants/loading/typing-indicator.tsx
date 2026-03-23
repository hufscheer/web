'use client';

import { Typography } from '@hcc/ui';
import { motion } from 'framer-motion';
import Image from 'next/image';

import hccLogo from '~/app/icon.png';

export const TypingIndicator = () => {
  return (
    <div className="mb-8 flex justify-start gap-3">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#4354F0]">
        <Image src={hccLogo} width={36} height={36} alt="훕치치 로고" />
      </div>

      <div className="flex flex-col gap-3">
        <Typography fontSize={12} weight="medium">
          훕치치 어시스턴트가 처리중이에요
          <br />
          금방 도와드릴게요
        </Typography>
        <div className="my-1 flex items-center gap-1">
          {[0, 0.15, 0.3].map((delay, i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-[#4354F0]"
              animate={{ y: [0, -10, 0] }}
              transition={{
                delay,
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
