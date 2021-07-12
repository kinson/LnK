import React, { ReactElement, useRef, useState } from 'react';

interface Props {
  disabled: boolean;
  link: string | null;
}

export default function ShortenButton({ link, disabled }: Props): ReactElement {
  const inputRef = useRef(null);
  const [copied, setCopied] = useState<boolean>(false);

  const buttonText = copied ? 'Copied!' : '& Copy';

  const baseStyle =
    'bg-violet ml-0.5 px-3 py-2 rounded-tr-md rounded-br-md text-white';

  const style = disabled
    ? `${baseStyle} bg-opacity-60 text-opacity-70`
    : baseStyle;

  const copyLinkToClipboard = () => {
    if (inputRef.current !== null && link !== null) {
      inputRef.current.focus();
      inputRef.current.select();

      if (document.execCommand('copy')) {
        setCopied(true);
      }
    }
  };

  return (
    <>
      <button
        disabled={disabled}
        onClick={copyLinkToClipboard}
        type="button"
        className={style}
      >
        {buttonText}
      </button>
      <input
        ref={inputRef}
        value={link ?? ''}
        className="h-0 w-0 focus:outline-none"
        readOnly
      />
    </>
  );
}
