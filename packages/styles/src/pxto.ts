export const rem = (size: string | number, base: number = 16): string => {
  if (typeof size === 'string') {
    if (!size.endsWith('px'))
      throw new Error(`'size' must end with 'px': received ${size}`);
    return `${parseInt(size, 10) / base}rem`;
  }

  return `${size / base}rem`;
};
