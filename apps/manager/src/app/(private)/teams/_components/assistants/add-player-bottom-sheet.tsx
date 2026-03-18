'use client';

import { SendFillIcon } from '@hcc/icons';
import { BottomSheet } from '@hcc/ui';
import Image from 'next/image';
import { useRef, useEffect, useState, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

import hccLogo from '../../../../icon.png';
import { ChatMessage } from './chat-message';

export type ChatMessageType = {
  id: string;
  type: 'assistant' | 'user';
  message: string;
  players?: {
    name: string;
    studentNumber: string;
    jerseyNumber: number;
    error?: string;
  }[];
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  messages?: ChatMessageType[];
  children?: React.ReactNode;
};

export const AddPlayerBottomSheet = ({ isOpen, onOpenChange, children }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [displayMessages, setDisplayMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      type: 'assistant',
      message:
        '안녕하세요, 훕치치 어시스턴트입니다.\n매니저님들의 원활한 서비스 이용을 돕고자합니다.',
    },
    {
      id: '2',
      type: 'assistant',
      message:
        '{teamname}의 선수 등록을 도와드릴게요!\n선수들의 이름, 학번, 등번호가 적힌 텍스트를 입력해주세요.',
    },
    {
      id: '3',
      type: 'user',
      message:
        '태국학과 202201077 김하정 1 태국학과 202201078 홍길동 3 태국학과 202201078 김이정 2',
    },
    {
      id: '4',
      type: 'assistant',
      message: '확인 감사해요.\n확인해주신 정보가 아래 정보가 맞는지 확인해주세요!',
      players: [
        { name: '김하정', studentNumber: '202201077', jerseyNumber: 1 },
        { name: '홍길동', studentNumber: '202201078', jerseyNumber: 3 },
        {
          name: '김이정',
          studentNumber: '20220107',
          jerseyNumber: 2,
          error: '학번이 9자리가 아닙니다.',
        },
        { name: '김이정', studentNumber: '202201078', jerseyNumber: 2 },
      ],
    },
  ]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => scrollToBottom(), 100);
    }
  }, [displayMessages, isOpen]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputValue.trim()) return;

      const newMessage: ChatMessageType = {
        id: Date.now().toString(),
        type: 'user',
        message: inputValue,
      };

      setDisplayMessages((prev) => [...prev, newMessage]);
      setInputValue('');
      setTimeout(() => scrollToBottom(), 100);
    },
    [inputValue],
  );

  const placeholder = '훕치치 어시스턴트를 활용해보세요';

  return (
    <BottomSheet open={isOpen} onOpenChange={onOpenChange}>
      <BottomSheet.Content className="!bg-[#EBEBEB]">
        <BottomSheet.Header className={twMerge('mb-6')}>
          <BottomSheet.Title className={twMerge('px-6')}>훕치치 어시스턴트</BottomSheet.Title>
        </BottomSheet.Header>

        <div className={twMerge('px-6 h-[60vh] overflow-y-auto flex flex-col')}>
          <div className={twMerge('flex-1 overflow-y-auto')}>
            {displayMessages.map((msg) => (
              <ChatMessage
                key={msg.id}
                type={msg.type}
                message={msg.message}
                players={msg.players}
                assistantLogo={<Image src={hccLogo} width={36} height={36} alt="훕치치 로고" />}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={twMerge('border-t border-gray-200 pt-4 px-6 pb-4')}
        >
          <div className={twMerge('flex items-center gap-2')}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              className={twMerge(
                'flex-1 rounded-lg bg-gray-100 px-3 py-2 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-primary',
              )}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={twMerge(
                'p-2 rounded-full text-primary transition-colors',
                'hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed',
              )}
            >
              <SendFillIcon size={20} />
            </button>
          </div>
        </form>

        {children && <div className={twMerge('border-t border-gray-200 pt-4')}>{children}</div>}
      </BottomSheet.Content>
    </BottomSheet>
  );
};
