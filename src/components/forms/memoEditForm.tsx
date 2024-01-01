'use client';
import useMutation from '@/app/lib/client/useMutation';
import ErrorMessage from '@/components/forms/errorMessage';
import Button from '@/components/ui/button';
import { Category } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { MemoType, memoTypes } from '@/util/types';
import Loading from '@/app/loading';
import useUser from '@/app/lib/client/useUser';
import { Session, getServerSession } from 'next-auth';
import useSWR from 'swr';
import { IconPencil } from '@tabler/icons-react';
// import  from 'swr';

interface MemoForm {
  name: string;
  type: MemoType;
  topic?: string;
  userEmail: string;
  categoryId: number;
}
interface MemoEditFormProps {
  serverSession: Session | null;
  categoryId: number;
  [key: string]: any;
}

export default function MemoEditForm({
  serverSession,
  categoryId,
}: MemoEditFormProps) {
  const router = useRouter();
  const { id } = useParams();
  // const { data, error } = useSWR(`/api/memos/${id}`, (url: string) =>
  //   fetch(url).then((res) => res.json())
  // );

  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(true);
  };
  const [initialData, setInitialData] = useState<MemoForm>({
    name: '',
    topic: '',
    type: 'other',
    categoryId: categoryId,
    userEmail: serverSession?.user?.email + '',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemoForm>({
    defaultValues: {
      name: initialData.name,
      topic: initialData.topic,
      type: initialData.type,
      categoryId: categoryId,
      userEmail: serverSession?.user?.email + '',
    },
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const onValid = async () => {
    await fetch(`/api/memos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(initialData),
    })
      .then((res) => res.json())
      .then((res) => router.refresh())
      .catch((err) => console.log(err));

    router.refresh();
    setOpen(false);
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
          checked={type == initialData?.type}
          onClick={(e) =>
            setInitialData({
              ...initialData,
              type: e.currentTarget.value as MemoType,
            })
          }
          className="mt-1"
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

    fetch(`/api/memos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInitialData({
          name: data.memo.name,
          type: data.memo.type,
          topic: data.memo.topic,
          categoryId: categoryId,
          userEmail: serverSession?.user?.email + '',
        });
        console.log('data: ', data);
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [setCategories, router, setInitialData]);

  console.log('initialDAta: ', initialData);
  return (
    <>
      <div className="pb-5 flex justify-center">
        <Button
          mode="neutral"
          size="small"
          button={true}
          onClick={onClick}
          addClass="flex justify-center items-center gap-1"
        >
          <IconPencil size={16} /> Edit Memo
        </Button>
      </div>

      <div
        className={`fixed top-0 left-0 z-100 bg-[rgba(0,0,0,.6)] w-screen h-screen justify-center items-center ${
          open ? 'flex' : 'hidden'
        }`}
      >
        <div className="p-6 bg-gray-100 rounded-sm flex flex-col items-center ">
          {/* {error && (
          <div className="mb-3">
            <ErrorMessage message="Something went wrong." />
          </div>
        )} */}
          <form
            onSubmit={handleSubmit(onValid)}
            className="w-full flex flex-col gap-2"
          >
            <div className="w-full mb-2">
              <input
                {...register('name', {
                  required: 'Name field is required',
                  minLength: {
                    message: 'The category name should be longer than 3 chars.',
                    value: 3,
                  },
                })}
                type="text"
                placeholder="Memo Name"
                value={initialData?.name}
                onChange={(e) =>
                  setInitialData({
                    ...initialData,
                    name: e.currentTarget.value,
                  })
                }
                className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
              />
              {errors.name ? (
                <ErrorMessage message={errors.name.message || ''} />
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
                value={initialData?.topic}
                onChange={(e) =>
                  setInitialData({
                    ...initialData,
                    topic: e.currentTarget.value,
                  })
                }
                placeholder="Topic"
                className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
              />
              {errors.topic ? (
                <ErrorMessage message={errors.topic?.message || ''} />
              ) : null}
            </div>
            <div className="w-full mb-2">
              <select
                {...register('categoryId', {
                  required: 'Please select a category',
                })}
                required
                name="categoryId"
                value={initialData?.categoryId}
                onSelect={(e) => {
                  setInitialData({
                    ...initialData,
                    categoryId: Number(e.currentTarget.value),
                  });
                  console.log(e.currentTarget.value);
                }}
                className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
              >
                <option value="">select</option>
                {categories && categories.length > 0 ? renderCategories : null}
              </select>
              {errors.categoryId ? (
                <ErrorMessage message={errors.categoryId?.message || ''} />
              ) : null}
            </div>
            <input
              {...register('userEmail')}
              value={serverSession?.user?.email || ''}
              className="hidden"
            />
            <div className="flex justify-end  ">
              <Button size="medium" button={true} mode="save">
                Edit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
