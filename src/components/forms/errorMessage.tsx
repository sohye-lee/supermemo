interface MessageProps {
  message: string | null;
}

export default function ErrorMessage({ message }: MessageProps) {
  return (
    <p className="text-[11px] bg- text-red-500 bg-red-100 mt-1 border border-red-200 rounded px-1">
      {message}
    </p>
  );
}
