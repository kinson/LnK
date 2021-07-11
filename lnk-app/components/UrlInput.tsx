import React, { ReactElement } from 'react';

interface Props {
  hidden: boolean;
  url: string | null;
  updateUrl: (res: React.FormEvent<HTMLInputElement>) => void;
}

export default function UrlInput({
  hidden,
  url,
  updateUrl,
}: Props): ReactElement {
  const baseStyle =
    'placeholder-gray-300 text-darkPurple dark:text-white text-md relative bg-white dark:bg-gray-600 rounded border-0 shadow outline-none focus:outline-none w-full transition-opacity duration-300';

  const style = hidden ? `${baseStyle} h-0 p-0 opacity-0` : `${baseStyle} p-3`;

  return (
    <input
      value={url ?? ''}
      onChange={updateUrl}
      name="url-input"
      id="url-input"
      type="text"
      placeholder="https://google.com/?q=A+Long+Query+You+Want+To+Share+With..."
      className={style}
    />
  );
}
