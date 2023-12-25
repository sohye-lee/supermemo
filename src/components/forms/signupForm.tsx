'use client';
import * as React from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/forms/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import GoogleButton from '../ui/googleButton';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useFormField, FormMessage } from './form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from 'react-dom';

// const FormSchema = z
//   .object({
//     name: z.string(),
//     email: z.string().min(1, 'Email is required').email('Invalid email'),
//     password: z
//       .string()
//       .min(1, 'Password is required')
//       .min(8, 'Password must have than 8 characters'),
//     confirmPassword: z.string().min(1, 'Password confirmation is required'),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ['confirmPassword'],
//     message: 'Password do not match',
//   });

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useForm();
  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     name: '',
  //     email: '',
  //     password: '',
  //     confirmPassword: '',
  //   },
  // });

  // const onSubmit = async (values: z.infer<typeof FormSchema>) => {
  //   const response = await fetch('/api/user', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: values.name,
  //       email: values.email,
  //       password: values.password,
  //     }),
  //   });

  //   if (response.ok) {
  //     router.push('/account/login');
  //   } else {
  //     console.error('Registration failed.');
  //   }
  // };

  // const onSubmit = async (formData: FormData) => {
  //   const response = await fetch('/api/user', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: formData.get('name') as string,
  //       email: formData.get('email'),
  //       password: formData.get('password'),
  //     }),
  //   });

  //   router.push('/account/login');
  //   return {
  //     message: 'Successful',
  //   };
  // };
  // // const [formState, action] = useFormState(onSubmit, { message: '' });
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   // console.log(e.currentTarget);
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const response = await fetch('/api/user', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       name: formData.get('name'),
  //       email: formData.get('email'),
  //       password: formData.get('password'),
  //     }),
  //   });
  //   // console.log({ response });
  //   if (response?.ok) {
  //     router.push('/account/login');
  //   }
  // };

  //   const [formState, action] = useFormState(handleSubmit, {message: ""});
  return (
    <div className="p-8 bg-gray-100 rounded-sm flex flex-col items-center">
      <form
        // onSubmit={handleSubmit}
        method="POST"
        className="w-full flex flex-col gap-2"
      >
        <Input
          label="Name"
          type="input"
          inputType="text"
          id="name"
          name="name"
        />
        <Input
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
        <Input
          label="Confirm Password"
          type="input"
          inputType="password"
          id="confirmPassword"
          name="confirmPassword"
        />

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
