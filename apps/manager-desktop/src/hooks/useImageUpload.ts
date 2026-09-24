import { useGeneratePresignedUrl, useUploadImage } from '@hcc/manager-api';

import { UserFacingError } from '~/utils/http-error';

const MAX_BYTES = 5 * 1024 * 1024;

// 서버가 확장자별 Content-Type 을 서명에 묶는다. 다른 타입으로 올리면 S3 가 거절한다
const CONTENT_TYPE_BY_EXTENSION: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
};

export const ACCEPTED_IMAGE_TYPES = [...new Set(Object.values(CONTENT_TYPE_BY_EXTENSION))].join(
  ',',
);

export const useImageUpload = () => {
  const { mutateAsync: generatePresignedUrl } = useGeneratePresignedUrl();
  const { mutateAsync: upload } = useUploadImage();

  const uploadImage = async (file: File): Promise<string> => {
    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
    const contentType = CONTENT_TYPE_BY_EXTENSION[extension];

    if (!contentType) throw new UserFacingError('png·jpg·gif·webp·avif 이미지만 올릴 수 있어요.');
    if (file.size > MAX_BYTES) throw new UserFacingError('이미지는 5MB 까지 올릴 수 있어요.');

    const presignedUrl = new URL(await generatePresignedUrl({ extension }));
    await upload({
      url: presignedUrl.href,
      file: new File([file], file.name, { type: contentType }),
    });

    return presignedUrl.origin + presignedUrl.pathname;
  };

  return { uploadImage };
};
