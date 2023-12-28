import type { StaticImageData } from 'next/image';
import Image from 'next/image';

interface HeroProps {
  img: StaticImageData;
  alt: string;
  title: string;
  description?: string;
}

export default function Hero(props: HeroProps) {
  return (
    <div className="relative w-full h-36 md:h-48 pt-8 md:pt-16 flex flex-col items-center justify-center overflow-hidden">
      <h1 className="text-2xl font-medium z-10">{props.title}</h1>
      {props.description ? (
        <p className="mt-3 text-slate-600">{props.description}</p>
      ) : null}
      <div className="absolute z-0 inset-0">
        <Image
          src={props.img}
          alt={props.alt}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-300" />
      </div>
    </div>
  );
}
