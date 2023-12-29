import MemoCreateForm from '@/components/forms/memoCreateForm';
import PageTitle from '@/components/forms/pageTitle';
import Container from '@/components/ui/container';
import { getServerSession } from 'next-auth';

export default async function ExamCreatePage() {
  const session = await getServerSession();
  return (
    <div className="pt-16">
      <Container wide="narrow" narrow={true}>
        <PageTitle title="Create a Memo" addClass="mb-4" />
        <MemoCreateForm serverSession={session} />
      </Container>
    </div>
  );
}
