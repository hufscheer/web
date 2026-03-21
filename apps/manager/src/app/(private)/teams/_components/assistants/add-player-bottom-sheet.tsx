'use client';

import { SendFillIcon } from '@hcc/icons';
import { BottomSheet } from '@hcc/ui';
import Image from 'next/image';
import { useRef, useEffect, useState, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

import type { ParseNLPreview, ParsedPlayer } from '~/api/types/nl';

import { useParseNL } from '~/api/mutations/useParseNL';
import { useRegisterNL } from '~/api/mutations/useRegisterNL';

import hccLogo from '../../../../icon.png';
import { ChatMessage } from './chat-message';
import { RegistrationUI } from './registration-ui';

type PlayerData = {
  name: string;
  studentNumber: string;
  jerseyNumber: number | null;
  error?: string;
};

export type ChatMessageType = {
  id: string;
  type: 'assistant' | 'user';
  message: string;
  stage?: RegistrationStage; // 각 메시지의 UI stage
  players?: {
    name: string;
    studentNumber: string;
    jerseyNumber: number;
    error?: string;
  }[];
  failedLines?: string[];
};

type RegistrationStage =
  | 'input'
  | 'parse-result'
  | 'duplicate-check'
  | 'final-confirm'
  | 'final-list'
  | 'complete';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  messages?: ChatMessageType[];
  teamName?: string;
  children?: React.ReactNode;
};

export const AddPlayerBottomSheet = ({ isOpen, onOpenChange, teamName, children }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [stage, setStage] = useState<RegistrationStage>('input');
  const [latestPreview, setLatestPreview] = useState<ParseNLPreview | null>(null);
  const [duplicatePlayers, setDuplicatePlayers] = useState<ParsedPlayer[]>([]);
  const [finalPlayers, setFinalPlayers] = useState<ParsedPlayer[]>([]);
  const [isClosing, setIsClosing] = useState(false); // 중복 호출 방지
  const [displayMessages, setDisplayMessages] = useState<ChatMessageType[]>([]);

  const { mutate: parseNL, isPending: isParsing } = useParseNL();
  const { mutate: registerNL, isPending: isRegistering } = useRegisterNL();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => scrollToBottom(), 100);
    } else {
      // 바텀시트가 닫힐 때 상태 초기화
      setStage('input');
      setLatestPreview(null);
      setDuplicatePlayers([]);
      setFinalPlayers([]);
      setIsClosing(false);
      setDisplayMessages([
        {
          id: '1',
          type: 'assistant',
          stage: 'input',
          // [어시스턴트 멘트 1] 첫 인사말 (바텀시트 닫힐 때 초기화)
          message: `안녕하세요, 훕치치 어시스턴트입니다.\n매니저님들의 원활한 서비스 이용을 돕고자합니다. \n\n${teamName}의 선수 등록을 도와드릴게요!\n선수들의 이름, 학번, 등번호가 적힌 텍스트를 입력해주세요.`,
        },
      ]);
    }
  }, [isOpen, teamName]);

  // 1단계: Parse 결과 확인
  const handleConfirmParseResult = useCallback(
    (selected: { studentNumber: string }[]) => {
      if (!latestPreview) return;

      const selectedPlayers = latestPreview.players.filter((p) =>
        selected.some((s) => s.studentNumber === p.studentNumber),
      );

      // 사용자 메시지 추가
      const userMessage: ChatMessageType = {
        id: Date.now().toString(),
        type: 'user',
        message: '확인',
      };

      // 어시스턴트 메시지 추가 - final-confirm 단계
      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        stage: 'final-confirm',
        // [어시스턴트 멘트 3] parse 결과 확인 후 최종 명단 안내
        message: '이제 거의 다 왔어요! \n마지막으로 매니저님의 확인이 필요한 내용이 있어요.',
        players: selectedPlayers,
      };

      setDisplayMessages((prev) => [...prev, userMessage, assistantMessage]);
      setFinalPlayers(selectedPlayers);
      setStage('final-confirm');
      setTimeout(() => scrollToBottom(), 100);
    },
    [latestPreview],
  );

  // 1-2단계: Parse 결과 수정
  const handleEditParseResult = useCallback((edited: PlayerData[]) => {
    // 사용자 메시지 추가
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      message: '수정',
    };

    // 어시스턴트 메시지 추가 - 수정된 데이터를 새로운 parse-result 메시지로
    const assistantMessage: ChatMessageType = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      stage: 'parse-result',
      // [어시스턴트 멘트 4] 선수 명단 수정 후 재확인 안내
      message: `확인 감사해요. \n확인해주신 정보가 아래 정보가 맞는지 확인해주세요! \n
      추가 수정이 필요하다면 ‘수정'을, 정확하다면 ‘확인'을 눌러주세요.`,
      players: edited.map((p) => ({
        ...p,
        jerseyNumber: p.jerseyNumber ?? 0,
      })),
    };

    setDisplayMessages((prev) => [...prev, userMessage, assistantMessage]);
    setLatestPreview((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        players: edited.map((p) => ({ ...p, jerseyNumber: p.jerseyNumber ?? 0 })),
      };
    });
  }, []);

  // 2단계: 중복 선수 선택
  const handleSelectDuplicates = useCallback(
    (selected: ParsedPlayer[]) => {
      setDuplicatePlayers(selected);

      const now = Date.now();

      // 선택된 선수 "OOO 등록" 한 컴포넌트에 합쳐서 표시
      const userMessages: ChatMessageType[] = [
        {
          id: now.toString(),
          type: 'user' as const,
          message: selected.map((p) => `${p.name} 등록`).join('\n'),
        },
      ];

      // 최종 선수 명단 (기존 새 선수 + 선택된 중복 선수)
      const combinedPlayers = [...finalPlayers, ...selected];

      const names = selected.map((p) => p.name).join(', ');
      const assistantMessage: ChatMessageType = {
        id: (now + selected.length).toString(),
        type: 'assistant',
        stage: 'final-confirm',
        // [어시스턴트 멘트 5] 중복 선수 선택 후 최종 명단 안내
        message: `${names}을 ${teamName} 선수 명단에 추가하겠어요. 수고하셨어요!\n최종 확인 후에 선수 명단을 최종 등록할게요.`,
        players: combinedPlayers,
      };

      setDisplayMessages((prev) => [...prev, ...userMessages, assistantMessage]);
      setFinalPlayers(combinedPlayers);
      setStage('final-confirm');
      setTimeout(() => scrollToBottom(), 100);
    },
    [finalPlayers, teamName],
  );

  // 3단계: 최종 확인 - final-list 단계로 이동 (선수 명단 재확인 UI 표시)
  const handleFinalConfirm = useCallback(
    (selected: { studentNumber: string }[]) => {
      if (finalPlayers.length === 0) return;

      const selectedPlayers = finalPlayers.filter((p) =>
        selected.some((s) => s.studentNumber === p.studentNumber),
      );

      const now = Date.now();

      // 선택된 선수 "OOO 등록" 한 컴포넌트에 합쳐서 표시
      const userMessage: ChatMessageType = {
        id: now.toString(),
        type: 'user',
        message: selectedPlayers.map((p) => `${p.name} 등록`).join('\n'),
      };

      const names = selectedPlayers.map((p) => p.name).join(', ');
      // 어시스턴트 메시지 추가 - final-list 단계 (체크박스 없는 최종 명단 확인 UI)
      const assistantMessage: ChatMessageType = {
        id: (now + 1).toString(),
        type: 'assistant',
        stage: 'final-list',
        // [어시스턴트 멘트 6] 최종 확인 전 선수 명단 재확인 안내
        message: `${names}을 ${teamName} 선수 명단에 추가하겠어요. 수고하셨어요!\n최종 확인 후에 선수 명단을 최종 등록할게요.`,
        players: selectedPlayers,
      };

      setDisplayMessages((prev) => [...prev, userMessage, assistantMessage]);
      setFinalPlayers(selectedPlayers);
      setStage('final-list');
      setTimeout(() => scrollToBottom(), 100);
    },
    [finalPlayers, teamName],
  );

  // 4단계: 최종 명단 확인 후 complete 단계로 이동
  const handleFinalListConfirm = useCallback(() => {
    const now = Date.now();

    const userMessage: ChatMessageType = {
      id: now.toString(),
      type: 'user',
      message: '확인',
    };

    const assistantMessage: ChatMessageType = {
      id: (now + 1).toString(),
      type: 'assistant',
      stage: 'complete',
      // [어시스턴트 멘트 7] 등록 완료 전 종료 안내
      message: `${teamName}팀 선수 등록이 완료되었어요! 🎉 \n나중에 팀 정보를 수정할 수 있어요.`,
    };

    setDisplayMessages((prev) => [...prev, userMessage, assistantMessage]);
    setStage('complete');
    setTimeout(() => scrollToBottom(), 100);
  }, [teamName]);

  // 종료 - registerNL 호출 및 닫기
  const handleClose = useCallback(() => {
    // 중복 호출 방지
    if (isClosing || isRegistering) return;

    if (!teamName || finalPlayers.length === 0) {
      onOpenChange(false);
      return;
    }

    setIsClosing(true);

    registerNL(
      {
        team: {
          name: teamName,
          unit: '',
          teamColor: '',
          logoImageUrl: '',
        },
        players: finalPlayers,
      },
      {
        onSuccess: (data) => {
          const completionMessage: ChatMessageType = {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            stage: 'complete', // 이 메시지의 stage
            // [어시스턴트 멘트 7] 등록 완료 후 서버 응답 메시지 (API에서 자동으로 내려옴, 직접 수정 불가)
            message: data.displayMessage,
          };
          setDisplayMessages((prev) => [...prev, completionMessage]);

          // 초기화 후 닫기
          setTimeout(() => {
            setStage('input');
            setLatestPreview(null);
            setDuplicatePlayers([]);
            setFinalPlayers([]);
            setIsClosing(false);
            setDisplayMessages([]);
            onOpenChange(false);
          }, 500);
        },
        onError: (error) => {
          console.error('[RegisterNL Error]', error); // 디버깅용
          const errorMessage: ChatMessageType = {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            stage: 'complete',
            // [어시스턴트 멘트 8] 등록 실패 에러 메시지
            message: '죄송해요. 등록 중 오류가 발생했어요. 다시 시도해주세요.',
          };
          setDisplayMessages((prev) => [...prev, errorMessage]);
          setIsClosing(false);
        },
      },
    );
  }, [teamName, finalPlayers, registerNL, onOpenChange, isClosing, isRegistering]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!inputValue.trim() || isParsing) return;

      // 1. 사용자 메시지 추가
      const newUserMessage: ChatMessageType = {
        id: Date.now().toString(),
        type: 'user',
        message: inputValue,
      };

      setDisplayMessages((prev) => [...prev, newUserMessage]);

      // 2. parseNL API 호출 - history를 비워서 보냄
      parseNL(
        { history: [], message: inputValue },
        {
          onSuccess: (data) => {
            console.log('[ParseNL Success]', data);
            // preview가 null이면 커스텀 프론트 메시지 표시 (백엔드 메시지 미사용)
            if (!data.preview) {
              const errorMessage: ChatMessageType = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                stage: 'input',
                // [어시스턴트 멘트 - 입력 오류] 선수 정보를 인식하지 못했을 때
                message:
                  '선수 정보를 인식하지 못했어요.\n이름, 학번(9자리), 등번호 형식으로 다시 입력해주세요.\n예) 홍길동 202600001 10',
              };
              setDisplayMessages((prev) => [...prev, errorMessage]);
              return;
            }

            // 3. 어시스턴트 응답 메시지 추가 (parse-result stage로)
            const assistantMessage: ChatMessageType = {
              id: (Date.now() + 1).toString(),
              type: 'assistant',
              stage: 'parse-result', // 이 메시지의 stage
              // [어시스턴트 멘트 - parse 성공] 백엔드 메시지를 그대로 사용 (API 응답)
              message:
                '기다려주셔서 감사해요. \n선수 정보 인식을 완료했어요. 제가 잘못 인식한 정보가 있는지 확인해주세요. 매니저님의 확인이 필요한 정보가 있어요. 확인하여 저에게 보내주세요. \n\n아직 저는 학습 중인 어시스턴트예요. 유의하여 꼼꼼하게 확인 부탁드려요😭',
              players: data.preview.players,
              failedLines: data.parseFailedLines,
            };

            setDisplayMessages((prev) => [...prev, assistantMessage]);
            setLatestPreview(data.preview);
            setStage('parse-result');
          },
          onError: (error) => {
            console.error('[ParseNL Error]', error); // 디버깅용
            const errorMessage: ChatMessageType = {
              id: (Date.now() + 1).toString(),
              type: 'assistant',
              stage: 'input',
              // [어시스턴트 멘트 9] 파싱 실패 에러 메시지
              message: '죄송해요. 요청 처리 중 오류가 발생했어요. 다시 시도해주세요.',
            };
            setDisplayMessages((prev) => [...prev, errorMessage]);
          },
        },
      );

      setInputValue('');
      setTimeout(() => scrollToBottom(), 100);
    },
    [inputValue, isParsing, parseNL],
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
            {displayMessages.map((msg) => {
              // stage별로 다른 UI 표시 (메시지 자신의 stage 사용)
              if (msg.type === 'assistant' && msg.stage && msg.stage !== 'input') {
                return (
                  <RegistrationUI key={msg.id} variant={msg.stage}>
                    <RegistrationUI.Wrapper
                      logo={<Image src={hccLogo} width={36} height={36} alt="훕치치 로고" />}
                      message={msg.message}
                      content={
                        msg.stage === 'parse-result' && msg.players ? (
                          <RegistrationUI.ParseResult
                            players={msg.players}
                            failedLines={msg.failedLines}
                            teamName={teamName}
                            onConfirm={handleConfirmParseResult}
                            onEdit={handleEditParseResult}
                          />
                        ) : msg.stage === 'duplicate-check' ? (
                          <RegistrationUI.DuplicateCheck
                            duplicates={duplicatePlayers}
                            newPlayers={finalPlayers}
                            onSelectDuplicates={handleSelectDuplicates}
                          />
                        ) : msg.stage === 'final-confirm' && msg.players ? (
                          <RegistrationUI.FinalConfirm
                            players={msg.players}
                            teamName={teamName}
                            onConfirm={handleFinalConfirm}
                          />
                        ) : msg.stage === 'final-list' && msg.players ? (
                          <RegistrationUI.ParseResult
                            players={msg.players}
                            teamName={teamName}
                            onConfirm={handleFinalListConfirm}
                            onEdit={(players) =>
                              handleEditParseResult(
                                players.map((p) => ({
                                  ...p,
                                  jerseyNumber: p.jerseyNumber,
                                })),
                              )
                            }
                          />
                        ) : msg.stage === 'complete' ? (
                          <RegistrationUI.Complete onClose={handleClose} />
                        ) : null
                      }
                    />
                  </RegistrationUI>
                );
              }

              // 일반 메시지
              return (
                <ChatMessage
                  key={msg.id}
                  type={msg.type}
                  message={msg.message}
                  assistantLogo={<Image src={hccLogo} width={36} height={36} alt="훕치치 로고" />}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 입력창은 모든 stage에서 항상 보여주기 (complete 제외) */}
        {stage !== 'complete' && (
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
                disabled={isParsing || stage !== 'input'}
                className={twMerge(
                  'flex-1 rounded-lg bg-gray-100 px-3 py-2 text-sm',
                  'focus:outline-none focus:ring-2 focus:ring-primary',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                )}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isParsing || stage !== 'input'}
                className={twMerge(
                  'p-2 rounded-full text-primary transition-colors',
                  'hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed',
                )}
              >
                <SendFillIcon size={20} />
              </button>
            </div>
          </form>
        )}

        {children && <div className={twMerge('border-t border-gray-200 pt-4')}>{children}</div>}
      </BottomSheet.Content>
    </BottomSheet>
  );
};
