import QuestionCreateForm from '@/components/forms/questionCreateForm';
import FormLayout from '@/components/ui/formLayout';
import { getServerSession } from 'next-auth';

export default async function CreateQuestionPage() {
  const session = await getServerSession();
  return (
    <FormLayout wide="full" title="Add Questions and Answers">
      <QuestionCreateForm serverSession={session} />
    </FormLayout>
  );
}
