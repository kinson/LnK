interface Props {
  link: string | null;
  hidden: boolean;
}

export default function ShortLink({ link, hidden }: Props) {
  const baseStyle =
    'text-violet dark:text-lavender text-md relative bg-white dark:bg-gray-600 xrounded border-0 shadow outline-none focus:outline-none w-full transition-opacity duration-300';

  const style = hidden
    ? `${baseStyle} h-0 p-0 opacity-0`
    : `${baseStyle} p-3 opacity-1`;

  return (
    <a href={link ?? '#'} className={style}>
      {link}
    </a>
  );
}
