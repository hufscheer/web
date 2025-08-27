import { useMutation } from '@hcc/api-base';
import ky from 'ky';

type Request = {
  url: string;
  file: File;
};

const postUploadImage = async ({ url, file }: Request) => {
  const arrayBuffer = await file.arrayBuffer();

  return ky.put(`/api/images/${url}`, {
    body: arrayBuffer,
    headers: { 'Content-Type': file.type },
  });
};

export const useUploadImage = () => useMutation({ mutationFn: postUploadImage });
