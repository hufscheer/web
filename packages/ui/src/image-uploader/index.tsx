import { ChangeEvent, ReactNode, useRef, useState } from 'react';

import * as styles from './styles.css';

interface UploadProps {
  id?: string;
  name?: string;
  onChange?: (file?: File) => void;
  children?: ((src: string, file?: File) => ReactNode) | ReactNode;
}

const Upload = ({ id, name, onChange, children }: UploadProps) => {
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

    if (!newFile) return;

    setFile(newFile);
    onChange?.(newFile);
    encodeFileToBase64(newFile);

    if (!inputRef.current) return;

    inputRef.current.value = '';
  };

  const handleFileClick = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  return (
    <div className={styles.root} onClick={handleFileClick} role="presentation">
      <input
        id={id}
        name={name}
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        hidden
      />
      {typeof children === 'function' ? children(src, file) : children}
    </div>
  );
};

export default Upload;
