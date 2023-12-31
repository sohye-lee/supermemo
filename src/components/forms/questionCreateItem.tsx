import { useForm } from 'react-hook-form';
import ErrorMessage from './errorMessage';
import { Session } from 'next-auth';
import Button from '../ui/button';
import { IconCheck, IconTrash, IconEdit } from '@tabler/icons-react';
import useMutation from '@/app/lib/client/useMutation';

interface QuestionForm {
  question: string;
  image?: string;
  answer: string;
  memoId: string;
  [key: string]: any;
}

interface QuestionCreateItemProps {
  // serverSession: Session | null;
  memoId: string;
  userEmail: string;
  [key: string]: any;
}

export default function QuestionCreateItem({
  memoId,
  userEmail,
}: QuestionCreateItemProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<QuestionForm>();
  const [createQuestion, { loading, data, error }] = useMutation<QuestionForm>(
    `/api/memos/${memoId}/questions`
  );

  const onValid = (validForm: QuestionForm) => {
    createQuestion(validForm);
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="w-full flex  gap-2 p-6 bg-gray-100 rounded-sm "
    >
      <div className="w-full flex flex-col ">
        <textarea
          {...register('question', {
            required: 'Please enter a question.',
            minLength: {
              message: 'The question should be longer than 5 chars.',
              value: 5,
            },
          })}
          placeholder="Question"
          className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
        ></textarea>
        {errors.name ? (
          <ErrorMessage message={errors.question?.message || ''} />
        ) : null}
      </div>
      <div className="w-full flex flex-col ">
        <textarea
          {...register('answer', {
            required: 'Please enter an answer.',
          })}
          placeholder="Answer"
          className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
        ></textarea>
        {errors.name ? (
          <ErrorMessage message={errors.answer?.message || ''} />
        ) : null}
      </div>

      <input
        {...register('userEmail')}
        value={userEmail || ''}
        className="hidden"
      />
      <input {...register('memoId')} value={memoId} className="hidden" />
      <div className="flex justify-end gap-2">
        <Button size="small" button={true} mode="success" addClass="p-0 h-12">
          <IconCheck size={24} />
        </Button>
        <Button size="small" button={true} mode="danger" addClass="p-0 h-12">
          <IconTrash size={20} />
        </Button>
      </div>
    </form>
  );
}
