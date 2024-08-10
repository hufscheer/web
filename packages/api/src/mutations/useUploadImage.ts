import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Request = {
  url: string;
  file: File;
};

const postUploadImage = async ({ url, file }: Request) => {
  const arrayBuffer = await file.arrayBuffer();

  const requestUrl: string = url.replace(
    'https://hufscheer-images.s3.ap-northeast-2.amazonaws.com',
    '/api/images',
  );

  return axios.put<void>(requestUrl, arrayBuffer, {
    baseURL: '/api/images',
    headers: {
      'Content-Type': file.type,
      'Content-Length': arrayBuffer.byteLength.toString(),
    },
  });
};

const useUploadImage = () => useMutation({ mutationFn: postUploadImage });

export default useUploadImage;
