import QuestionCreateForm from '@/components/forms/questionCreateForm';
import FormLayout from '@/components/ui/formLayout';
import { getServerSession } from 'next-auth';
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
      title={` Add Questions and Answers to ${data?.memo.name}`}
    >
      <QuestionCreateForm serverSession={session} />
    </FormLayout>
  );
}
