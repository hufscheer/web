'use client';

import type { ExtractNLResponse } from '@hcc/manager-api';
import type { ChangeEvent, ComponentProps, DragEvent } from 'react';

import { useExtractNL } from '@hcc/manager-api';
import { HTTPError } from 'ky';
import { useRef, useState } from 'react';

import { Button } from '~/components/ui/button';
import { ErrorText } from '~/components/ui/field';
import { cn } from '~/utils/cn';
import { parseHTTPError } from '~/utils/http-error';
import { prepareImageForUpload } from '~/utils/prepare-image-for-upload';

const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = 'image/*,.heic,.heif,.xlsx,.csv,.pdf';

const TOO_LARGE_MESSAGE = '파일은 10MB 까지 올릴 수 있습니다.';
const RATE_LIMITED_MESSAGE = '파일을 너무 자주 올렸어요. 잠시 뒤에 다시 시도해 주세요.';
const FAILED_MESSAGE = '파일에서 명단을 읽지 못했어요.';

// 이미지·PDF 는 AI 가 읽어서 글자를 잘못 읽을 수 있다
const AI_READ_TYPES: ExtractNLResponse['sourceType'][] = ['IMAGE', 'PDF'];

const toNotice = ({ sourceType, truncated }: ExtractNLResponse) =>
  [
    AI_READ_TYPES.includes(sourceType)
      ? '파일을 AI 가 읽었어요. 틀린 글자가 있을 수 있으니 꼭 확인해 주세요.'
      : '파일에서 읽어 왔어요. 내용을 확인해 주세요.',
    truncated && '파일이 길어서 앞부분만 읽었어요.',
  ]
    .filter(Boolean)
    .join(' ');

const toErrorMessage = async (error: unknown) =>
  error instanceof HTTPError && error.response.status === 429
    ? parseHTTPError(error, RATE_LIMITED_MESSAGE)
    : parseHTTPError(error, FAILED_MESSAGE);

type Props = Omit<ComponentProps<'textarea'>, 'value' | 'onChange'> & {
  value: string;
  onValueChange: (value: string) => void;
};

/** 명단 텍스트 입력. 파일을 올리면 서버가 글로 바꿔 주고, 이 입력에 채워서 사용자가 고친 뒤 보낸다 */
export const RosterTextInput = ({
  value,
  onValueChange,
  disabled,
  className,
  ...textareaProps
}: Props) => {
  const { mutateAsync: extract } = useExtractNL();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [reading, setReading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const busy = disabled || reading;

  const attach = async (original: File) => {
    setNotice(null);
    setError(null);
    setReading(true);

    try {
      // 사진은 줄인 뒤의 크기로 따진다. 큰 원본도 줄이면 한도 안에 들어온다
      const file = await prepareImageForUpload(original);
      if (file.size > MAX_BYTES) {
        setError(TOO_LARGE_MESSAGE);
        return;
      }

      const result = await extract({ file });
      // 올리는 동안 입력은 읽기 전용이라 value 가 바뀌지 않는다
      onValueChange(value.trim() ? `${value.replace(/\s+$/, '')}\n${result.text}` : result.text);
      setNotice(toNotice(result));
      textareaRef.current?.focus();
    } catch (e) {
      setError(await toErrorMessage(e));
    } finally {
      setReading(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && !busy) void attach(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (!busy) setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) void attach(file);
  };

  return (
    <div
      className="flex flex-col gap-2"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <textarea
        {...textareaProps}
        ref={textareaRef}
        value={value}
        // 올리는 중 입력한 글이 응답으로 덮이지 않게 잠근다. disabled 와 달리 포커스는 유지된다
        readOnly={reading}
        disabled={disabled}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn(className, dragging && 'border-[var(--color-primary-600)]')}
      />

      <div className="flex items-center gap-2" aria-live="polite">
        <Button
          size="sm"
          color="black"
          variant="outline"
          disabled={busy}
          aria-busy={reading}
          onClick={() => fileRef.current?.click()}
        >
          {reading ? '파일을 읽는 중…' : '파일 첨부'}
        </Button>
        <span className="text-t7 text-[var(--color-neutral-400)]">
          사진·엑셀·CSV·PDF, 10MB 까지. 끌어다 놓아도 돼요.
        </span>
        <input ref={fileRef} type="file" accept={ACCEPT} hidden onChange={handleFileChange} />
      </div>

      {notice && (
        <p role="status" className="text-t7 text-[var(--color-neutral-600)]">
          {notice}
        </p>
      )}
      <ErrorText>{error}</ErrorText>
    </div>
  );
};
