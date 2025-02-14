import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

type Request = {
  extension: string;
};

const getGeneratePresignedUrl = ({ extension }: Request) => {
  const params = new URLSearchParams();
  params.append('extension', extension);
  return fetcher.get<string>('/manager/aws/generate-presigned-url', { params });
};

export const useGeneratePresignedUrl = () =>
  useMutation({ mutationFn: getGeneratePresignedUrl });
