'use client';
import useMutation from '@/app/lib/client/useMutation';
import ErrorMessage from '@/components/forms/errorMessage';
import Button from '@/components/ui/button';
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { MemoType, memoTypes } from '@/util/types';
import Loading from '@/app/loading';
import useUser from '@/app/lib/client/useUser';

interface MemoForm {
  name: string;
  type: MemoType;
  topic?: string;
  userEmail: string;
  categoryId: number;
}
export default function MemoCreateForm() {
  const router = useRouter();
  const {data: session} = useSession();
  if (!session) {
    router.push('/account/login');
  }
  const [createMemo, { loading, data, error }] = useMutation('/api/memos');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemoForm>();
 
  const [categories, setCategories] = useState<Category[]>([])
  const onValid = (validForm: MemoForm) => {
    createMemo(validForm);
  };

  const renderCategories = categories && categories.length > 0 ? 
    categories.map(category => {
      return <option {...register("type")} key={category.id} value={category.id}>{category.name}</option>
    }): null;

  const renderType = memoTypes.map(type => {
    return (
      <div className="flex items-center gap-3" key={type}>
        <input type="radio" id={type} name="type" value={type} />
        <label htmlFor={type}  className="text-sm">{type}</label>
      </div>
    )
  })


  useEffect(() => {
    fetch('/api/categories')
    .then(res => res.json())
    .then(data => {setCategories(data.categories); console.log(data)})
    .catch(err => console.log(err));
  }, [setCategories ])
   

  return (
    <> 
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
              {...register('name', {
                required: 'Name field is required',
                minLength: {
                  message: 'The category name should be longer than 3 chars.',
                  value: 3,
                },
              })}
              type="text"
              placeholder="Memo Name"
              className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
            />
            {errors.name ? (
              <ErrorMessage message={errors.name.message || ''} />
            ) : null}
          </div>
          <div className="w-full mb-2">
            <fieldset name="type">
              <legend className="text-sm">Select type of your SuperMemo.</legend>
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
            required: "Please select a category"
           })}
           
            name="categoryId"
            className='rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2'
            >
              <option selected disabled>select</option>
              {categories && categories.length > 0 ? renderCategories: null}
           </select>
            {errors.name ? (
              <ErrorMessage message={errors.categoryId?.message || ''} />
            ) : null}
          </div>
          <input  id="userEmail" name="userEmail" onChange={e => console.log(e.currentTarget.value)} value={session?.user?.email || ""} />
          <div className="flex justify-end  ">
            <Button size="medium" button={true} mode="success">
              Create
            </Button>
          </div>
        </form>
      </div>
     
    </>
  );
}
