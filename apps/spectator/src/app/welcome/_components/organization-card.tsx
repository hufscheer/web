'use client';

import { CaretRightIcon } from '@hcc/icons';
import Image from 'next/image';

import type { OrganizationType } from '~/api';

import { RadioCard } from '~/components/radio-card';

type Props = OrganizationType;

export const OrganizationCard = ({ id, name, logoImageUrl, isLeagueOngoing }: Props) => {
  return (
    <RadioCard.Root value={id}>
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center rounded-full bg-neutral-200 px-3 py-1 text-xs leading-[1.5] font-semibold tracking-[0%] text-neutral-400 in-data-checked:bg-[var(--color-primary-600)] in-data-checked:text-white">
            {isLeagueOngoing ? '대회 진행 중' : '대회 진행 예정'}
            <CaretRightIcon />
          </div>

          <RadioCard.Indicator />
        </div>

        <div className="flex items-center gap-3">
          <Image
            src={logoImageUrl ?? '/images/fallback-image.webp'}
            width={36}
            height={36}
            alt={`${name} 로고`}
            className="size-9 shrink-0 rounded-full object-contain"
          />

          <span className="text-md truncate leading-[1.5] font-semibold tracking-[-1%] text-neutral-400 in-data-checked:text-[var(--color-primary-600)]">
            {name}
          </span>
        </div>
      </div>
    </RadioCard.Root>
  );
};
