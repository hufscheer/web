import { useGeneratePresignedUrl, useUploadImage } from '@hcc/api';

export const useImageUpload = () => {
  const { mutateAsync: generatePresignedUrlMutation } = useGeneratePresignedUrl();
  const { mutateAsync: uploadImageMutation } = useUploadImage();

  const uploadImage = async (file: File): Promise<string> => {
    const extension = file.name.split('.').pop() || '';

    const url: URL = new URL(await generatePresignedUrlMutation({ extension }));

    await uploadImageMutation({ url: url.pathname + url.search, file });

    return url.origin + url.pathname;
  };

  return { uploadImage };
};
