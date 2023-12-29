'use client';
import useMutation from '@/app/lib/client/useMutation';
import ErrorMessage from '@/components/forms/errorMessage';
import Button from '@/components/ui/button';
import { Category } from '@prisma/client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { MemoType, memoTypes } from '@/util/types';
import Loading from '@/app/loading';
import useUser from '@/app/lib/client/useUser';
import { Session } from 'next-auth';
import useSWR from 'swr';

interface QuestionForm {
  question: string;
  image?: string;
  answer: string;
  memoId: string;
  [key:string]: any;
}
interface MemoCreateFormProps {
  serverSession: Session | null;
}
 
export default function QuestionCreateForm({
  serverSession,
}: MemoCreateFormProps) {
  const router = useRouter();
  const {user} = useUser();
  const {id} = useParams();
  const {data:myQuestions, error:myQuestionsError} = useSWR(`/api/memos/${id}/questions`);
  const [createQuestion, { loading, data, error }] = useMutation(`/api/memos/${id}/questions`);
  const [serverMessage, setServerMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionForm>();

  const [categories, setCategories] = useState<Category[]>([]);
  const onValid = (validForm: QuestionForm) => {
    validForm.append('userId', user?.id)
    createQuestion(validForm);
    // router.push('/memos/questions/new');
  };

  
  const renderCategories =
    categories && categories.length > 0
      ? categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          );
        })
      : null;

  const renderType = memoTypes.map((type) => {
    return (
      <div className="flex items-center gap-3" key={type}>
        <input
          {...register('type')}
          type="radio"
          id={type}
          value={type.toString()}
        />
        <label htmlFor={type} className="text-sm">
          {type}
        </label>
      </div>
    );
  });

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((err) => console.log(err));
  }, [setCategories, user, router]);

  return (
    <>
      {loading ? <Loading /> : null}
      <div className="p-6 bg-gray-100 rounded-sm flex flex-col items-center ">
        {error && (
          <div className="mb-3">
            <ErrorMessage message={'error'} />
          </div>
        )}
        <form
          onSubmit={handleSubmit(onValid)}
          className="w-full flex flex-col gap-2"
        >
          <div className="w-full mb-2">
            <input
              {...register('title', {
                required: 'You need title.',
                minLength: {
                  message: 'The category name should be longer than 5 chars.',
                  value: 5,
                },
              })}
              type="text"
              placeholder="Memo Name"
              className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
            />
            {errors.name ? (
              <ErrorMessage message={errors?.title?.message?.toString() || ''} />
            ) : null}
          </div>
          <div className="w-full mb-2">
            <fieldset {...register('type')} name="type">
              <legend className="text-sm">
                Select type of your SuperMemo.
              </legend>
              {renderType}
            </fieldset>
          </div>
          <div className="w-full mb-2">
            <input
              {...register('topic')}
              type="text"
              placeholder="Topic"
              className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
            />
            {errors.name ? (
              <ErrorMessage message={errors.topic?.message || ''} />
            ) : null}
          </div>
          <div className="w-full mb-2">
            <select
              {...register('categoryId', {
                required: 'Please select a category',
              })}
              name="categoryId"
              className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
              defaultValue=""
            >
              <option disabled value="">
                select
              </option>
              {categories && categories.length > 0 ? renderCategories : null}
            </select>
            {errors.name ? (
              <ErrorMessage message={errors.categoryId?.message || ''} />
            ) : null}
          </div>
          <input
            {...register('userEmail')}
            value={serverSession?.user?.email || ''}
            className="hidden"
          />
          <div className="flex justify-end  ">
            <Button size="medium" button={true} mode="success">
              Next
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
