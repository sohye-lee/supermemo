import Image from 'next/image';

export default function Home() {
  setTimeout(async () => {
    console.log('load...');
  }, 10000);
  return (
    <main className="flex flex-col items-center justify-between p-24"></main>
  );
}
