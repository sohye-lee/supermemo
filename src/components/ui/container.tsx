interface ContainerProps {
  [key: string]: any;
  wide: 'full' | 'wide' | 'narrow';
  children: React.ReactNode;
}

export default function Container({
  wide,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div className="container mx-auto">
      <div
        className={`${
          wide =='full' ? 'w-full' : wide =="narrow" ? 'w-[420px]' : 'w-[768px]'
        } max-w-[90vw] mx-auto`}
      >
        <div className="w-full mx-auto py-16">{children}</div>
      </div>
    </div>
  );
}
