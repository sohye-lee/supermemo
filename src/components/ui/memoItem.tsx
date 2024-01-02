'use client';
import Container from '@/components/ui/container';
import Hero from '@/components/ui/hero';
import Tag from '@/components/ui/tag';
import { Category, Like, Memo, Question } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { IconHeart, IconClipboardText } from '@tabler/icons-react';
import useSWR from 'swr';
import Link from 'next/link';

interface MemoProps extends Memo {
  category: Category;
  likes: Like[];
  questions: Question[];
  [key: string]: any;
}
interface MemoItemProps {
  memo: MemoProps;
}

export default function MemoItem({ memo }: MemoItemProps) {
  return (
    <Link
      href={`/memos/${memo.id}`}
      className="h-full bg-gray-100 rounded p-4 border hover:border-slate-700 flex flex-col justify-between min-h-[180px]"
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
    </Link>
  );
}
