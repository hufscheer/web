'use client';

import { Button } from '@hcc/ui';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type PlayerData = {
  name: string;
  studentNumber: string;
  jerseyNumber: number | null;
  error?: string;
};

type ChatMessageProps = {
  type: 'assistant' | 'user';
  message: string;
  assistantLogo?: React.ReactNode;
  players?: PlayerData[];
  onEdit?: () => void;
  onConfirm?: () => void;
};

export const ChatMessage = ({
  type,
  message,
  assistantLogo,
  players,
  onEdit,
  onConfirm,
}: ChatMessageProps) => {
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

        {isAssistant && players && players.length > 0 && (
          <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">{'{teamname}'}의 선수 명단</p>
              <p className="text-primary text-xs">총 {players.length}명의 선수를 인식했어요.</p>
            </div>

            <table className="w-full text-center text-xs">
              <thead>
                <tr className="text-left text-gray-500 ">
                  <th className="pb-2 font-medium">선수이름</th>
                  <th className="pb-2 font-medium">학번</th>
                  <th className="pb-2 font-medium">등번호</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, i) => (
                  <tr key={i}>
                    <td className="py-1 pr-2">
                      <div className="rounded-lg border border-gray-200 px-2 py-1 text-center">
                        {player.name}
                      </div>
                    </td>
                    <td className="py-1 pr-2">
                      <div
                        className={twMerge(
                          'rounded-lg border px-2 py-1 text-center',
                          player.error ? 'border-red-400' : 'border-gray-200',
                        )}
                      >
                        {player.studentNumber}
                      </div>
                    </td>
                    <td className="py-1">
                      <div className="rounded-lg border border-gray-200 px-2 py-1 text-center">
                        {player.jerseyNumber ?? ''}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {players.some((p) => p.error) && (
              <ul className="flex flex-col gap-1">
                {players
                  .filter((p) => p.error)
                  .map((p, i) => (
                    <li key={i} className="flex items-center gap-1 text-xs text-red-400">
                      <span>•</span> {p.error}
                    </li>
                  ))}
              </ul>
            )}

            <div className="flex gap-2">
              <Button
                color="primary"
                variant="ghost"
                onClick={onEdit}
                className="flex-1 rounded-lg border border-gray-300 py-2 text-sm text-gray-700"
              >
                수정
              </Button>
              <Button
                color="primary"
                onClick={onConfirm}
                className="flex-1 rounded-lg border border-gray-300 py-2 text-sm text-gray-700"
              >
                확인
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
