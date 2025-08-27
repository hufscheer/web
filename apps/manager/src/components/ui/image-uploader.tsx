'use client';

import {
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
  useRef,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

type UploadProps = Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onChange'> & {
  id?: string;
  name?: string;
  access?: string;
  onChange?: (file?: File) => void;
  children?: ((src: string, file?: File) => ReactNode) | ReactNode;
};

export const ImageUploader = forwardRef<HTMLButtonElement, UploadProps>(
  ({ id, name, className, access = 'image/*', onChange, children }, ref) => {
    const [file, setFile] = useState<File>();
    const [src, setSrc] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const encodeFileToBase64 = (file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSrc(reader.result as string);
      };
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newFile = e.target.files?.item(0);
      if (!newFile) {
        return;
      }

      setFile(newFile);
      onChange?.(newFile);
      encodeFileToBase64(newFile);

      if (!inputRef.current) {
        return;
      }
      inputRef.current.value = '';
    };

    const handleFileClick = () => {
      if (!inputRef.current) {
        return;
      }
      inputRef.current.click();
    };

    return (
      <button
        ref={ref}
        type="button"
        className={twMerge('inline-block cursor-pointer', className)}
        onClick={handleFileClick}
      >
        <input
          id={id}
          name={name}
          type="file"
          accept={access}
          ref={inputRef}
          onChange={handleFileChange}
          hidden
        />
        {typeof children === 'function' ? children(src, file) : children}
      </button>
    );
  },
);

ImageUploader.displayName = 'ImageUploader';
