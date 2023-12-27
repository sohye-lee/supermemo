'use client';
import Button from '@/components/ui/button';
import Input from '@/components/forms/input';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import GoogleButton from '../ui/googleButton';
import { useForm } from 'react-hook-form';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit} = useForm();
  const onValid = (data: LoginForm) => {
    console.log(data)
  }
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   const formData = new FormData(e.currentTarget);
  //   const response = await signIn('credentials', {
  //     email: formData.get('email'),
  //     password: formData.get('password'),
  //     //   redirect: false,
  //   });
  //   // redirect('/');
  //   if (!response?.error) {
  //     console.log(response?.error);
  //     router.push('/');
  //     router.refresh();
  //   } else {
  //     router.push('/');
  //   }
  // };

  return (
    <div className="p-8 bg-gray-100 rounded-sm flex flex-col items-center">
      <form
        // onSubmit={handleSubmit}
        method="POST"
        className="w-full flex flex-col gap-2"
      >
        <Input
        {...register("email")}
          label="Email"
          type="input"
          inputType="email"
          id="email"
          name="email"
        />
        <Input
          label="Password"
          type="input"
          inputType="password"
          id="password"
          name="password"
        />

        <Button size="medium" button={true} mode="black" addClass="mt-3">
          Login
        </Button>

        <div className="w-full flex item-center justify-center relative">
          <div className="w-full h-1 border-t border-gray-300 absolute top-[50%] left-0 z-0"></div>
          <span className="px-5 text-xs font-semibold bg-gray-100 z-10">
            or
          </span>
        </div>

        <GoogleButton>Login In with Google</GoogleButton>
        <p className="text-xs text-center mt-3">
          If you don&apos;t have an account, please
          <Link
            href="/account/register"
            className="text-purple-600 hover:text-purple-800 ml-2 font-semibold"
          >
            Sign Up
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
