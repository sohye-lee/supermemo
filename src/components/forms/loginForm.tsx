'use client';
import Button from '@/components/ui/button';
import Input from '@/components/forms/input';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import GoogleButton from '../ui/googleButton';
import { useForm } from 'react-hook-form';
import ErrorMessage from './errorMessage';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit,    formState: { errors },} = useForm<LoginForm>();
  // const onValid = async (validForm: LoginForm) => {
  //   console.log(validForm)
  //   signIn( )
  //   router.push('/');
  // }
  const onValid = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    console.log(email)
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
 
    console.log({ response });
    if (!response?.error) {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="p-8 bg-gray-100 rounded-sm flex flex-col items-center">
      <form
        onSubmit={onValid}
        method="POST"
        className="w-full flex flex-col gap-2"
      >
        <div className="w-full mb-2">
          <input
            {...register('email', {
              required: 'Username is required',
              minLength: {
                message: 'The username should be longer than 3 chars.',
                value: 3,
              },
            })}
            type="email"
            placeholder="Username"
            className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
          />
          {errors.email ? (
            <ErrorMessage message={errors.email.message || ''} />
          ) : null}
        </div>
        <div className="w-full mb-2">
          <input
            {...register('password', {
              required: 'Password is required',
 
            })}
            type="password"
            placeholder="Password"
            className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
          />
 
        </div>
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
