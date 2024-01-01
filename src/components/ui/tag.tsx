interface TagProps {
  text: string;
  link?: string;
  addClass?: string;
}

export default function Tag({ text, link = '', addClass }: TagProps) {
  return (
    <span
      className="px-1 py-[2px] border border-purple-400  text-purple-600 text-[12px]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {text}
    </span>
  );
}
