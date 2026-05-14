'use client';

import { Radio } from '@base-ui/react';
import { CaretRightIcon, CheckCircleFillIcon } from '@hcc/icons';
import Image from 'next/image';

import type { OrganizationType } from '~/api';

type Props = OrganizationType;

export const OrganizationCard = ({ id, name, logoImageUrl, isLeagueOngoing }: Props) => {
  return (
    <Radio.Root
      value={id}
      nativeButton
      render={<button />}
      className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border border-neutral-300 bg-white p-4 transition-colors hover:bg-greyscale-25 data-checked:border-(--color-primary-600) data-checked:bg-[#EEF6FF]"
    >
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center rounded-full bg-neutral-200 px-3 py-1 text-xs leading-[1.5] font-semibold tracking-[0%] text-neutral-400 in-data-checked:bg-[var(--color-primary-600)] in-data-checked:text-white">
            {isLeagueOngoing ? '대회 진행 중' : '대회 진행 예정'}
            <CaretRightIcon />
          </div>

          <Radio.Indicator
            keepMounted
            className="flex size-5 items-center justify-center rounded-full border-1 border-neutral-200 bg-transparent in-data-checked:border-(--color-primary-600) in-data-checked:bg-(--color-primary-600) data-[state=unchecked]:border-neutral-200"
          >
            <CheckCircleFillIcon className="hidden h-full w-full text-(--color-primary-600) in-data-checked:block" />
          </Radio.Indicator>
        </div>

        <div className="flex items-center gap-3">
          <Image
            src={logoImageUrl ?? '/images/fallback-image.webp'}
            width={36}
            height={36}
            alt={`${name} 로고`}
            className="size-9 shrink-0 rounded-full object-contain"
          />

          <span className="text-md truncate leading-[1.5] font-semibold tracking-[-1%] text-neutral-400 in-data-checked:text-[var(--color-primary-600)] ">
            {name}
          </span>
        </div>
      </div>
    </Radio.Root>
  );
};

//  <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
//         <span
//           className={cn(
//             'inline-flex items-center gap-0.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
//             selected
//               ? 'bg-[var(--color-primary-600)] text-white'
//               : 'bg-neutral-200 text-neutral-400',
//           )}
//         >
//           {selected ? '대회 진행 중' : '대회 진행 예정'}
//           <ChevronForwardIcon width={12} height={12} />
//         </span>

//         <div className="flex items-center gap-2">
//           {/* 로고 슬롯: 추후 실제 이미지로 교체. 현재는 더미 원형 */}
//           <div className="size-9 shrink-0 rounded-full bg-neutral-200" aria-hidden />
//           <span
//             className={cn(
//               'truncate text-lg font-bold transition-colors',
//               selected ? 'text-[var(--color-primary-600)]' : 'text-neutral-400',
//             )}
//           >
//             {displayName}
//           </span>
//         </div>
//       </div>

//       <span className="shrink-0" aria-hidden>
//         {selected ? (
//           <CheckCircleFillIcon width={24} height={24} color="var(--color-primary-600)" />
//         ) : (
//           <span className="block size-6 rounded-full border-2 border-neutral-200" />
//         )}
//       </span>
