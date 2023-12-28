import { Category } from "@prisma/client";
import Button from "../ui/button";
import { useEffect, useState } from "react";
import { IconChevronDown } from '@tabler/icons-react';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface ToggleItemProps {
    category: Category;
    [key: string]: any;
}

interface CateogryForm {
    name: string;
    note?: string;
}
// type UseMutationResult<T> = [(data: any) => void, CategoryForm<T>];
export default function ToggleItem (props:ToggleItemProps) {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}, setError} = useForm<CateogryForm>();
    const  [toggled, setToggled] = useState(false);
    const onClick = () => {
        setToggled(!toggled);
    }

    const [name, setName] = useState(props.category.name);
    const [note, setNote] = useState(props.category.note || "");
    const [update, setUpdate] = useState(false);
    const onValid = async (data:CateogryForm) => {
        const updates = await fetch(`/api/categories/${props.category.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then(res=> {setUpdate(true); router.replace('/admin/categories/new'); props.setNeedRefresh(!props.needRefresh); setToggled(false)}).catch((err) => console.log(err));
    }

    const deleteCategory = async( ) => {
        await fetch(`/api/categories/${props.category.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
              },
        }).then((res) => res.json()).then(res=> props.setNeedRefresh(!props.needRefresh)).catch(err=> console.log(err));
    }
    useEffect(() => {

    }, [update])

    return (
        <div className="relative w-full mb-2 border border-gray-300">
          
            {toggled?
            <div className="py-3 px-4 bg-gray-100 w-full block rounded-sm">
                <form onSubmit={handleSubmit(onValid)} >
                    <div className="w-full mb-2">
                        <input
                        {...register('name')}
                        type="text"
                        placeholder="Category Name"
                        value={name}
                        onChange={e => setName(e.currentTarget.value)}
                        className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
                        />
                    </div>
                    <div className="w-full mb-2">
                        <input
                        {...register('note')}
                        type="text"
                        placeholder="Memo"
                        value={note}
                        onChange={e => setNote(e.currentTarget.value)}
                        className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button  mode="save" size="small" button={true} >
                            Save
                        </Button>
                    </div>
                </form>
            </div> :
            <div className="py-2 px-3 bg-gray-100 w-full flex items-center justify-between  rounded-sm hover:text-white hover:bg-gray-400 transition-all">
                {props.category.name}

                <div className="flex items-center gap-2">

                <form action={deleteCategory}>
                    <Button   mode="danger" size="small" button={true}>
                        Delete
                    </Button>

                </form>
                <Button   mode="save" size="small" button={true} onClick={onClick}>
                    Edit
                </Button>
                </div>
            </div>
            }

        </div>
    )
}