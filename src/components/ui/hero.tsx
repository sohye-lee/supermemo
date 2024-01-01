import type { StaticImageData } from 'next/image';
import Image from 'next/image';

interface HeroProps {
  // img: StaticImageData;
  // alt: string;
  title: string;
  description?: string;
  [key: string]: any;
}

export default function Hero(props: HeroProps) {
  return (
    <div
      id="hero"
      className="relative w-full h-36 md:h-48 pt-8 md:pt-14 flex flex-col items-center justify-center overflow-hidden"
      // style={{ backgroundImage: 'url(/public/image/bg-gradient-1.jpg)' }}
    >
      <h1 className="text-2xl font-medium z-10 text-white">{props.title}</h1>
      {props.description ? (
        <p className="mt-3 text-slate-600">{props.description}</p>
      ) : null}
      {/* <div className="absolute z-0 inset-0">
        <Image
          src={props.img}
          alt={props.alt}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-300" />
      </div> */}
    </div>
  );
}
