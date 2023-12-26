'use client';
import * as React from 'react';
import Button from '@/components/ui/button';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import GoogleButton from '../ui/googleButton';
import { useForm } from 'react-hook-form';
import ErrorMessage from './errorMessage';
import useMutation from '@/app/lib/client/useMutation';
import { useState } from 'react';

interface RegisterForm {
  name?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface MutationResult {
  ok: boolean;
}

export default   function RegisterForm() {
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ mode: 'onBlur' });
  const [serverError, setServerError] = useState('');
  const [enter, {loading, data, error}] = useMutation<MutationResult>('/api/register');
  const onValid = async (validForm: RegisterForm) => {
    // enter(validForm);
    fetch('/api/register', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(validForm)
    })
    .then((res) => res.json())
    .then((res) => router.push(`/account/${res.user.id}`))
    .catch((err) => {
      setServerError(err.message);
    })
  };
 
  return (
    <div className="p-8 bg-gray-100 rounded-sm flex flex-col items-center">
      {serverError != "" && <ErrorMessage message={serverError} />}
      <form
        onSubmit={handleSubmit(onValid)}
        className="w-full flex flex-col gap-2"
      >
        <div className="w-full mb-2">
          <input
            {...register('name', {
              required: 'Username is required',
              minLength: {
                message: 'The username should be longer than 5 chars.',
                value: 5,
              },
            })}
            type="text"
            placeholder="Username"
            className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
          />
          {errors.name ? (
            <ErrorMessage message={errors.name.message || ''} />
          ) : null}
        </div>

        <div className="w-full mb-2">
          <input
            {...register('email', {
              required: 'Email is required',
              validate: {
                notEmail: (value) =>
                   value.includes('@')  || 'Please enter a valid email.',
              },
            })}
            type="email"
            placeholder="id@mail.com"
            className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
          />
          {errors.email ? (
            <ErrorMessage message={errors.email?.message || ''} />
          ) : null}
        </div>
        <div className="w-full mb-2">
          <input
            {...register('password', {
              required: 'Please set your password.',
              pattern: {
                value: RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/i),
                message:
                  'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters',
              },
              minLength: {
                value: 8,
                message: 'Password should be longer than 8 characters.',
              },
            })}
            type="password"
            placeholder="More than 8 characters"
            className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
          />
          {errors.password ? (
            <ErrorMessage message={errors.password.message || ''} />
          ) : null}
        </div>
        <div className="w-full mb-2">
          <input
            {...register('confirmPassword', {
              validate: {
                notMatch: (val: string) =>
                  watch('password') === val || 'Password do not match.',
              },
              required: 'Please confirm your password.',
            })}
            type="password"
            placeholder="Confirm password"
            className="rounded border border-gray-200 focus:outline-none focus:ring-0 w-full py-2 px-2 bg-white active:bg-white text-sm focus:bg-white focus:border-purple-400 focus:border-2"
          />
          {errors.confirmPassword ? (
            <ErrorMessage message={errors.confirmPassword.message || ''} />
          ) : null}
        </div>

        <Button size="medium" button={true} mode="black" addClass="mt-3">
          Sign Up
        </Button>
        <div className="w-full flex item-center justify-center relative">
          <div className="w-full h-1 border-t border-gray-300 absolute top-[50%] left-0 z-0"></div>
          <span className="px-5 text-xs font-semibold bg-gray-100 z-10">
            or
          </span>
        </div>
        <GoogleButton>Sign Up with Google</GoogleButton>
        <p className="text-xs text-center mt-3">
          If you don&apos;t have an account, please
          <Link
            href="/account/login"
            className="text-purple-600 hover:text-purple-800 ml-2 font-semibold"
          >
            Log In
          </Link>
          .
        </p>
      </form>
    </div>
  );
}