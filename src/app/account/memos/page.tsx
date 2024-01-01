'use client';
import Container from '@/components/ui/container';
import Hero from '@/components/ui/hero';
import Tag from '@/components/ui/tag';
import { Category, Like, Memo, Question } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { IconHeart, IconClipboardText } from '@tabler/icons-react';
import useSWR from 'swr';

interface MemosProps extends Memo {
  category: Category;
  likes: Like[];
  questions: Question[];
}

export default function MyMemosPage() {
  const [memos, setMemos] = useState<MemosProps[]>();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log('userId ', userId);
  const renderMemos = memos ? (
    memos.map((memo: MemosProps) => {
      return (
        <div
          className="h-full bg-gray-100 rounded p-4 border hover:border-slate-700 flex flex-col justify-between"
          key={memo.id}
        >
          <div>
            <div className="mb-2 space-x-1">
              <Tag text={memo.category.name} />
              <Tag text={memo.type} />
            </div>
            <h3 className="font-semibold text-lg">{memo.name}</h3>
          </div>
          <div className="mt-3 flex gap-3">
            <div className="flex items-center gap-1 text-sm">
              <IconHeart size="16" color="#e73c7e" />
              {memo.likes.length}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <IconClipboardText size="16" color="#2367d5" />
              {memo.questions.length}
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <p className="text-gray-600 text-sm text-center">No memos yet.</p>
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
        <div className="w-full grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {renderMemos}
        </div>
      </Container>
    </>
  );
}
