'use client';

import { Button, colors, Typography } from '@hcc/ui';
import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { PlayerData } from '~/api/types/nl';

/* -------------------------------------------------------------------------------------------------
 * Shared helpers
 * -----------------------------------------------------------------------------------------------*/

const toggleSet = (prev: Set<string>, item: string): Set<string> => {
  const next = new Set(prev);
  if (next.has(item)) next.delete(item);
  else next.add(item);
  return next;
};

const PlayerCell = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={twMerge('rounded border border-gray-200 px-2 py-1 text-center', className)}>
    {children}
  </div>
);

/* -------------------------------------------------------------------------------------------------
 * RegistrationUI Root
 * -----------------------------------------------------------------------------------------------*/

interface RegistrationUIRootProps {
  variant: 'parse-result' | 'duplicate-confirm' | 'final-confirm' | 'final-list' | 'complete';
  children: React.ReactNode;
  className?: string;
}

const RegistrationUIRoot = ({
  variant: _variant,
  children,
  className,
}: RegistrationUIRootProps) => {
  return <div className={twMerge('flex gap-3 mb-8', className)}>{children}</div>;
};

/* -------------------------------------------------------------------------------------------------
 * RegistrationUI.Wrapper
 * 어시스턴트 로고와 메시지를 감싸는 컨테이너
 * -----------------------------------------------------------------------------------------------*/

interface WrapperProps {
  logo: React.ReactNode;
  message: string;
  content: React.ReactNode;
}

const Wrapper = ({ logo, message, content }: WrapperProps) => {
  return (
    <>
      {logo && (
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#4354F0]">
          {logo}
        </div>
      )}
      <div className="flex max-w-[40ch] flex-col gap-3">
        <Typography fontSize={12} className="break-words whitespace-pre-line text-gray-900">
          {message}
        </Typography>
        {content}
      </div>
    </>
  );
};

/* -------------------------------------------------------------------------------------------------
 * RegistrationUI.ParseResultCard
 * 1단계: Parse 결과 - 선수 목록 + 수정/확인 버튼
 * -----------------------------------------------------------------------------------------------*/

interface ParseResultCardProps {
  players: PlayerData[];
  failedLines?: string[];
  teamName?: string;
  onEdit?: (players: PlayerData[]) => void;
  onConfirm?: (selected: { studentNumber: string }[]) => void;
}

const ParseResultCard = ({
  players,
  failedLines,
  teamName,
  onEdit,
  onConfirm,
}: ParseResultCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlayers, setEditedPlayers] = useState<PlayerData[]>(players);
  const [invalidStudentNumbers, setInvalidStudentNumbers] = useState<Set<string>>(new Set());
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const handleUpdate = (index: number, field: keyof PlayerData, value: string) => {
    setEditedPlayers((prev) =>
      prev.map((p, i) =>
        i === index
          ? {
              ...p,
              [field]: field === 'jerseyNumber' ? (value === '' ? null : Number(value)) : value,
            }
          : p,
      ),
    );
    // focus 유지
    setTimeout(() => {
      const key = `${index}-${field}`;
      const input = inputRefs.current.get(key);
      if (input) {
        input.focus();
        input.setSelectionRange(value.length, value.length);
      }
    }, 0);
  };

  const displayPlayers = isEditing ? editedPlayers : players;
  const errorPlayers = players.filter((p) => p.error);
  const validPlayers = players.filter((p) => !p.error);
  const hasError = errorPlayers.length > 0;
  const hasMissingJerseyNumber = players.some((p) => p.jerseyNumber == null);
  // 에러(중복)가 있어도 유효한 선수가 있고 유효한 선수에 등번호가 있으면 확인 가능
  const canConfirmWithExclusion =
    hasError && validPlayers.length > 0 && !validPlayers.some((p) => p.jerseyNumber == null);

  const handleConfirmClick = () => {
    const playersToConfirm = canConfirmWithExclusion ? validPlayers : players;
    const invalid = new Set<string>(
      playersToConfirm
        .filter((p) => p.studentNumber && !/^\d{9}$/.test(p.studentNumber))
        .map((p) => p.studentNumber),
    );
    if (invalid.size > 0) {
      setInvalidStudentNumbers(invalid);
      return;
    }
    setInvalidStudentNumbers(new Set());
    onConfirm?.(playersToConfirm.map((p) => ({ studentNumber: p.studentNumber })));
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4">
      <div>
        <Typography fontSize={14} className="text-xs font-semibold text-gray-900">
          {teamName}의 선수 명단
        </Typography>
        <Typography fontSize={12} weight="medium" color={colors.primary600}>
          총 {players.length}명의 선수를 인식했어요.
        </Typography>
      </div>

      <table className="w-full text-center text-xs">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="pb-2 font-medium">선수이름</th>
            <th className="pb-2 font-medium">학번</th>
            <th className="pb-2 font-medium">등번호</th>
          </tr>
        </thead>
        <tbody>
          {displayPlayers.map((player, idx) => (
            <tr key={`${player.studentNumber}`}>
              <td className="py-1 pr-2">
                {isEditing ? (
                  <input
                    ref={(el) => {
                      if (el) inputRefs.current.set(`${idx}-name`, el);
                    }}
                    type="text"
                    value={player.name}
                    onChange={(e) => handleUpdate(idx, 'name', e.target.value)}
                    className="w-full rounded border border-blue-300 px-2 py-1 text-center text-xs"
                  />
                ) : (
                  <PlayerCell>{player.name}</PlayerCell>
                )}
              </td>
              <td className="py-1 pr-2">
                {isEditing ? (
                  <input
                    ref={(el) => {
                      if (el) inputRefs.current.set(`${idx}-studentNumber`, el);
                    }}
                    type="text"
                    value={player.studentNumber}
                    onChange={(e) => handleUpdate(idx, 'studentNumber', e.target.value)}
                    className="w-full rounded border border-blue-300 px-2 py-1 text-center text-xs"
                  />
                ) : (
                  <PlayerCell
                    className={
                      player.error ||
                      !player.studentNumber ||
                      invalidStudentNumbers.has(player.studentNumber)
                        ? 'border-red-400 bg-red-50'
                        : undefined
                    }
                  >
                    {player.studentNumber}
                  </PlayerCell>
                )}
              </td>
              <td className="py-1">
                {isEditing ? (
                  <input
                    ref={(el) => {
                      if (el) inputRefs.current.set(`${idx}-jerseyNumber`, el);
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={player.jerseyNumber ?? ''}
                    onChange={(e) => handleUpdate(idx, 'jerseyNumber', e.target.value)}
                    className="w-full rounded border border-blue-300 px-2 py-1 text-center text-xs"
                  />
                ) : (
                  <PlayerCell
                    className={player.jerseyNumber == null ? 'border-red-400 bg-red-50' : undefined}
                  >
                    {player.jerseyNumber ?? ''}
                  </PlayerCell>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 에러 표시 */}
      {(displayPlayers.some((p) => p.error) ||
        hasMissingJerseyNumber ||
        invalidStudentNumbers.size > 0) && (
        <ul className="flex flex-col gap-1">
          {Array.from(new Set(displayPlayers.filter((p) => p.error).map((p) => p.error))).map(
            (errorMsg) => (
              <li key={errorMsg} className="text-xs text-red-500">
                {errorMsg}
              </li>
            ),
          )}
          {hasMissingJerseyNumber && (
            <li className="text-xs text-red-500">
              등번호가 없는 선수가 있습니다. 등록할 수 없습니다.
            </li>
          )}
          {invalidStudentNumbers.size > 0 && (
            <li className="text-xs text-red-500">학번은 9자리 숫자여야 합니다.</li>
          )}
        </ul>
      )}

      {/* 파싱 실패 항목 */}
      {failedLines && failedLines.length > 0 && (
        <div className="flex flex-col gap-1 rounded border border-red-200 bg-red-50 p-2">
          <p className="text-xs font-medium text-red-600">파싱 실패 항목</p>
          <ul className="flex flex-col gap-1">
            {failedLines.map((line) => (
              <li key={line} className="text-xs text-red-500">
                • {line}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 버튼 */}
      {isEditing ? (
        <div className="flex gap-2">
          <Button
            type="button"
            color="primary"
            variant="ghost"
            onClick={() => setIsEditing(false)}
            className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            취소
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => {
              onEdit?.(editedPlayers);
              setIsEditing(false);
            }}
            className="flex-1 rounded border border-blue-400 bg-blue-50 px-3 py-2 text-sm text-blue-700"
          >
            저장
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            type="button"
            color="primary"
            variant="ghost"
            onClick={() => {
              setIsEditing(true);
              setInvalidStudentNumbers(new Set());
            }}
            className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            수정
          </Button>
          {(!hasError && !hasMissingJerseyNumber) || canConfirmWithExclusion ? (
            <Button
              onClick={handleConfirmClick}
              className="bg-primary flex-1 rounded px-3 py-2 text-sm text-white hover:opacity-90"
            >
              확인
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * RegistrationUI.FinalConfirmCard
 * 3단계: 최종 확인 - 등록 체크박스 포함
 * -----------------------------------------------------------------------------------------------*/

interface FinalConfirmCardProps {
  players: PlayerData[];
  teamName?: string;
  onConfirm?: (selected: { studentNumber: string }[]) => void;
}

const FinalConfirmCard = ({ players, teamName, onConfirm }: FinalConfirmCardProps) => {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(players.map((p) => p.studentNumber)),
  );

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4">
      <div>
        <p className="text-sm font-semibold text-gray-900">{teamName}의 최종 선수 명단</p>
        <p className="text-primary text-xs">총 {players.length}명의 선수입니다.</p>
      </div>

      <table className="w-full text-center text-xs">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="pb-2 font-medium">선수이름</th>
            <th className="pb-2 font-medium">학번</th>
            <th className="pb-2 font-medium">등번호</th>
            <th className="pb-2 text-center font-medium">등록</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.studentNumber}>
              <td className="py-1 pr-2">
                <PlayerCell>{player.name}</PlayerCell>
              </td>
              <td className="py-1 pr-2">
                <PlayerCell>{player.studentNumber}</PlayerCell>
              </td>
              <td className="py-1 pr-2">
                <PlayerCell>{player.jerseyNumber ?? ''}</PlayerCell>
              </td>
              <td className="py-1 text-center">
                <input
                  type="checkbox"
                  checked={selected.has(player.studentNumber)}
                  onChange={() => setSelected((prev) => toggleSet(prev, player.studentNumber))}
                  className="accent-primary h-4 w-4"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        type="button"
        onClick={() =>
          onConfirm?.(Array.from(selected).map((studentNumber) => ({ studentNumber })))
        }
        className="bg-primary w-full rounded px-3 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        확인
      </Button>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * RegistrationUI.DuplicateConfirmCard
 * 중복 선수 확인 - 선수별 취소/등록 버튼
 * -----------------------------------------------------------------------------------------------*/

interface DuplicateConfirmCardProps {
  players: PlayerData[];
  onConfirm?: (selected: { studentNumber: string }[]) => void;
}

const DuplicateConfirmCard = ({ players, onConfirm }: DuplicateConfirmCardProps) => {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(players.map((p) => p.studentNumber)),
  );

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-sm font-semibold text-gray-900">
        다음 선수들은 이미 다른 팀에 등록되어 있어요.{'\n'}중복 등록 하시겠습니까?
      </p>
      <table className="w-full text-center text-xs">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="pb-2 font-medium">선수이름</th>
            <th className="pb-2 font-medium">학번</th>
            <th className="pb-2 font-medium">등번호</th>
            <th className="pb-2 text-center font-medium">등록</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.studentNumber}>
              <td className="py-1 pr-2">
                <PlayerCell>{player.name}</PlayerCell>
              </td>
              <td className="py-1 pr-2">
                <PlayerCell>{player.studentNumber}</PlayerCell>
              </td>
              <td className="py-1 pr-2">
                <PlayerCell>{player.jerseyNumber ?? ''}</PlayerCell>
              </td>
              <td className="py-1 text-center">
                <input
                  type="checkbox"
                  checked={selected.has(player.studentNumber)}
                  onChange={() => setSelected((prev) => toggleSet(prev, player.studentNumber))}
                  className="accent-primary h-4 w-4"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        type="button"
        onClick={() =>
          onConfirm?.(Array.from(selected).map((studentNumber) => ({ studentNumber })))
        }
        className="bg-primary w-full rounded px-3 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        확인
      </Button>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * RegistrationUI.CompleteCard
 * 4단계: 완료 - 종료 버튼
 * -----------------------------------------------------------------------------------------------*/

interface CompleteCardProps {
  onClose?: () => void;
}

const CompleteCard = ({ onClose }: CompleteCardProps) => {
  return (
    <Button
      type="button"
      onClick={onClose}
      className="bg-primary w-full rounded px-3 py-3 text-sm font-medium text-white hover:opacity-90"
    >
      종료
    </Button>
  );
};

/* -------------------------------------------------------------------------------------------------
 * RegistrationUI Export
 * Compound Component 조합
 * -----------------------------------------------------------------------------------------------*/

export const RegistrationUI = Object.assign(RegistrationUIRoot, {
  Wrapper,
  ParseResult: ParseResultCard,
  DuplicateConfirm: DuplicateConfirmCard,
  FinalConfirm: FinalConfirmCard,
  Complete: CompleteCard,
});
