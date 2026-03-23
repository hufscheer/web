'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ChatMessageProps = {
  type: 'assistant' | 'user';
  message: string;
  assistantLogo?: React.ReactNode;
};

export const ChatMessage = ({ type, message, assistantLogo }: ChatMessageProps) => {
  const isAssistant = type === 'assistant';
  const [isExpanded, setIsExpanded] = useState(false);

  const maxChars = 30 * 3;
  const isTruncatable = !isAssistant && message.length > maxChars;
  const displayMessage = isTruncatable && !isExpanded ? message.slice(0, maxChars) : message;

  return (
    <div className={twMerge('flex gap-3 mb-8', isAssistant ? 'justify-start' : 'justify-end')}>
      {isAssistant && (
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#4354F0]">
          {assistantLogo}
        </div>
      )}

      <div
        className={twMerge('flex flex-col gap-3', isAssistant ? 'max-w-[40ch]' : 'max-w-[30ch]')}
      >
        <div
          className={twMerge(
            'text-sm break-words whitespace-pre-line',
            isAssistant ? 'text-gray-900' : 'rounded-lg bg-[#F2F8FF] text-gray-900 p-2',
          )}
        >
          {displayMessage}
          {isTruncatable && (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="text-primary mt-1 block w-full text-right text-xs"
            >
              {isExpanded ? '접기' : '더보기'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
