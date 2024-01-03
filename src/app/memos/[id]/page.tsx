// memos/[id]/page
'use client';
import Card from '@/components/ui/card';
import Container from '@/components/ui/container';
import Hero from '@/components/ui/hero';
import { Category, Memo, Like, Question, Know } from '@prisma/client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  IconChevronLeft,
  IconChevronLeftPipe,
  IconChevronRight,
  IconChevronRightPipe,
  IconCheck,
  IconFlagQuestion,
} from '@tabler/icons-react';
import { useSession } from 'next-auth/react';

interface QuestionWithKnows extends Question {
  knows: Know[];
}
interface MemoProps extends Memo {
  category: Category;
  likes: Like[];
  questions: QuestionWithKnows[];
  [key: string]: any;
}
export default function MemoPage(props: any) {
  const { id } = useParams();
  const [memo, setMemo] = useState<MemoProps>();
  const [index, setIndex] = useState(0);
  const { data: session } = useSession();
  const [flipped, setFlipped] = useState(false);

  const renderQuestions =
    memo && memo.questions.length > 0
      ? memo.questions.map((question) => {
          return <Card key={question.id} question={question} />;
        })
      : null;

  const renderCurrentQuestion =
    memo && memo.questions.length > 0 ? (
      <Card
        question={memo.questions[index]}
        setIndex={setIndex}
        setFlipped={setFlipped}
        flipped={flipped}
      />
    ) : null;

  const goLeft = () => {
    if (index == 0) {
      return null;
    }
    setIndex(index - 1);
    setFlipped(false);
  };

  const goRight = () => {
    if (memo && index == memo?.questions?.length - 1) {
      return null;
    }
    setIndex(index + 1);
    setFlipped(false);
  };

  useEffect(() => {
    fetch(`/api/memos/${id}`)
      .then((res) => res.json())
      .then((data) => setMemo(data.memo))
      .catch((err) => console.log(err));
    console.log(memo?.questions.length);
  }, []);

  return (
    <>
      <Hero title={memo?.name!} />
      <Container wide="wide">
        <div className="mx-auto w-[700px] max-w-[90vw]">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="p-sm px-3 py-1 rounded-[50px] border border-purple-600 text-purple-600">
              All
            </div>
            <div className="p-sm px-3 py-1 rounded-[50px] border border-purple-600 text-purple-600 flex gap-2 items-center">
              <IconCheck size={12} />
              Know
            </div>
            <div className="p-sm px-3 py-1 rounded-[50px] border border-purple-600 text-purple-600 flex gap-2 items-center">
              <IconFlagQuestion size={12} />
              Don&apos;t Know (
              {
                memo?.questions.filter((q) =>
                  q.knows.filter(
                    (k) => k.questionId == q.id && k.userId == session?.user?.id
                  )
                ).length
              }
              )
            </div>
          </div>
          {renderCurrentQuestion}
        </div>
        <div className="flex justify-center items-center gap-4 mt-5">
          <div
            className="flex justify-center items-center p-2 h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 shadow-md hover:shadow-none border border-black"
            onClick={() => setIndex(0)}
          >
            <IconChevronLeftPipe />
          </div>
          <div
            className="flex justify-center items-center p-2 h-10 w-10 rounded-full bg-black hover:bg-gray-700 shadow-md hover:shadow-none border border-black"
            onClick={goLeft}
          >
            <IconChevronLeft color="white" />
          </div>
          <div className="px-5 text-sm">
            {index + 1} / {memo?.questions.length}
          </div>
          <div
            className="flex justify-center items-center p-2 h-10 w-10 rounded-full bg-black hover:bg-gray-700 shadow-md hover:shadow-none border border-black"
            onClick={goRight}
          >
            <IconChevronRight color="white" />
          </div>
          <div
            className="flex justify-center items-center p-2 h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 shadow-md hover:shadow-none border border-black"
            onClick={() => setIndex(memo?.questions.length! - 1)}
          >
            <IconChevronRightPipe />
          </div>
        </div>
      </Container>
    </>
  );
}
