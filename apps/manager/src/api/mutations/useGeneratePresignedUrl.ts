import { useMutation } from '@hcc/api-base';

import { fetcher } from '../queryKey';

type Request = {
  extension: string;
};

const getGeneratePresignedUrl = ({ extension }: Request) => {
  return fetcher.get<string>('manager/aws/generate-presigned-url', { searchParams: { extension } });
};

export const useGeneratePresignedUrl = () => useMutation({ mutationFn: getGeneratePresignedUrl });
