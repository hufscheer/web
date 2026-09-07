'use client';

import { CaretRightIcon } from '@hcc/icons';
import { BottomSheet } from '@hcc/ui';
import Image from 'next/image';

import basketballBracket from './basketball.png';
import mensSoccerBracket from './mens-soccer.png';
import womensSoccerBracket from './womens-soccer.png';

interface BracketSheetProps {
  leagueName: string;
}

const getBracketImage = (leagueName: string) => {
  const normalizedName = leagueName.replace(/\s/g, '');

  if (normalizedName.includes('여자축구')) return womensSoccerBracket;
  if (normalizedName.includes('남자축구')) return mensSoccerBracket;
  if (normalizedName.includes('농구')) return basketballBracket;

  return null;
};

export const BracketSheet = ({ leagueName }: BracketSheetProps) => {
  const bracketImage = getBracketImage(leagueName);

  return (
    <BottomSheet>
      <BottomSheet.Trigger
        aria-label="대진표 보기"
        className="inline-flex cursor-pointer items-center truncate rounded-full border border-[#007AFF] px-3 py-1 text-xs leading-[1.5] font-medium tracking-[0%] text-[#007AFF] transition-colors hover:bg-(--color-primary-100)"
      >
        <span>대진표</span>
        <CaretRightIcon width={16} height={16} />
      </BottomSheet.Trigger>

      <BottomSheet.Content className="max-h-[90vh]">
        <BottomSheet.Header className="!flex flex-row items-start justify-between !px-5">
          <BottomSheet.Title>대진표</BottomSheet.Title>
        </BottomSheet.Header>

        <div className="max-h-[calc(90vh-5rem)] overflow-auto px-5 pb-6">
          {bracketImage ? (
            <Image
              src={bracketImage}
              alt="대진표"
              className="h-auto w-full object-contain"
              priority
            />
          ) : (
            <p className="py-10 text-center text-sm text-neutral-500">
              대진표 이미지를 준비 중입니다.
            </p>
          )}
        </div>
      </BottomSheet.Content>
    </BottomSheet>
  );
};
