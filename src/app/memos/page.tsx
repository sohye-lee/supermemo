'use client';
import Container from '@/components/ui/container';
import MemoItem from '@/components/ui/memoItem';
import { Category, Like, Memo, Question } from '@prisma/client';
import { useEffect, useState } from 'react';
import Loading from '../loading';

interface MemoProps extends Memo {
  category: Category;
  likes: Like[];
  questions: Question[];
}

export default function MemosPage() {
  const [memos, setMemos] = useState<MemoProps[]>();
  const [loading, setLoading] = useState(false);

  const renderMemos =
    memos && memos.length > 0
      ? memos.map((memo) => {
          return <MemoItem key={memo.id} memo={memo} />;
        })
      : null;

  useEffect(() => {
    fetch('/api/memos')
      .then((res) => res.json())
      .then((data) => setMemos(data.memos))
      .catch((err) => console.log(err));
  }, [setMemos]);

  return (
    <div className="pt-12">
      {!memos ? (
        <Loading />
      ) : (
        <Container wide="wide">
          <div className="w-full grid grid-cols-3 gap-3">{renderMemos}</div>
        </Container>
      )}
    </div>
  );
}
