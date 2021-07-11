interface Props {
  disabled: boolean;
  onClick: () => void;
}

export default function ShortenButton({ onClick, disabled }: Props) {
  const baseStyle =
    'bg-violet ml-0.5 px-3 py-2 rounded-tr-md rounded-br-md text-white';

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
      & Copy
    </button>
  );
}
