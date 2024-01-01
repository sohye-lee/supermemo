import MemoEditForm from '@/components/forms/memoEditForm';
import QuestionCreateForm from '@/components/forms/questionCreateForm';
import Button from '@/components/ui/button';
import FormLayout from '@/components/ui/formLayout';
import { getServerSession } from 'next-auth';
import { IconPencil } from '@tabler/icons-react';
import { useState } from 'react';
// import { getServerSideProps } from 'next/dist/build/templates/pages';
// import useSWR from 'swr';

export default async function CreateQuestionPage(context: any) {
  const session = await getServerSession();
  const data = await fetch(
    `${process.env.NEXTAUTH_URL}/api/memos/${context.params.id}`
  ).then((res) => res.json());
  // const { data, error } = useSWR(`/api/memos/${context.params.id}`);

  return (
    <FormLayout
      wide="full"
      title={`Add Questions and Answers to<br/> <span style="color: #8C51FF;"> ${data?.memo.name}</span>`}
    >
      <MemoEditForm
        categoryId={data?.memo.categoryId}
        serverSession={session}
        className="hidden"
      />
      <QuestionCreateForm serverSession={session} />
    </FormLayout>
  );
}
