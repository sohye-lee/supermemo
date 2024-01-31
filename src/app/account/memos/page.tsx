'use client';
import Container from '@/components/ui/container';
import Hero from '@/components/ui/hero';
import { Category, Like, Memo, Question } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import MemoItem from '@/components/ui/memoItem';

interface MemoProps extends Memo {
  category: Category;
  likes: Like[];
  questions: Question[];
}

export default function MyMemosPage() {
  const [memos, setMemos] = useState<MemoProps[]>();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log('userId ', userId);
  const renderMemos = memos ? (
    memos.map((memo: MemoProps) => {
      return <MemoItem memo={memo} key={memo.id} />;
    })
  ) : (
    <p className="text-gray-600 text-sm text-center w-full bg-gray-100 py-2 px-3">
      No memos yet.
    </p>
  );
  useEffect(() => {
    fetch(`/api/users/${userId}/memos`)
      .then((res) => res.json())
      .then((data) => setMemos(data?.memos));
  }, [setMemos, session]);
  return (
    <>
      <Hero title="My Memos" />
      <Container wide="full">
        <div
          className={`w-full grid ${
            memos && memos.length > 0
              ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }  gap-3 `}
        >
          {renderMemos}
        </div>
      </Container>
    </>
  );
}
