'use client';

import { useCreatePlayers, useUpdatePlayers } from '@hcc/manager-api';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { Button } from '~/components/ui/button';
import { ErrorText, Field, FormCard, TextInput } from '~/components/ui/field';
import { Toasts, useToasts } from '~/components/ui/toast';
import { routes } from '~/constants/routes';
import { parseHTTPError } from '~/utils/http-error';

import { PlayerRosterAssistant } from './player-roster-assistant';

type Props = {
  playerId?: number;
  initialName?: string;
  initialStudentNumber?: string;
  teamNames?: string[];
};

// 학번 자리수는 학교마다 달라서 서버가 판정한다(틀리면 이유를 담은 400). 여기서는 숫자인지만 본다
const validate = (name: string, studentNumber: string) => {
  if (!name.trim()) return '이름은 필수 입력값이에요.';
  if (!studentNumber.trim()) return '학번은 필수 입력값이에요.';
  if (!/^\d+$/.test(studentNumber)) return '학번은 숫자만 입력해주세요.';
  return null;
};

export const PlayerForm = ({ playerId, initialName, initialStudentNumber, teamNames }: Props) => {
  const router = useRouter();
  const { toasts, push, pushError } = useToasts();

  const [name, setName] = useState(initialName ?? '');
  const [studentNumber, setStudentNumber] = useState(initialStudentNumber ?? '');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [added, setAdded] = useState<{ name: string; studentNumber: string }[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const { mutateAsync: createPlayer } = useCreatePlayers();
  const { mutateAsync: updatePlayer } = useUpdatePlayers();

  const isEdit = playerId !== undefined;
  const invalid = validate(name, studentNumber);

  /** keepGoing 이면 등록 화면에 남아 다음 선수를 이어서 넣는다 */
  const save = async (keepGoing: boolean) => {
    if (pending) return;

    const problem = validate(name, studentNumber);
    if (problem) return setError(problem);

    setPending(true);
    setError(null);
    try {
      const input = { name: name.trim(), studentNumber };
      if (isEdit) await updatePlayer({ id: playerId, ...input });
      else await createPlayer(input);

      if (keepGoing && !isEdit) {
        setAdded((prev) => [{ name: input.name, studentNumber }, ...prev]);
        push(`${input.name} 등록했어요`);
        setName('');
        setStudentNumber('');
        setPending(false);
        nameRef.current?.focus();
        return;
      }

      push(isEdit ? '선수가 수정되었어요' : '선수가 등록되었어요');
      router.push(routes.players);
    } catch (e) {
      pushError(await parseHTTPError(e, '요청을 처리하지 못했어요.'));
      setPending(false);
    }
  };

  // 등록 화면의 Enter 는 "저장하고 계속"이다
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    void save(!isEdit);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <FormCard
        title="선수 정보"
        actions={
          isEdit ? undefined : (
            <Button
              type="button"
              size="sm"
              color="black"
              variant="outline"
              onClick={() => setAssistantOpen(true)}
            >
              명단으로 등록
            </Button>
          )
        }
      >
        <Field label="이름">
          <TextInput
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예) 김태우"
            autoComplete="off"
            required
          />
        </Field>

        <Field
          label="학번"
          hint="학교 안에서 선수를 구분하는 값이에요. 자리수는 학교 규칙을 따라요."
        >
          <TextInput
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
            placeholder="예) 202012345"
            inputMode="numeric"
            className="tnum"
            required
          />
        </Field>

        {isEdit && (
          <Field label="소속 팀" hint="소속 팀은 팀 관리에서 바꿀 수 있어요.">
            <TextInput
              value={teamNames?.length ? teamNames.join(', ') : '소속 팀이 없어요.'}
              readOnly
              disabled
            />
          </Field>
        )}
      </FormCard>

      <ErrorText>{error}</ErrorText>

      {added.length > 0 && (
        <div className="rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)]">
          <p className="text-t7 border-b border-[var(--color-greyscale-50)] px-4 py-2.5 font-semibold text-[var(--color-neutral-500)]">
            이번에 등록한 선수 {added.length}명
          </p>
          {added.map((p) => (
            <p
              key={p.studentNumber}
              className="text-t6 flex items-center gap-3 border-b border-[var(--color-hairline)] px-4 py-2 last:border-b-0"
            >
              <span className="font-medium">{p.name}</span>
              <span className="tnum text-t7 text-[var(--color-neutral-400)]">
                {p.studentNumber}
              </span>
            </p>
          ))}
        </div>
      )}

      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          size="md"
          color="black"
          variant="outline"
          onClick={() => router.back()}
        >
          {added.length > 0 ? '목록으로' : '취소'}
        </Button>
        {!isEdit && (
          <Button type="submit" size="md" disabled={pending || Boolean(invalid)}>
            {pending ? '저장 중…' : '저장하고 계속'}
          </Button>
        )}
        <Button
          type="button"
          size="md"
          color={isEdit ? 'primary' : 'black'}
          variant={isEdit ? 'solid' : 'outline'}
          disabled={pending || Boolean(invalid)}
          onClick={() => void save(false)}
        >
          {pending ? '저장 중…' : isEdit ? '완료' : '저장하고 닫기'}
        </Button>
      </div>

      {assistantOpen && <PlayerRosterAssistant onClose={() => setAssistantOpen(false)} />}

      <Toasts items={toasts} />
    </form>
  );
};
