import { SymbolIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Image from 'next/image';
import { ComponentPropsWithoutRef, useState } from 'react';

interface TeamLogoProps extends ComponentPropsWithoutRef<typeof Image> {
  fallback?: string;
}

export default function TeamLogo({
  src,
  alt,
  width,
  height,
  ...props
}: TeamLogoProps) {
  const [error, setError] = useState<boolean>(false);

  return (
    <>
      {error ? (
        <Icon source={SymbolIcon} />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onError={() => setError(true)}
          {...props}
        />
      )}
    </>
  );
}
