'use client';

import { SendFillIcon } from '@hcc/icons';
import { BottomSheet, Button, Modal, toast } from '@hcc/ui';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useEffect, useState, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

import type { ParseFailedLine, ParseNLPreview, ParsedPlayer, PlayerData } from '~/api/types/nl';

import { useCheckDuplicateNL } from '~/api/mutations/useCheckDuplicateNL';
import { useParseNL } from '~/api/mutations/useParseNL';
import { useRegisterNL } from '~/api/mutations/useRegisterNL';
import hccLogo from '~/app/icon.png';
import { useImageUpload } from '~/hooks';

import { ChatMessage } from './chat-message';
import { TypingIndicator } from './loading/typing-indicator';
import { RegistrationUI } from './registration-ui';

export type ChatMessageType = {
  id: string;
  type: 'assistant' | 'user';
  message: string;
  stage?: RegistrationStage;
  players?: PlayerData[];
  failedLines?: ParseFailedLine[];
};

type RegistrationStage = 'input' | 'parse-result' | 'duplicate-confirm' | 'final-list' | 'complete';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  teamName?: string;
  teamUnit?: string;
  teamColor?: string;
  logoImageUrl?: string | File;
  children?: React.ReactNode;
};

const assistantLogo = <Image src={hccLogo} width={36} height={36} alt="훕치치 로고" />;

const INITIAL_MESSAGE = (teamName?: string): ChatMessageType => ({
  id: '1',
  type: 'assistant',
  stage: 'input',
  // [어시스턴트 멘트 1] 첫 인사말 (바텀시트 닫힐 때 초기화)
  message: `안녕하세요, 훕치치 어시스턴트입니다.\n매니저님들의 원활한 서비스 이용을 돕고자합니다. \n\n${teamName}의 선수 등록을 도와드릴게요!\n선수들의 이름, 학번, 등번호가 적힌 텍스트를 입력해주세요.`,
});

export const AddPlayerBottomSheet = ({
  isOpen,
  onOpenChange,
  teamName,
  teamUnit = '',
  teamColor = '',
  logoImageUrl = '',
  children,
}: Props) => {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [stage, setStage] = useState<RegistrationStage>('input');
  const [latestPreview, setLatestPreview] = useState<ParseNLPreview | null>(null);
  const [finalPlayers, setFinalPlayers] = useState<ParsedPlayer[]>([]);
  const [pendingNewPlayers, setPendingNewPlayers] = useState<ParsedPlayer[]>([]);
  const [existsPlayers, setExistsPlayers] = useState<PlayerData[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const [displayMessages, setDisplayMessages] = useState<ChatMessageType[]>([]);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const { mutate: parseNL, isPending: isParsing } = useParseNL();
  const { mutate: checkDuplicateNL, isPending: isCheckingDuplicate } = useCheckDuplicateNL();
  const { uploadImage } = useImageUpload();
  const { mutate: registerNL, isPending: isRegistering } = useRegisterNL();

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  // 메시지 쌍(사용자 + 어시스턴트)을 추가하고 스크롤
  const addMessages = useCallback(
    (userText: string, assistant: Omit<ChatMessageType, 'id' | 'type'>) => {
      const now = Date.now();
      setDisplayMessages((prev) => [
        ...prev,
        { id: `${now}`, type: 'user', message: userText },
        { id: `${now + 1}`, type: 'assistant', ...assistant },
      ]);
      scrollToBottom();
    },
    [scrollToBottom],
  );

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    } else {
      setStage('input');
      setLatestPreview(null);
      setFinalPlayers([]);
      setPendingNewPlayers([]);
      setExistsPlayers([]);
      setIsClosing(false);
      setDisplayMessages([INITIAL_MESSAGE(teamName)]);
    }
  }, [isOpen, teamName, scrollToBottom]);

  // 1단계: Parse 결과 확인 → check-duplicate API 호출
  const handleConfirmParseResult = useCallback(
    (selected: { studentNumber: string }[]) => {
      if (!latestPreview) return;

      const selectedPlayers = latestPreview.players.filter((p) =>
        selected.some((s) => s.studentNumber === p.studentNumber),
      );

      checkDuplicateNL(
        { players: selectedPlayers },
        {
          onSuccess: (data) => {
            const existsPlayers = data.players.filter((p) => p.status === 'EXISTS');
            const newPlayers = data.players
              .filter((p) => p.status === 'NEW')
              .map((p) => ({
                name: p.name,
                studentNumber: p.studentNumber,
                jerseyNumber: p.jerseyNumber,
              }));

            if (existsPlayers.length > 0) {
              // 중복 선수가 있으면 duplicate-confirm 단계로
              setPendingNewPlayers(newPlayers);
              setExistsPlayers(
                existsPlayers.map((p) => ({
                  name: p.name,
                  studentNumber: p.studentNumber,
                  jerseyNumber: p.jerseyNumber,
                })),
              );
              addMessages('확인', {
                stage: 'duplicate-confirm',
                message:
                  '이제 거의 다 왔어요! \n마지막으로 매니저님의 확인이 필요한 내용이 있어요.',
                players: existsPlayers.map((p) => ({
                  name: p.name,
                  studentNumber: p.studentNumber,
                  jerseyNumber: p.jerseyNumber,
                })),
              });
              setStage('duplicate-confirm');
            } else {
              const names = newPlayers.map((p) => p.name).join(', ');
              setFinalPlayers(newPlayers);
              addMessages(newPlayers.map((p) => `${p.name} 등록`).join('\n'), {
                stage: 'final-list',
                message: `${names}을 ${teamName} 선수 명단에 추가하겠어요. 수고하셨어요!\n최종 확인 후에 선수 명단을 최종 등록할게요.`,
                players: newPlayers,
              });
              setStage('final-list');
            }
          },
          onError: async (error) => {
            console.error('[CheckDuplicateNL Error]', error);
            let errorMessage = '죄송해요. 중복 확인 중 오류가 발생했어요. 다시 시도해주세요.';
            try {
              const body = await (error as { response?: Response }).response?.json();
              if (body?.displayMessage) errorMessage = body.displayMessage;
              else if (body?.message) errorMessage = body.message;
            } catch {
              /* ignore */
            }
            setDisplayMessages((prev) => [
              ...prev,
              {
                id: `${Date.now() + 1}`,
                type: 'assistant',
                stage: 'parse-result',
                message: errorMessage,
              },
            ]);
          },
        },
      );
    },
    [latestPreview, checkDuplicateNL, addMessages],
  );

  // 1-2단계: Parse 결과 수정
  const handleEditParseResult = useCallback(
    (edited: PlayerData[]) => {
      addMessages('수정', {
        stage: 'parse-result',
        // [어시스턴트 멘트 4] 선수 명단 수정 후 재확인 안내
        message: `확인 감사해요. \n확인해주신 정보가 아래 정보가 맞는지 확인해주세요! \n
      추가 수정이 필요하다면 '수정'을, 정확하다면 '확인'을 눌러주세요.`,
        players: edited.map((p) => ({ ...p, jerseyNumber: p.jerseyNumber ?? 0, error: undefined })),
      });
      setLatestPreview((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          // error 필드 제거: 수정 후에는 중복 에러 초기화
          players: edited.map((p) => ({
            name: p.name,
            studentNumber: p.studentNumber,
            jerseyNumber: p.jerseyNumber ?? 0,
          })),
        };
      });
    },
    [addMessages],
  );

  // duplicate-confirm 단계: 사용자가 선택한 EXISTS 선수 + NEW 선수 합쳐서 final-confirm으로
  const handleDuplicateConfirm = useCallback(
    (selected: { studentNumber: string }[]) => {
      const selectedExists: ParsedPlayer[] = existsPlayers
        .filter((p) => selected.some((s) => s.studentNumber === p.studentNumber))
        .map((p) => ({
          name: p.name,
          studentNumber: p.studentNumber,
          jerseyNumber: p.jerseyNumber ?? 0,
        }));

      const rejectedExists = existsPlayers.filter(
        (p) => !selected.some((s) => s.studentNumber === p.studentNumber),
      );

      const userMessage = [
        ...selectedExists.map((p) => `${p.name} 등록`),
        ...rejectedExists.map((p) => `${p.name} 취소`),
      ].join('\n');

      const merged = [...pendingNewPlayers, ...selectedExists];
      const names = merged.map((p) => p.name).join(', ');
      setFinalPlayers(merged);
      addMessages(userMessage, {
        stage: 'final-list',
        message: `${names}을 ${teamName} 선수 명단에 추가하겠어요. 수고하셨어요!\n최종 확인 후에 선수 명단을 최종 등록할게요.`,
        players: merged,
      });
      setStage('final-list');
    },
    [pendingNewPlayers, existsPlayers, teamName, addMessages],
  );

  // 최종 명단 확인 → complete 단계
  const handleFinalListConfirm = useCallback(() => {
    addMessages('확인', {
      stage: 'complete',
      // [어시스턴트 멘트 7] 등록 완료 전 종료 안내
      message: `${teamName}팀 선수 등록이 완료되었어요! 🎉 \n나중에 팀 정보를 수정할 수 있어요.`,
    });
    setStage('complete');
  }, [teamName, addMessages]);

  // 종료 - registerNL 호출 및 닫기
  const handleClose = useCallback(async () => {
    if (isClosing || isRegistering) return;

    if (!teamName || finalPlayers.length === 0) {
      onOpenChange(false);
      return;
    }

    if (!logoImageUrl) {
      setDisplayMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}`,
          type: 'assistant',
          stage: 'complete',
          message:
            '팀 로고 이미지가 등록되지 않았어요.\n팀 정보에서 로고 이미지를 먼저 등록해주세요.',
        },
      ]);
      scrollToBottom();
      return;
    }

    setIsClosing(true);

    let imageUrl: string;
    if (logoImageUrl instanceof File) {
      imageUrl = await uploadImage(logoImageUrl);
    } else {
      imageUrl = logoImageUrl;
    }

    const payload = {
      team: {
        name: teamName,
        unit: teamUnit,
        teamColor,
        logoImageUrl: imageUrl,
      },
      players: finalPlayers,
    };
    console.log('[RegisterNL Payload]', JSON.stringify(payload, null, 2));

    registerNL(payload, {
      onSuccess: (data) => {
        console.log('[RegisterNL Response]', data);
        setDisplayMessages((prev) => [
          ...prev,
          {
            id: `${Date.now() + 1}`,
            type: 'assistant',
            stage: 'complete',
            // [어시스턴트 멘트 7] 등록 완료 후 서버 응답 메시지 (API에서 자동으로 내려옴, 직접 수정 불가)
            message: data.displayMessage,
          },
        ]);
        toast.success('팀 등록을 완료했어요');
        setTimeout(() => {
          setStage('input');
          setLatestPreview(null);
          setFinalPlayers([]);
          setIsClosing(false);
          setDisplayMessages([]);
          onOpenChange(false);
          router.push('/teams');
        }, 500);
      },
      onError: async (error) => {
        console.error('[RegisterNL Error]', error);
        let errorMessage = '죄송해요. 등록 중 오류가 발생했어요. 다시 시도해주세요.';
        try {
          const body = await (error as { response?: Response }).response?.json();
          if (body?.displayMessage) errorMessage = body.displayMessage;
          else if (body?.message) errorMessage = body.message;
        } catch {
          /* ignore */
        }
        setDisplayMessages((prev) => [
          ...prev,
          {
            id: `${Date.now() + 1}`,
            type: 'assistant',
            stage: 'complete',
            message: errorMessage,
          },
        ]);
        setIsClosing(false);
      },
    });
  }, [
    teamName,
    teamUnit,
    teamColor,
    logoImageUrl,
    finalPlayers,
    uploadImage,
    registerNL,
    router,
    onOpenChange,
    scrollToBottom,
    isClosing,
    isRegistering,
  ]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!inputValue.trim() || isParsing) return;

      setDisplayMessages((prev) => [
        ...prev,
        { id: `${Date.now()}`, type: 'user', message: inputValue },
      ]);

      parseNL(
        { history: [], message: inputValue },
        {
          onSuccess: (data) => {
            console.log('[ParseNL Success]', data);
            const preview = data.preview;

            if (!preview) {
              setDisplayMessages((prev) => [
                ...prev,
                {
                  id: `${Date.now() + 1}`,
                  type: 'assistant',
                  stage: 'input',
                  // [어시스턴트 멘트 - 입력 오류] 선수 정보를 인식하지 못했을 때
                  message:
                    '선수 정보를 인식하지 못했어요.\n이름, 학번(9~10자리), 등번호 형식으로 다시 입력해주세요.\n예) 홍길동 202600001 10',
                },
              ]);
              return;
            }

            setDisplayMessages((prev) => [
              ...prev,
              {
                id: `${Date.now() + 1}`,
                type: 'assistant',
                stage: 'parse-result',
                // [어시스턴트 멘트 - parse 성공] 백엔드 메시지를 그대로 사용 (API 응답)
                message:
                  '기다려주셔서 감사해요. \n선수 정보 인식을 완료했어요. 제가 잘못 인식한 정보가 있는지 확인해주세요. \n매니저님의 확인이 필요한 정보가 있어요. 확인하여 저에게 보내주세요. \n\n아직 저는 학습 중인 어시스턴트예요. 유의하여 꼼꼼하게 확인 부탁드려요😭',
                players: preview.players,
                failedLines: preview.parseFailedLines,
              },
            ]);
            setLatestPreview(preview);
            setStage('parse-result');
          },
          onError: (error) => {
            console.error('[ParseNL Error]', error);
            setDisplayMessages((prev) => [
              ...prev,
              {
                id: `${Date.now() + 1}`,
                type: 'assistant',
                stage: 'input',
                // [어시스턴트 멘트 9] 파싱 실패 에러 메시지
                message: '죄송해요. 요청 처리 중 오류가 발생했어요. 다시 시도해주세요.',
              },
            ]);
          },
        },
      );

      setInputValue('');
      scrollToBottom();
    },
    [inputValue, isParsing, parseNL, scrollToBottom],
  );

  const handleOpenChange = (open: boolean) => {
    if (!open && stage !== 'input' && stage !== 'complete') {
      setShowLeaveModal(true);
      return;
    }
    onOpenChange(open);
  };

  const handleLeaveConfirm = () => {
    setShowLeaveModal(false);
    onOpenChange(false);
  };

  return (
    <>
      <Modal open={showLeaveModal} onOpenChange={setShowLeaveModal}>
        <Modal.Content className="w-[80vw] rounded-lg bg-white p-6">
          <Modal.Title className="mb-2 text-lg font-bold text-gray-900">
            아직 정보가 저장되지 않았어요
          </Modal.Title>
          <Modal.Description className="text-md mb-6 text-gray-500">
            지금 나가면 정보가 저장되지 않아요.{'\n'}정말 나가시겠습니까?
          </Modal.Description>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              color="black"
              onClick={() => setShowLeaveModal(false)}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700"
            >
              취소
            </Button>
            <Button
              color="black"
              onClick={handleLeaveConfirm}
              className="flex-1 rounded-xl bg-gray-900 py-3 text-sm font-medium text-white"
            >
              나가기
            </Button>
          </div>
        </Modal.Content>
      </Modal>
      <BottomSheet open={isOpen} onOpenChange={handleOpenChange}>
        <BottomSheet.Content className="!bg-[#EBEBEB]">
          <BottomSheet.Header className={twMerge('mb-6')}>
            <BottomSheet.Title className={twMerge('px-6')}>훕치치 어시스턴트</BottomSheet.Title>
          </BottomSheet.Header>

          <div
            className={twMerge('px-6 h-[60vh] overflow-y-auto flex flex-col')}
            role="presentation"
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          >
            <div className={twMerge('flex-1 overflow-y-auto')}>
              {displayMessages.map((msg) => {
                if (msg.type === 'assistant' && msg.stage && msg.stage !== 'input') {
                  return (
                    <RegistrationUI key={msg.id} variant={msg.stage}>
                      <RegistrationUI.Wrapper
                        logo={assistantLogo}
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
                          ) : msg.stage === 'duplicate-confirm' && msg.players ? (
                            <RegistrationUI.DuplicateConfirm
                              players={msg.players}
                              onConfirm={handleDuplicateConfirm}
                            />
                          ) : msg.stage === 'final-list' && msg.players ? (
                            <RegistrationUI.ParseResult
                              players={msg.players}
                              teamName={teamName}
                              onConfirm={handleFinalListConfirm}
                              onEdit={handleEditParseResult}
                            />
                          ) : msg.stage === 'complete' ? (
                            <RegistrationUI.Complete onClose={handleClose} />
                          ) : null
                        }
                      />
                    </RegistrationUI>
                  );
                }

                return (
                  <ChatMessage
                    key={msg.id}
                    type={msg.type}
                    message={msg.message}
                    assistantLogo={assistantLogo}
                  />
                );
              })}
              {(isParsing || isCheckingDuplicate) && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* 입력창은 complete 단계 제외하고 항상 표시 */}
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
                  placeholder="훕치치 어시스턴트를 활용해보세요"
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
    </>
  );
};
