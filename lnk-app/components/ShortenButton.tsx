import React, { ReactElement } from 'react';

interface Props {
  disabled: boolean;
  onClick: () => void;
}

export default function ShortenButton({
  disabled,
  onClick,
}: Props): ReactElement {
  const baseStyle =
    'bg-purple mr-0.5 px-3 py-2 rounded-tl-md rounded-bl-md text-white dark:text-gray-200';

  const style = disabled
    ? `${baseStyle} bg-opacity-50 text-opacity-70 dark:bg-opacity-60 dark:text-opacity-40 cursor-not-allowed`
    : baseStyle;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={style}
    >
      Shorten
    </button>
  );
}
