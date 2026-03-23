import { useGeneratePresignedUrl, useUploadImage } from '~/api';

export const useImageUpload = () => {
  const { mutateAsync: generatePresignedUrlMutation } = useGeneratePresignedUrl();
  const { mutateAsync: uploadImageMutation } = useUploadImage();

  const uploadImage = async (file: File): Promise<string> => {
    const extension = file.name.split('.').pop() || '';

    const presignedUrl: URL = new URL(await generatePresignedUrlMutation({ extension }));

    await uploadImageMutation({ url: presignedUrl.href, file });

    return presignedUrl.origin + presignedUrl.pathname;
  };

  return { uploadImage };
};
