interface MessageProps {
  message: string | null;
  mode?: string;
  addClass?: string;
  [key: string]: any;
}

export default function ServerMessage({
  message,
  mode,
  addClass,
}: MessageProps) {
  let color = '';

  switch (mode) {
    case 'success':
      color = 'text-blue-500 bg-blue-100 border border-blue-200';
    case 'save':
      color = 'text-green-500 bg-green-100 border border-green-200';
    case 'danger':
      color = 'text-red-500 bg-red-100 border border-red-200';
    default:
      color = 'text-green-500 bg-green-100 border border-green-200';
  }

  const renderMessage = () => {
    return (
      <p className={`text-[11px] rounded px-1 ${color} ${addClass}`}>
        {message}
      </p>
    );
  };
  return (
    <p className={`text-[11px] rounded px-1 ${color} ${addClass}`}>{message}</p>
  );
}
