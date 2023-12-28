'use client';
import useMutation from "@/app/lib/client/useMutation";
import ErrorMessage from "@/components/forms/errorMessage";
import Button from "@/components/ui/button";
import { Category } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ToggleItem from "./toggleItem";

interface CategoryForm {
  name: string;
  note?: string;
}
export default async function CategoryCreateForm() {
  const [createCategory, {loading, data, error}] = useMutation('/api/categories');
  const router = useRouter();
  const {register, handleSubmit, formState: {errors}} = useForm<CategoryForm>();
  const [categories, setCategories] = useState<Category[]>([])
  const [needRefresh, setNeedRefresh] = useState(false);

  const onValid = (validForm: CategoryForm) => {
    createCategory(validForm);
    
  }

  useEffect(() => {
    fetch('/api/categories', {
        method: "GET",
        headers: {
            'Content-Type': "application/json"
        }
    }).then((res) => res.json()).then((data) => setCategories(data.categories))
    

  }, [setCategories, handleSubmit, needRefresh])


  const renderCategories = categories? categories.map(c => {
    // return <Link key={c.id} href="/" className="py-2 px-3 bg-gray-100 w-full block rounded-sm hover:text-white hover:bg-gray-400 transition-all">{c.name}</Link>
    return <ToggleItem category={c} setNeedRefresh={setNeedRefresh} needRefresh={needRefresh} />
  }) : <p className="text-sm text-center mt-8 text-gray-600">No category yet.</p>

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
                    placeholder="Category Name"
                    className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
                    />
                    {errors.name ? (
                    <ErrorMessage message={errors.name.message || ''} />
                    ) : null}
                </div>
                <div className="w-full mb-2">
                    <input
                    {...register('note') } 
                    type="text"
                    placeholder="Memo"
                    className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
                    />
                    {errors.name ? (
                    <ErrorMessage message={errors.note?.message || ''} />
                    ) : null}
                </div>
                <div className="flex justify-end  ">
                    <Button size="medium" button={true} mode="success"  >
                        Create
                    </Button>
                </div>
            </form>
        </div>
        <div className="mt-8 pt-8 border-t ">
            {renderCategories}
        </div>
    </>
 

  );
}
