import { useMutation } from '@hcc/api-base';

import type { ExtractNLPayload, ExtractNLResponse } from '../types/nl';

import { fetcher } from '../fetcher';

// fetcher 는 Content-Type: application/json 을 기본으로 붙인다. multipart 는 boundary 가 붙은 값을
// 브라우저가 정해야 하므로 이 요청만 헤더를 뺀다 (undefined 로 덮으면 ky 가 지운다)

// 이미지·PDF 는 서버가 AI 로 읽느라 기본 30초를 넘길 수 있다
const EXTRACT_TIMEOUT_MS = 60_000;

const postExtractNL = ({ file }: ExtractNLPayload) => {
  const body = new FormData();
  body.append('file', file);
  return fetcher.post<ExtractNLResponse>('nl/extract', {
    body,
    headers: { 'Content-Type': undefined },
    timeout: EXTRACT_TIMEOUT_MS,
  });
};

export const useExtractNL = () => {
  return useMutation({
    mutationFn: postExtractNL,
  });
};
