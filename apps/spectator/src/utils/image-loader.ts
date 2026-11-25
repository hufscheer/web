import type { ImageLoaderProps } from 'next/image';

const ORIGIN_IMAGE_HOST = 'images.hufscheer.com';
const CDN_BASE_URL = 'https://img.hufscheer.com/cdn-cgi/image';

const CDN_OPTIONS = 'format=auto,onerror=redirect';

const isOriginImage = (src: string) => {
  try {
    return new URL(src).hostname === ORIGIN_IMAGE_HOST;
  } catch {
    return false;
  }
};

export default function imageLoader({ src, width }: ImageLoaderProps) {
  if (!isOriginImage(src)) return src;
  return `${CDN_BASE_URL}/width=${width},${CDN_OPTIONS}/${src}`;
}
