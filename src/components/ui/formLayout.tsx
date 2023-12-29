import { Session, getServerSession } from 'next-auth';
import Container from './container';
import PageTitle from '../forms/pageTitle';

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
  [key: string]: any;
}

export default async function FormLayout({ children, title }: FormLayoutProps) {
  return (
    <div className="pt-16">
      <Container full={false} narrow={true}>
        <PageTitle title={title} addClass="mb-4" />
        {children}
      </Container>
    </div>
  );
}
