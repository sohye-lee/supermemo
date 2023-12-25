'use client';
import Button from '@/components/ui/button';

export default function ErrorPage() {
  return (
    <div className="w-full flex justify-center flex-col items-center">
      <p className="text-gray-800 text-md mb-3">Something went wrong...</p>
      <Button mode="neutral" size="small" link="/" button={false}>
        Go Home
      </Button>
    </div>
  );
}
