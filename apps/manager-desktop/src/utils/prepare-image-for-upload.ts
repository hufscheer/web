const MAX_EDGE_PX = 2048;
const JPEG_QUALITY = 0.85;
const PNG_TYPE = 'image/png';
const JPEG_TYPE = 'image/jpeg';
const HEIC_EXTENSION = /\.(heic|heif)$/i;

const isImage = (file: File) => file.type.startsWith('image/') || HEIC_EXTENSION.test(file.name);

const toBlob = (canvas: HTMLCanvasElement, type: string, quality?: number) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));

const renameWithExtension = (name: string, extension: string) =>
  `${name.replace(/\.[^.]+$/, '')}.${extension}`;

/**
 * 사진을 올리기 전에 줄이고 다시 인코딩한다. 올리는 시간을 줄이고, 다시 인코딩하면서
 * EXIF(휴대폰 촬영 위치 등)가 빠져 외부 AI 로 나가지 않는다.
 * 이미지가 아니거나 브라우저가 못 읽는 형식(예: Chrome 의 HEIC)이면 원본을 그대로 돌려준다.
 */
export const prepareImageForUpload = async (file: File): Promise<File> => {
  if (!isImage(file)) return file;

  try {
    // 기본값 imageOrientation: 'from-image' 가 EXIF 회전을 이미 적용한다. 다시 돌리지 않는다
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE_PX / Math.max(bitmap.width, bitmap.height));

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);

    const context = canvas.getContext('2d');
    if (!context) return file;

    const isPng = file.type === PNG_TYPE;
    if (!isPng) {
      // JPEG 는 투명을 못 담아 검게 나오므로 흰 바탕을 깐다
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const type = isPng ? PNG_TYPE : JPEG_TYPE;
    const blob = await toBlob(canvas, type, isPng ? undefined : JPEG_QUALITY);
    if (!blob) return file;

    return new File([blob], renameWithExtension(file.name, isPng ? 'png' : 'jpg'), { type });
  } catch {
    return file;
  }
};
