'use client';

import type { ImageLoaderProps } from 'next/image';

const ORIGIN_IMAGE_HOST = 'images.hufscheer.com';
const CDN_BASE_URL = 'https://img.hufscheer.com/cdn-cgi/image';

const CDN_OPTIONS = 'width=128,format=auto,onerror=redirect';

const isOriginImage = (src: string) => {
  try {
    return new URL(src).hostname === ORIGIN_IMAGE_HOST;
  } catch {
    return false;
  }
};

export default function imageLoader({ src }: ImageLoaderProps) {
  if (!isOriginImage(src)) return src;
  return `${CDN_BASE_URL}/${CDN_OPTIONS}/${src}`;
}
