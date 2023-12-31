'use client';
import useMutation from '@/app/lib/client/useMutation';
import ErrorMessage from '@/components/forms/errorMessage';
import Button from '@/components/ui/button';
import { Question } from '@prisma/client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { MemoType, memoTypes } from '@/util/types';
import Loading from '@/app/loading';
import useUser from '@/app/lib/client/useUser';
import { Session } from 'next-auth';
import useSWR from 'swr';
import { IconCheck, IconTrash } from '@tabler/icons-react';
import QuestionCreateItem from './questionCreateItem';
import QuestionEditItem from './questionEditItem';

interface QuestionForm {
  question: string;
  image?: string;
  answer: string;
  memoId: string;
  [key: string]: any;
}
interface MemoCreateFormProps {
  serverSession: Session | null;
}

export default function QuestionCreateForm({
  serverSession,
}: MemoCreateFormProps) {
  const router = useRouter();
  const { user } = useUser();
  const { id } = useParams();
  console.log('user on question form page: ', user);
  const { data: myQuestions, error: myQuestionsError } = useSWR(
    `/api/memos/${id}/questions`
  );
  const [createQuestion, { loading, data, error }] = useMutation(
    `/api/memos/${id}/questions`
  );
  const [serverMessage, setServerMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionForm>();

  const [questions, setQuestions] = useState<Question[]>([]);
  const onValid = (validForm: QuestionForm) => {
    validForm.append('userEmail', serverSession?.user?.email);
    createQuestion(validForm);
    // router.push('/memos/questions/new');
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
        console.log(data.questions);
      })
      .catch((err) => console.log(err));
  }, [router, questions]);

  return (
    <>
      {loading ? <Loading /> : null}
      <div className="flex flex-col items-center gap-3">
        {error && (
          <div className="mb-3">
            <ErrorMessage message={'error'} />
          </div>
        )}
        {renderQuestions}
        <QuestionCreateItem
          memoId={id + ''}
          userEmail={serverSession?.user?.email + ''}
        />
        {/* <form onSubmit={handleSubmit(onValid)} className="w-full flex  gap-2">
          <div className="w-full  ">
            <input
              {...register('question', {
                required: 'Please enter a question.',
                minLength: {
                  message: 'The question should be longer than 5 chars.',
                  value: 5,
                },
              })}
              type="text"
              placeholder="Question"
              className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
            />
            {errors.name ? (
              <ErrorMessage
                message={errors?.title?.message?.toString() || ''}
              />
            ) : null}
          </div>
          <div className="w-full  ">
            <input
              {...register('answer', {
                required: 'Please enter an answer.',
              })}
              type="text"
              placeholder="Answer"
              className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
            />
            {errors.name ? (
              <ErrorMessage
                message={errors?.title?.message?.toString() || ''}
              />
            ) : null}
          </div>

          <input
            {...register('userEmail')}
            value={serverSession?.user?.email || ''}
            className="hidden"
          />
          <input {...register('memoId')} value={id} className="hidden" />
          <div className="flex justify-end gap-2">
            <Button size="small" button={true} mode="success" addClass="p-0">
              <IconCheck size={24} />
            </Button>
            <Button size="small" button={true} mode="danger" addClass="p-0">
              <IconTrash size={20} />
            </Button>
          </div>
        </form> */}
      </div>
    </>
  );
}
