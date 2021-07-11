interface Props {
  disabled: boolean;
  onClick: () => void;
}

export default function ShortenButton({ disabled, onClick }: Props) {
  const baseStyle =
    'bg-purple mr-0.5 px-3 py-2 rounded-tl-md rounded-bl-md text-white';

  const style = disabled
    ? `${baseStyle} bg-opacity-60 text-opacity-70`
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
