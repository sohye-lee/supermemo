'use client';
import Button from '@/components/ui/button';
import { Question } from '@prisma/client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { Session } from 'next-auth';
import QuestionCreateItem from './questionCreateItem';
import QuestionEditItem from './questionEditItem';

interface QuestionCreateFormProps {
  serverSession: Session | null;
}

export default function QuestionCreateForm({
  serverSession,
}: QuestionCreateFormProps) {
  const router = useRouter();
  const { id } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const addForm = () => {
    router.refresh();
    setOpenForm(true);
  };

  const renderQuestions = questions
    ? questions.map((q: Question) => {
        return (
          <QuestionEditItem
            key={q.id}
            memoId={id + ''}
            questionId={q.id}
            userEmail={serverSession?.user?.email + ''}
          />
        );
      })
    : null;

  useEffect(() => {
    fetch(`/api/memos/${id}/questions`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
      })
      .catch((err) => console.log(err));
  }, [router, questions]);

  return (
    <>
      {!questions ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center gap-3">
          {renderQuestions}
          <div className="flex justify-center py-3">
            <Button
              size="medium"
              mode="success"
              button={true}
              onClick={addForm}
            >
              Add
            </Button>
          </div>
          {openForm && (
            <QuestionCreateItem
              setOpenForm={setOpenForm}
              memoId={id + ''}
              userEmail={serverSession?.user?.email + ''}
            />
          )}
        </div>
      )}
    </>
  );
}
