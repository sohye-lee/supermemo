interface ContainerProps {
  [key: string]: any;
  full: boolean;
  narrow: boolean;
  children: React.ReactNode;
}

export default function Container({
  full,
  narrow,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div className="container mx-auto">
      <div
        className={`${
          full ? 'w-full' : narrow ? 'w-[420px]' : 'w-[768px]'
        } max-w-[90vw] mx-auto`}
      >
        <div className="w-full mx-auto py-16">{children}</div>
      </div>
    </div>
  );
}
