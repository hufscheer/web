import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Request = {
  url: string;
  file: File;
};

const postUploadImage = async ({ url, file }: Request) => {
  const arrayBuffer = await file.arrayBuffer();

  return axios.put<void>(url, arrayBuffer, {
    baseURL: '/api/images',
    headers: {
      'Content-Type': file.type,
      'Content-Length': arrayBuffer.byteLength.toString(),
    },
  });
};

const useUploadImage = () => useMutation({ mutationFn: postUploadImage });

export default useUploadImage;
