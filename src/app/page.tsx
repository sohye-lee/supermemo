'use client';
import { ExtendedMemo } from '@/util/types';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function Home() {
  const { data, error } = useSWR('/api/memos');
  const [memos, setMemos] = useState<ExtendedMemo[]>([]);

  const renderMemos =
    memos && memos.length > 0
      ? memos.map((memo) => {
          return <div key={memo.id}>{memo.name}</div>;
        })
      : null;
  useEffect(() => {
    data && data.memos && setMemos(data.memos);
  }, [data]);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      {renderMemos}
    </main>
  );
}
