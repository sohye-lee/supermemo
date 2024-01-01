import { useForm } from 'react-hook-form';
import ErrorMessage from './errorMessage';
import Button from '../ui/button';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Question } from '@prisma/client';

interface QuestionEditForm {
  question: string;
  image?: string;
  answer: string;
  memoId: string;
  [key: string]: any;
}

interface QuestionEditItemProps {
  memoId: string;
  userEmail: string;
  questionId: number;
  [key: string]: any;
}

export default function QuestionEditItem({
  memoId,
  userEmail,
  questionId,
}: QuestionEditItemProps) {
  const {
    register,
    formState: { errors },
  } = useForm<QuestionEditForm>();

  const router = useRouter();
  const [question, setQuestion] = useState<Question>();
  const [formdata, setFormdata] = useState({
    question: question?.question,
    image: question?.image,
    answer: question?.answer,
    memoId,
    userEmail,
  });

  const deleteForm = async (questionId: number) => {
    await fetch(`/api/memos/${memoId}/questions/${questionId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => router.refresh())
      .catch((err) => console.log('ERROR while DELETING: ', err));
  };

  const editForm = async () => {
    await fetch(`/api/memos/${memoId}/questions/${questionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then((res) => router.refresh())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`/api/memos/${memoId}/questions/${questionId}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.question);
        setFormdata({
          ...formdata,
          question: data.question.question,
          answer: data.question.answer,
          image: data.question.image,
        });
      })
      .catch((err) => console.log(err));
  }, [setQuestion, questionId, memoId, setFormdata]);
  return (
    <form
      action={editForm}
      className="w-full flex  gap-2 p-6 bg-gray-100 rounded-sm "
    >
      <div className="w-full flex flex-col ">
        <textarea
          {...register('question', {
            required: 'Please enter a question.',
          })}
          onChange={(e) =>
            setFormdata({ ...formdata, question: e.currentTarget.value })
          }
          value={formdata?.question}
          placeholder="Question"
          rows={4}
          className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
        ></textarea>
        {errors.question ? (
          <ErrorMessage message={errors.question?.message || ''} />
        ) : null}
      </div>
      <div className="w-full flex flex-col ">
        <textarea
          {...register('answer', {
            required: 'Please enter an answer.',
          })}
          onChange={(e) =>
            setFormdata({ ...formdata, answer: e.currentTarget.value })
          }
          value={formdata?.answer}
          placeholder="Answer"
          rows={4}
          className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
        ></textarea>
        {errors.answer ? (
          <ErrorMessage message={errors.answer?.message || ''} />
        ) : null}
      </div>

      <div className="flex justify-end gap-2">
        <Button size="small" button={true} mode="save" addClass="p-0 h-12">
          <IconEdit size={24} />
        </Button>
        <Button
          size="small"
          button={true}
          mode="danger"
          addClass="p-0 h-12"
          type="button"
          onClick={() => deleteForm(questionId)}
        >
          <IconTrash size={20} />
        </Button>
      </div>
    </form>
  );
}
