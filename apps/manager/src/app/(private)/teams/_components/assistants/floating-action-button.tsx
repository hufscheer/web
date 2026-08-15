'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import hccLogo from '../../../../icon.png';

type Props = {
  onClick: () => void;
};

export const FloatingActionButton = ({ onClick }: Props) => {
  return (
    <div className="sm:right-6 sm:bottom-40 fixed right-4 bottom-36 z-40 flex items-center gap-4 md:right-8 md:bottom-44">
      <div className="relative">
        <div className="rounded-lg border border-white bg-(--color-primary-600) px-4 py-2.5 text-sm whitespace-nowrap text-white">
          팀 선수를 일괄 등록해보세요
        </div>
        <div
          style={{
            position: 'absolute',
            right: '-8px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderLeft: '10px solid var(--color-primary-600)',
          }}
        />
      </div>

      <button
        type="button"
        onClick={onClick}
        className={twMerge(
          'w-14 sm:w-15 h-14 sm:h-15 rounded-full flex-shrink-0',
          'bg-(--color-primary-600) hover:bg-primary-dark text-white transition-colors border-4 border-(--color-primary-600)',
          'flex items-center justify-center shadow-lg',
        )}
      >
        <Image src={hccLogo} width={60} height={60} alt="logo" />
      </button>
    </div>
  );
};
